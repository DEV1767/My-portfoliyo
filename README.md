# Shivam Chaudhary — Personal Portfolio

A production-ready personal portfolio website for **Shivam Chaudhary**, Backend & Agentic AI Developer. Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, and Lenis smooth scrolling.

All typography, content, metrics, repositories, and technical skills are derived strictly and verbatim from Shivam's official résumé.

---

## 1. Quick Start & Run Commands

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Create production build and run
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Design System & Aesthetics

- **Warm Paper Canvas**: `--paper: #f4f2ee;`
- **Monochrome Ink Hierarchy**:
  - Ink (Primary Text & CTAs): `--ink: #0d0d0d;`
  - Ink-2 (Secondary Copy): `--ink-2: #3a3a3a;`
  - Mute (Metadata & Labels): `--mute: #77756f;`
  - Faint: `--faint: #a9a6a0;`
  - Hairline Borders: `--line: rgba(13, 13, 13, 0.1);`
- **Typography** (Self-hosted WOFF2 via `next/font/local`):
  - **Inter Tight** (Variable): Display headings and body copy
  - **Instrument Serif** (Regular & Italic): Editorial accent italic word per heading
  - **JetBrains Mono** (Variable): Monospace indices, tags, metrics, and terminal elements
- **No Heavy Curtains / No Loaders**: The page opens immediately on the hero with fluid scroll.

---

## 3. Sections Table

| # | Section | Component Path | Key Interactions & Details |
|---|---|---|---|
| **00** | **Navigation** | `src/components/Navigation.tsx` | Initials mark (spins 360° on hover, solid ink after 40px scroll), sliding ink indicator pill, frosted blur pill on scroll, 2px top progress bar, full-screen mobile clip-path menu. |
| **00** | **Hero** | `src/components/hero/Hero.tsx` | Looping 768×960 video with `mix-blend-mode: multiply`, background outlined ghost word `SHIVAM`, sound toggle button (46px circle, ▶ / ❚❚ icons, soft ping ring), IntersectionObserver pauses video when &lt;35% visible. |
| **01** | **About** | `src/components/sections/About.tsx` | 3-column equal height layout. Realistic hanging lanyard ID card with spring pendulum swing physics, idle sway, and 3D card flip on hover/tap/keyboard. Verbatim resume summary and quick facts. |
| **02** | **Skills** | `src/components/sections/Skills.tsx` | "Periodic Table of My Stack": 8 columns desktop / 4 mobile, diagonal wave entrance (`(row + col) × 40ms`), family filter chips (dim non-matching), sticky 320px inspector with 150px popping logo. |
| **03** | **Work** | `src/components/sections/Work.tsx` | Expanding horizontal accordion gallery (`min(78svh, 600px)`). Open panel shows 2-column features, tech chips, GitHub link, and custom illustrative grayscale mini-UIs (Git RAG terminal, AI Commander debugger, EventHub dashboard). |
| **04** | **Experience** | `src/components/sections/Experience.tsx` | Unified education & experience vertical timeline. Central spine draws with scroll progress. Stops light up as spine reaches them. Concludes with dashed "Next — Your team?" card. |
| **05** | **Achievements** | `src/components/sections/Achievements.tsx` | Pinned horizontal gallery (`100svh` sticky over 320vh scroll). Slide-to-left card track, header progress bar, 12px center card lift, and `easeOutQuart` metric count-up numbers. |
| **06** | **Contact & Footer** | `src/components/sections/Contact.tsx` | Interactive hopping letter bounce on hover, underlined email with clipboard copy chip (`Copied ✓`, `aria-live`), rotating circular "Say Hello" badge, back to top trigger. |

---

## 4. Hero Video Pipeline (`scripts/build-hero-assets.py`)

The hero assets were generated from the source intro video using `ffmpeg` and `numpy`:

```bash
# Rebuild hero video assets
python scripts/build-hero-assets.py
```

### What the pipeline does:
1. **Centering & Tight Head-to-Toe Crop**:
   - Source is 1920×1080. Person bounding box analyzed at x: 781..1081 (center: 931), y: 82..1025.
   - Cropped with `crop=800:1000:531:60` and scaled to `768x960` (`768/960` aspect ratio).
2. **Backdrop Whitening**:
   - Filter `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98` turns off-white backdrop pure white (`#ffffff`), blending seamlessly into the paper background via `mix-blend-mode: multiply`.
3. **Seamless Video & Audio Cross-Fade (9.5s Loop)**:
   - Video: 0.5s head and 0.5s tail blended via FFmpeg `xfade=transition=fade:duration=0.5:offset=9.0` with `fps=24`.
   - Audio: 48 kHz stereo float32 extracted and cross-faded sample-accurately in `numpy` with equal linear ramp, preventing clicks or audio drops.
4. **Optimized Exports**:
   - `public/hero/hero.webm`: VP9 (CRF 36, Opus 80k)
   - `public/hero/hero.mp4`: H.264 (CRF 24, -preset slow, AAC 96k, +faststart)
   - `public/portrait-bust.webp`: 480×600 head-to-shirt crop for the ID card and preview
   - `public/og.jpg`: 1200×630 OpenGraph social sharing card

---

## 5. Credits & Licenses for Brand Logos

- **Brand Logos**: Python, JavaScript, TypeScript, Java, C, SQL, Node.js, Express, FastAPI, MongoDB, Redis, Supabase, Git, GitHub, Docker, Postman, VS Code, LangChain, LangGraph, Qdrant, Hugging Face, Groq, Google AI (Gemini), LeetCode.
  - Sourced from official SVG marks and Devicon / Simple Icons (MIT / CC0 / Apache 2.0). See [LICENSE.md](public/logos/LICENSE.md).
- **Concept Icons**: Hybrid RAG, BM25, Cross-Encoder, MCP, Prompt Engineering, Guardrails, JWT, REST APIs, DSA, System Design, OOP.
  - Custom minimal thin-line vector glyphs authored under the MIT License.
