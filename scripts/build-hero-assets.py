 #!/usr/bin/env python3
"""
build-hero-assets.py
Processes an intro video into a seamless looping hero clip and static assets:
- public/hero/hero.mp4 (H.264 yuv420p, CRF 24, AAC 96k, +faststart)
- public/hero/hero.webm (VP9, CRF 36, Opus 80k)
- public/portrait-bust.webp (480x600 head-to-shirt crop)
- public/og.jpg (1200x630 Open Graph card)
"""

import sys
import os
import shutil
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

def get_ffmpeg():
    # Check PATH first
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    # Check imageio_ffmpeg
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        pass
    raise RuntimeError("FFmpeg executable not found. Please install ffmpeg or imageio-ffmpeg.")

def find_source_video():
    # If passed as arg
    if len(sys.argv) > 1 and os.path.exists(sys.argv[1]):
        return sys.argv[1]
    
    # Check current directory
    for name in ["intro.mp4", "intro.mov", "video.mp4"]:
        if os.path.exists(name):
            return name
            
    # Check Downloads folder
    downloads = os.path.expanduser("~/Downloads")
    candidates = [
        os.path.join(downloads, "Man_introducing_himself_to_camera_20261004212907.mp4"),
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
            
    # Look for any recent mp4 in Downloads matching intro
    if os.path.exists(downloads):
        for f in os.listdir(downloads):
            if f.endswith(".mp4") and ("intro" in f.lower() or "camera" in f.lower()):
                return os.path.join(downloads, f)
                
    raise FileNotFoundError("Could not find intro video. Specify the path as a command line argument.")

def build_assets():
    ffmpeg = get_ffmpeg()
    src_video = find_source_video()
    print(f"Using source video: {src_video}")
    print(f"Using FFmpeg: {ffmpeg}")

    out_hero_dir = os.path.join("public", "hero")
    os.makedirs(out_hero_dir, exist_ok=True)
    out_public_dir = "public"
    os.makedirs(out_public_dir, exist_ok=True)

    # 1. Video and audio parameters
    # The source is 1920x1080. Person is centered at x=931, y=82 to 1025.
    # Crop 800:1000:531:60 yields perfect centering and head-to-toe framing.
    crop_w, crop_h, crop_x, crop_y = 800, 1000, 531, 60
    scale_w, scale_h = 768, 960
    fade_duration = 0.5 # seconds
    total_trim = 10.0 # seconds
    loop_duration = total_trim - fade_duration # 9.5 seconds

    print(f"Cropping {crop_w}x{crop_h} at ({crop_x}, {crop_y}) and scaling to {scale_w}x{scale_h}...")

    # 2. Extract and crossfade audio sample-accurately in numpy
    print("Processing audio with sample-accurate numpy cross-fade...")
    sr = 48000
    pcm_cmd = [
        ffmpeg, "-y", "-ss", "0", "-t", str(total_trim),
        "-i", src_video,
        "-f", "f32le", "-acodec", "pcm_f32le",
        "-ar", str(sr), "-ac", "2", "-"
    ]
    p = subprocess.Popen(pcm_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    raw_audio, stderr = p.communicate()
    if p.returncode != 0:
        raise RuntimeError(f"FFmpeg audio extraction failed: {stderr.decode('utf-8', errors='ignore')}")

    audio = np.frombuffer(raw_audio, dtype=np.float32).reshape(-1, 2)
    fade_samples = int(fade_duration * sr)
    total_samples = len(audio)

    # Desired loop: body is [fade_samples : total_samples - fade_samples]
    # tail is [total_samples - fade_samples : total_samples]
    # head is [0 : fade_samples]
    body = audio[fade_samples : total_samples - fade_samples]
    tail = audio[total_samples - fade_samples : total_samples]
    head = audio[:fade_samples]

    # Equal power or linear cross-fade
    w_out = np.linspace(1.0, 0.0, fade_samples)[:, None]
    w_in = np.linspace(0.0, 1.0, fade_samples)[:, None]
    xfade_audio = tail * w_out + head * w_in

    loop_audio = np.vstack([body, xfade_audio])
    temp_wav = "temp_loop_audio.wav"
    
    # Write temp wav file using ffmpeg to avoid scipy dependency
    write_wav_cmd = [
        ffmpeg, "-y",
        "-f", "f32le", "-ar", str(sr), "-ac", "2", "-i", "-",
        "-c:a", "pcm_s16le", temp_wav
    ]
    p_wav = subprocess.Popen(write_wav_cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    p_wav.communicate(input=loop_audio.astype(np.float32).tobytes())

    # 3. Create Seamless Looping Video with FFmpeg xfade
    # Whiten background with colorlevels=rimax=0.98:gimax=0.98:bimax=0.98
    video_filter = (
        f"[0:v]trim=start=0:end={total_trim},setpts=PTS-STARTPTS,"
        f"crop={crop_w}:{crop_h}:{crop_x}:{crop_y},"
        f"scale={scale_w}:{scale_h},"
        f"colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,"
        f"format=yuv420p,fps=24,split=2[v_body_raw][v_head_raw];"
        f"[v_body_raw]trim=start={fade_duration}:end={total_trim},setpts=PTS-STARTPTS,fps=24[v_body];"
        f"[v_head_raw]trim=start=0:end={fade_duration},setpts=PTS-STARTPTS,fps=24[v_head];"
        f"[v_body][v_head]xfade=transition=fade:duration={fade_duration}:offset={loop_duration - fade_duration}[v_out]"
    )

    # 4. Export hero.mp4 (H.264, CRF 24, -preset slow, AAC 96k, +faststart)
    hero_mp4 = os.path.join(out_hero_dir, "hero.mp4")
    print(f"Exporting {hero_mp4}...")
    cmd_mp4 = [
        ffmpeg, "-y",
        "-i", src_video,
        "-i", temp_wav,
        "-filter_complex", video_filter,
        "-map", "[v_out]",
        "-map", "1:a",
        "-t", str(loop_duration),
        "-c:v", "libx264", "-crf", "24", "-preset", "slow",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        hero_mp4
    ]
    subprocess.run(cmd_mp4, check=True)

    # 5. Export hero.webm (VP9, CRF 36, Opus 80k)
    hero_webm = os.path.join(out_hero_dir, "hero.webm")
    print(f"Exporting {hero_webm}...")
    cmd_webm = [
        ffmpeg, "-y",
        "-i", src_video,
        "-i", temp_wav,
        "-filter_complex", video_filter,
        "-map", "[v_out]",
        "-map", "1:a",
        "-t", str(loop_duration),
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k",
        hero_webm
    ]
    subprocess.run(cmd_webm, check=True)

    # Clean up temp wav
    if os.path.exists(temp_wav):
        os.remove(temp_wav)

    # 6. Extract clear portrait still and export portrait-bust.webp (480x600)
    print("Generating portrait-bust.webp (480x600)...")
    temp_frame = "temp_portrait_frame.png"
    # Extract frame at t=2.0s
    extract_frame_cmd = [
        ffmpeg, "-y", "-ss", "00:00:02.000",
        "-i", src_video,
        "-vframes", "1",
        temp_frame
    ]
    subprocess.run(extract_frame_cmd, check=True)

    # The person's face is around x=931, y=82 to 320. Head-to-shirt is approx y=60 to 660 (height 600, width 480).
    # Center around x=931 -> x_start = 931 - 240 = 691.
    with Image.open(temp_frame) as img:
        bust_crop = img.crop((691, 60, 691 + 480, 60 + 600))
        # Ensure pure white background if needed
        portrait_webp = os.path.join(out_public_dir, "portrait-bust.webp")
        bust_crop.save(portrait_webp, "WEBP", quality=92)
        print(f"Saved {portrait_webp}")

    # 7. Generate og.jpg (1200x630) OpenGraph preview image
    print("Generating og.jpg (1200x630)...")
    og_img = Image.new("RGB", (1200, 630), color="#f4f2ee")
    draw = ImageDraw.Draw(og_img)

    # Place portrait bust on right side
    with Image.open(os.path.join(out_public_dir, "portrait-bust.webp")) as p_img:
        # Resize nicely for OG card (e.g. 400x500)
        p_resized = p_img.resize((380, 475), Image.Resampling.LANCZOS)
        # Paste with border/shadow styling
        og_img.paste(p_resized, (740, 77))

    # Add text
    # Try to load a truetype font or fallback to default
    try:
        font_large = ImageFont.truetype("arial.ttf", 64)
        font_sub = ImageFont.truetype("arial.ttf", 32)
        font_mono = ImageFont.truetype("cour.ttf", 22)
    except Exception:
        font_large = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_mono = ImageFont.load_default()

    draw.text((80, 110), "SHIVAM CHAUDHARY", fill="#0d0d0d", font=font_large)
    draw.text((80, 200), "Backend Developer\nGenerative AI & Agentic AI", fill="#3a3a3a", font=font_sub)
    draw.text((80, 320), "LangGraph  *  Hybrid RAG  *  MCP  *  FastAPI  *  Node.js", fill="#77756f", font=font_mono)
    draw.text((80, 480), "shivamchy076@gmail.com   |   github.com/DEV1767", fill="#0d0d0d", font=font_mono)

    og_jpg = os.path.join(out_public_dir, "og.jpg")
    og_img.save(og_jpg, "JPEG", quality=90)
    print(f"Saved {og_jpg}")

    if os.path.exists(temp_frame):
        os.remove(temp_frame)

    print("\nHero asset generation complete!")

if __name__ == "__main__":
    build_assets()
