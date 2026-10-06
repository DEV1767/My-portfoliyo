// src/components/ui/TechLogo.tsx
import React from 'react';

export const BRAND_KEYS = [
  'python',
  'javascript',
  'typescript',
  'java',
  'c',
  'sql',
  'langgraph',
  'langchain',
  'qdrant',
  'langsmith',
  'huggingface',
  'groq',
  'openrouter',
  'googleai',
  'nodejs',
  'express',
  'fastapi',
  'mongodb',
  'mongoose',
  'redis',
  'supabase',
  'git',
  'github',
  'docker',
  'postman',
  'vscode',
  'leetcode',
  'mysterio',
  'hackathon',
  'tcs',
] as const;

export type BrandKey = typeof BRAND_KEYS[number];

export function isBrand(key: string): boolean {
  return (BRAND_KEYS as readonly string[]).includes(key.toLowerCase());
}

interface TechLogoProps {
  name: string;
  size?: number;
  className?: string;
  glow?: boolean;
  accentColor?: string;
}

export function TechLogo({
  name,
  size = 32,
  className = '',
  glow = false,
  accentColor,
}: TechLogoProps) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  const renderIcon = () => {
    switch (key) {
      case 'python':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128" fill="none">
            <path
              d="M63.5 12c-27.5 0-25.8 11.9-25.8 11.9l.03 12.3h26.3v3.7H27.5S12 38.1 12 65.4c0 27.4 13.5 26.5 13.5 26.5h8.1v-11.4s-.4-13.5 13.3-13.5h26v-13s.4-12-13.4-12zm-9.9 8.2a4.4 4.4 0 110 8.8 4.4 4.4 0 010-8.8z"
              fill="#3776AB"
            />
            <path
              d="M64.5 116c27.5 0 25.8-11.9 25.8-11.9l-.03-12.3H64v-3.7h36.5s15.5 1.8 15.5-25.5c0-27.4-13.5-26.5-13.5-26.5h-8.1v11.4s.4 13.5-13.3 13.5H55.1v13s-.4 12 13.4 12zm9.9-8.2a4.4 4.4 0 110-8.8 4.4 4.4 0 010 8.8z"
              fill="#FFD43B"
            />
          </svg>
        );
      case 'javascript':
      case 'js':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <rect width="128" height="128" rx="16" fill="#F7DF1E" />
            <path
              d="M38.5 102.5c4.2 2.4 8.7 3.8 13.4 3.8 12.4 0 20.3-6.2 20.3-21.7V42.8h-14v41.6c0 7.8-3.4 10.9-9.5 10.9-3.4 0-6.7-1.1-8.7-2.4l-1.5 9.6zm47.9-1.2c6.2 3.6 14.1 5.6 21.6 5.6 18.2 0 28.5-9.1 28.5-24.8 0-14.4-8.8-21.3-21.6-26.9-8.3-3.7-12-6.5-12-11.4 0-4.3 3.5-7.7 9.8-7.7 5.7 0 11.2 1.8 15.5 4.5l3.3-9.9c-4.8-2.6-11.5-4.2-18.7-4.2-16.7 0-26.6 9.3-26.6 23.9 0 13.8 8.6 20.9 21.8 26.6 8.3 3.6 11.9 6.8 11.9 12 0 4.8-4.2 8.5-11.4 8.5-6.8 0-13.7-2.5-18.7-5.8l-3.6 9.6z"
              fill="#000000"
            />
          </svg>
        );
      case 'typescript':
      case 'ts':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <rect width="128" height="128" rx="16" fill="#3178C6" />
            <path
              d="M30 52h34v12H49v44H35V64H20V52h10zm46.5 42c3.4 2.2 7.7 3.4 12.4 3.4 7.6 0 12.3-3.8 12.3-9.5 0-6.2-4.5-8.8-13.2-12.7-11.4-5.1-16.7-10.7-16.7-20.7 0-11.4 9.1-19.5 23.4-19.5 6.7 0 12.5 1.5 16.9 4.1l-3.3 10.8c-3.6-2-8.3-3.2-13.3-3.2-6.9 0-10.4 3.4-10.4 8.3 0 5.4 3.7 7.7 12.3 11.6 12.3 5.4 17.7 11.1 17.7 21.9 0 12.4-9.7 20.5-25.9 20.5-7.8 0-15.3-2.1-20.5-5.3l3.3-11.2z"
              fill="#FFFFFF"
            />
          </svg>
        );
      case 'java':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <path
              d="M48.2 92.5c0 0-7.2 4.1 5.1 5.5 15.3 1.8 23.1 1.6 39.8-2.3 0 0-4.6 3.6-13.3 5.5-17.5 3.8-38.3 2.1-43-3.8-2.2-2.8 3.8-4.4 11.4-4.9z"
              fill="#5382A1"
            />
            <path
              d="M43.7 80.8c0 0-8.2 5.8 4.2 7.2 16.5 1.9 29.8 2.2 49.3-3.2 0 0-5.7 3.8-16.1 5.8-21.7 4.1-45.7 2.3-51.1-4.7-2.9-3.7 4.8-4.8 13.7-5.1z"
              fill="#F89820"
            />
            <path
              d="M74.8 49.6c5.8 6.7 3.1 12.7-5 22.8-6.5 8.1-5.7 12.6.9 19.3 0 0-16.5-8.4-9.3-21.2 7.9-14 13.4-20.9 13.4-20.9z"
              fill="#5382A1"
            />
            <path
              d="M87.9 66.8c8.7 4.3 11.7 9.8 7.3 14.2-7.8 7.8-19.3 9.4-37.1 9.4-7.2 0-13.9-.3-19.7-.8 0 0 13.2-3.1 27.6-5.4 18.2-2.9 25.4-8.8 21.9-17.4z"
              fill="#F89820"
            />
          </svg>
        );
      case 'c':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <path
              d="M115.4 30.7L67.1 2.8c-1.9-1.1-4.3-1.1-6.2 0L12.6 30.7c-1.9 1.1-3.1 3.2-3.1 5.4v55.8c0 2.2 1.2 4.3 3.1 5.4l48.3 27.9c1.9 1.1 4.3 1.1 6.2 0l48.3-27.9c1.9-1.1 3.1-3.2 3.1-5.4V36.1c0-2.2-1.2-4.3-3.1-5.4z"
              fill="#00599C"
            />
            <path
              d="M64 26.5c-20.7 0-37.5 16.8-37.5 37.5s16.8 37.5 37.5 37.5c15.2 0 28.3-9 34.2-22l-14.8-6.6c-3.6 7.4-11.2 12.4-19.4 12.4-12.4 0-22.5-10.1-22.5-22.5S51.6 40.3 64 40.3c8.2 0 15.8 5 19.4 12.4l14.8-6.6C92.3 35.5 79.2 26.5 64 26.5z"
              fill="#FFFFFF"
            />
          </svg>
        );
      case 'sql':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <rect width="128" height="128" rx="16" fill="#00618A" />
            <path
              d="M32 40c0-6.6 14.3-12 32-12s32 5.4 32 12-14.3 12-32 12-32-5.4-32-12z"
              fill="#FFFFFF"
            />
            <path
              d="M32 48v16c0 6.6 14.3 12 32 12s32-5.4 32-12V48c-6.8 4.7-18.4 8-32 8s-25.2-3.3-32-8z"
              fill="#FFFFFF"
              opacity="0.8"
            />
            <path
              d="M32 72v16c0 6.6 14.3 12 32 12s32-5.4 32-12V72c-6.8 4.7-18.4 8-32 8s-25.2-3.3-32-8z"
              fill="#FFFFFF"
              opacity="0.6"
            />
          </svg>
        );
      case 'langgraph':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128" fill="none">
            <circle cx="34" cy="40" r="16" fill="#0d0d0d" />
            <circle cx="94" cy="40" r="16" fill="#0d0d0d" />
            <circle cx="64" cy="92" r="16" fill="#0d0d0d" />
            <path d="M44 48L58 80" stroke="#0d0d0d" strokeWidth="6" strokeLinecap="round" />
            <path d="M84 48L70 80" stroke="#0d0d0d" strokeWidth="6" strokeLinecap="round" />
            <path d="M48 40H80" stroke="#0d0d0d" strokeWidth="6" strokeLinecap="round" />
            <circle cx="64" cy="92" r="6" fill="#3B82F6" />
          </svg>
        );
      case 'langchain':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128" fill="none">
            <rect width="128" height="128" rx="20" fill="#1C3C3C" />
            <circle cx="48" cy="64" r="22" stroke="#FFFFFF" strokeWidth="8" />
            <circle cx="80" cy="64" r="22" stroke="#22C55E" strokeWidth="8" />
          </svg>
        );
      case 'qdrant':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128" fill="none">
            <rect width="128" height="128" rx="20" fill="#DC382D" />
            <polygon points="64,28 98,48 98,84 64,104 30,84 30,48" stroke="#FFFFFF" strokeWidth="8" fill="none" />
            <circle cx="64" cy="66" r="14" fill="#FFFFFF" />
          </svg>
        );
      case 'huggingface':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="60" fill="#FFD21E" />
            {/* Eyes */}
            <ellipse cx="44" cy="52" rx="6" ry="8" fill="#000000" />
            <ellipse cx="84" cy="52" rx="6" ry="8" fill="#000000" />
            {/* Cheeks */}
            <circle cx="36" cy="66" r="8" fill="#FF8A65" opacity="0.6" />
            <circle cx="92" cy="66" r="8" fill="#FF8A65" opacity="0.6" />
            {/* Smile */}
            <path d="M46 76c5 8 13 12 18 12s13-4 18-12" stroke="#000000" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Hands */}
            <path d="M20 78c-6 4-6 14 0 18s16 0 18-8" fill="#FFE082" stroke="#000000" strokeWidth="3" />
            <path d="M108 78c6 4 6 14 0 18s-16 0-18-8" fill="#FFE082" stroke="#000000" strokeWidth="3" />
          </svg>
        );
      case 'groq':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128" fill="none">
            <rect width="128" height="128" rx="20" fill="#F55036" />
            <path
              d="M78 40H50c-6.6 0-12 5.4-12 12v24c0 6.6 5.4 12 12 12h28c6.6 0 12-5.4 12-12V52c0-6.6-5.4-12-12-12zm-4 32H54v-8h20v8z"
              fill="#FFFFFF"
            />
          </svg>
        );
      case 'googleai':
      case 'gemini':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128" fill="none">
            <path
              d="M64 16C64 42.5 42.5 64 16 64c26.5 0 48 21.5 48 48 0-26.5 21.5-48 48-48-26.5 0-48-21.5-48-48z"
              fill="url(#gemini_grad)"
            />
            <defs>
              <linearGradient id="gemini_grad" x1="16" y1="16" x2="112" y2="112" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1A73E8" />
                <stop offset="0.5" stopColor="#9333EA" />
                <stop offset="1" stopColor="#EA4335" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'nodejs':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <path
              d="M64 12l48 27.7v56.6L64 124 16 96.3V39.7L64 12z"
              fill="#339933"
            />
            <path
              d="M64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm0 24c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"
              fill="#FFFFFF"
            />
          </svg>
        );
      case 'express':
      case 'expressjs':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <rect width="128" height="128" rx="20" fill="#000000" />
            <text x="64" y="74" fill="#FFFFFF" fontSize="36" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
              ex
            </text>
          </svg>
        );
      case 'fastapi':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="60" fill="#009688" />
            <path d="M72 24L38 72h24l-6 32 34-48H66l6-32z" fill="#FFFFFF" />
          </svg>
        );
      case 'mongodb':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <path
              d="M64 12c-2.4 12-28 36-28 62.4 0 21.6 14.8 38.4 28 41.6 13.2-3.2 28-20 28-41.6C92 48 66.4 24 64 12z"
              fill="#47A248"
            />
            <path
              d="M64 12v104c1.2-.3 2.5-.7 3.7-1.2 11.2-4.5 24.3-19.6 24.3-40.4C92 48 66.4 24 64 12z"
              fill="#499D4A"
            />
            <path
              d="M64 96c-1.8 0-3.3-.8-3.3-1.8V42c0-1 1.5-1.8 3.3-1.8s3.3.8 3.3 1.8v52.2c0 1-1.5 1.8-3.3 1.8z"
              fill="#FFFFFF"
            />
          </svg>
        );
      case 'redis':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <path
              d="M16 48l48-24 48 24-48 24-48-24z"
              fill="#D82C20"
            />
            <path
              d="M16 68l48 24 48-24-48-24-48 24z"
              fill="#A3241A"
            />
            <path
              d="M16 88l48 24 48-24-48-24-48 24z"
              fill="#7A1B14"
            />
          </svg>
        );
      case 'supabase':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <rect width="128" height="128" rx="20" fill="#1C1C1C" />
            <path
              d="M68 20L28 72h36l-8 36 44-56H64l4-32z"
              fill="#3ECF8E"
            />
          </svg>
        );
      case 'git':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <path
              d="M122.5 56.6L71.4 5.5c-3.3-3.3-8.8-3.3-12.1 0L49 15.8l15.3 15.3c3.5-1.2 7.7-.4 10.5 2.4 2.8 2.8 3.6 7 2.4 10.5l14.7 14.7c3.5-1.2 7.7-.4 10.5 2.4 4 4 4 10.4 0 14.4s-10.4 4-14.4 0c-3-3-3.7-7.4-2.1-11.1L72.8 50.8v31.7c1.7 1.1 3.2 2.7 4 4.7 3 7.3-.6 15.7-7.9 18.7s-15.7-.6-18.7-7.9c-2.4-5.8-.4-12.5 4.6-16.1V49.7c-5-3.6-7-10.3-4.6-16.1L35.2 29.6 5.5 59.3c-3.3 3.3-3.3 8.8 0 12.1l51.1 51.1c3.3 3.3 8.8 3.3 12.1 0l53.8-53.8c3.4-3.3 3.4-8.7 0-12.1z"
              fill="#F05032"
            />
          </svg>
        );
      case 'github':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M64 5.3C29.7 5.3 2 33 2 67.3c0 27.4 17.8 50.7 42.4 58.9 3.1.6 4.2-1.4 4.2-3 0-1.5-.1-6.5-.1-11.8-17.3 3.8-20.9-7.4-20.9-7.4-2.8-7.2-6.9-9.1-6.9-9.1-5.6-3.9.4-3.8.4-3.8 6.2.4 9.5 6.4 9.5 6.4 5.5 9.5 14.5 6.7 18.1 5.2 0.6-4 2.2-6.7 4-8.3-13.8-1.6-28.3-6.9-28.3-30.7 0-6.8 2.4-12.3 6.4-16.6-.6-1.6-2.8-7.9.6-16.4 0 0 5.2-1.7 17.1 6.4 5-1.4 10.3-2.1 15.6-2.1 5.3 0 10.6.7 15.6 2.1 11.9-8.1 17.1-6.4 17.1-6.4 3.4 8.5 1.3 14.8.6 16.4 4 4.3 6.4 9.8 6.4 16.6 0 23.9-14.5 29.1-28.4 30.6 2.2 1.9 4.2 5.7 4.2 11.5 0 8.3-.1 15-.1 17.1 0 1.6 1.1 3.6 4.3 3 24.6-8.2 42.3-31.5 42.3-58.9 0-34.3-27.7-62-62-62z"
              fill="#181717"
            />
          </svg>
        );
      case 'docker':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <path
              d="M123.4 58.8c-2.4-1.8-7.8-2.6-12.2-.6-.9-5.7-4.9-9.9-10.4-11.9l-2.6-.9-.9 2.6c-2.8 7.9-1.3 15.9 3.5 21.6-3.8 2-9.7 2.6-16.7 2.6H16.2c-2.8 0-5.3.6-7.6 1.8-3.1 1.7-5.1 4.5-5.9 8.2-1.3 5.9.6 14.2 5.8 23.3 9.4 16.5 28.5 22.8 55.4 22.8 45.4 0 65.6-19.1 67.5-44.5 5.5-.9 11.5-4.1 13.5-9.3 1.2-3 1.2-5.4.1-7.1zM58.7 32.7H46.4v12.3h12.3V32.7zm15.4 0H61.8v12.3h12.3V32.7zm-30.8 0H31v12.3h12.3V32.7zm15.4 15.4H46.4v12.3h12.3V48.1zm15.4 0H61.8v12.3h12.3V48.1zm15.4 0H77.2v12.3h12.3V48.1zm-46.2 0H31v12.3h12.3V48.1zm-15.4 0H15.6v12.3h12.3V48.1zm77 0H92.6v12.3h12.3V48.1z"
              fill="#2496ED"
            />
          </svg>
        );
      case 'postman':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="60" fill="#FF6C37" />
            <path
              d="M92 46c-2-3-6-4-10-3L42 58c-4 1-6 5-5 9l5 18c1 4 5 6 9 5l40-15c4-1 6-5 5-9l-4-15c0-2-1-3-2-5zm-14 22L54 77l-3-12 24-9 3 12z"
              fill="#FFFFFF"
            />
          </svg>
        );
      case 'vscode':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128">
            <path
              d="M94.5 16.2l-40 37.2-22.3-17.1c-2.3-1.8-5.6-1.5-7.5.8L12.5 52c-1.8 2.2-1.6 5.4.5 7.4l18.5 16.5-18.5 16.5c-2.1 1.9-2.3 5.2-.5 7.4l12.2 14.9c1.9 2.3 5.2 2.6 7.5.8l22.3-17.1 40 37.2c2.4 2.2 6.1 1.7 7.9-1.1L114 116V12l-11.6-18.6c-1.8-2.8-5.5-3.3-7.9-1.1z"
              fill="#007ACC"
            />
          </svg>
        );
      case 'leetcode':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128" fill="none">
            <path
              d="M84.5 91.5L62 114c-12 12-31.5 12-43.5 0-12-12-12-31.5 0-43.5L52 37c7-7 18-7 25 0s7 18 0 25L48.5 90.5"
              stroke="#FFA116"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path d="M52 64h48" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
          </svg>
        );
      case 'mysterio':
      case 'security':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128" fill="none">
            <rect width="128" height="128" rx="28" fill="#1C1C1C" />
            <path
              d="M64 24L32 38v30c0 24 16 42 32 46 16-4 32-22 32-46V38L64 24z"
              stroke="#10B981"
              strokeWidth="7"
              strokeLinejoin="round"
            />
            <path d="M54 62l8 8 16-16" stroke="#10B981" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'hackathon':
      case 'trophy':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128" fill="none">
            <rect width="128" height="128" rx="28" fill="#1C1C1C" />
            <path
              d="M40 34h48v32c0 14-10 24-24 24s-24-10-24-24V34z"
              stroke="#F59E0B"
              strokeWidth="7"
            />
            <path d="M64 90v16M48 106h32" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" />
            <path d="M40 44H26c0 10 6 18 14 18M88 44h14c0 10-6 18-14 18" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
          </svg>
        );
      case 'tcs':
      case 'tcshackathon':
        return (
          <svg width={size} height={size} viewBox="0 0 128 128" fill="none">
            {/* Dark premium badge backdrop */}
            <rect width="128" height="128" rx="28" fill="#0A1128" />
            <rect width="128" height="128" rx="28" stroke="rgba(0, 118, 206, 0.3)" strokeWidth="1.5" />

            {/* Official TATA Header */}
            <text
              x="64"
              y="32"
              textAnchor="middle"
              fill="#0076CE"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="800"
              fontSize="12"
              letterSpacing="5"
            >
              TATA
            </text>

            {/* Prominent, crisp, modern bold TCS lettermark */}
            <text
              x="64"
              y="74"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="36"
              letterSpacing="2"
            >
              TCS
            </text>

            {/* Signature TCS dynamic spectrum ribbon flourish */}
            <path
              d="M26 89 C40 83, 50 95, 64 89 C78 83, 88 95, 102 89"
              stroke="url(#tcs-ribbon-gradient)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Tagline micro-label */}
            <text
              x="64"
              y="108"
              textAnchor="middle"
              fill="#94A3B8"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="600"
              fontSize="7.5"
              letterSpacing="1.2"
            >
              TECH DAY · 1ST
            </text>

            {/* Spectrum Ribbon Gradient Definition */}
            <defs>
              <linearGradient id="tcs-ribbon-gradient" x1="26" y1="89" x2="102" y2="89" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E11D48" />
                <stop offset="25%" stopColor="#A855F7" />
                <stop offset="55%" stopColor="#2563EB" />
                <stop offset="80%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
        );

      // Concepts with thin minimal geometric lines
      case 'rag':
      case 'hybridrag':
        return (
          <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor">
            <rect x="10" y="10" width="44" height="44" rx="8" strokeWidth="2.5" />
            <line x1="20" y1="24" x2="44" y2="24" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="20" y1="32" x2="36" y2="32" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="42" cy="42" r="6" strokeWidth="2.5" />
            <line x1="46" y1="46" x2="52" y2="52" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'bm25':
        return (
          <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor">
            <path d="M12 48L24 16l12 32M16 38h16M42 16v32M42 32h14v16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'encoder':
      case 'crossencoder':
        return (
          <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor">
            <circle cx="20" cy="20" r="8" strokeWidth="2.5" />
            <circle cx="44" cy="20" r="8" strokeWidth="2.5" />
            <circle cx="32" cy="46" r="8" strokeWidth="2.5" />
            <line x1="24" y1="26" x2="30" y2="40" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="40" y1="26" x2="34" y2="40" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        );
      case 'mcp':
        return (
          <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor">
            <circle cx="32" cy="32" r="10" strokeWidth="2.5" />
            <circle cx="16" cy="18" r="5" strokeWidth="2.5" />
            <circle cx="48" cy="18" r="5" strokeWidth="2.5" />
            <circle cx="32" cy="52" r="5" strokeWidth="2.5" />
            <line x1="20" y1="22" x2="26" y2="28" strokeWidth="2" />
            <line x1="44" y1="22" x2="38" y2="28" strokeWidth="2" />
            <line x1="32" y1="42" x2="32" y2="47" strokeWidth="2" />
          </svg>
        );
      case 'prompt':
      case 'promptengineering':
        return (
          <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor">
            <rect x="8" y="14" width="48" height="36" rx="6" strokeWidth="2.5" />
            <polyline points="18 26 26 32 18 38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="30" y1="38" x2="42" y2="38" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'guardrails':
        return (
          <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor">
            <path d="M32 10L14 20v16c0 14 9 24 18 28 9-4 18-14 18-28V20L32 10z" strokeWidth="2.5" strokeLinejoin="round" />
            <line x1="24" y1="32" x2="40" y2="32" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'jwt':
        return (
          <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor">
            <circle cx="32" cy="32" r="22" strokeWidth="2.5" />
            <path d="M22 34l8 8 16-16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'api':
      case 'restapis':
        return (
          <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor">
            <circle cx="16" cy="32" r="6" strokeWidth="2.5" />
            <circle cx="48" cy="32" r="6" strokeWidth="2.5" />
            <path d="M22 32h20" strokeWidth="2.5" strokeLinecap="round" />
            <polyline points="36 26 42 32 36 38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'dsa':
        return (
          <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor">
            <circle cx="32" cy="14" r="5" strokeWidth="2" />
            <circle cx="18" cy="34" r="5" strokeWidth="2" />
            <circle cx="46" cy="34" r="5" strokeWidth="2" />
            <circle cx="12" cy="52" r="4" strokeWidth="2" />
            <circle cx="26" cy="52" r="4" strokeWidth="2" />
            <line x1="29" y1="18" x2="21" y2="30" strokeWidth="2" />
            <line x1="35" y1="18" x2="43" y2="30" strokeWidth="2" />
            <line x1="16" y1="38" x2="13" y2="48" strokeWidth="2" />
            <line x1="20" y1="38" x2="24" y2="48" strokeWidth="2" />
          </svg>
        );
      case 'systemdesign':
        return (
          <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor">
            <rect x="8" y="10" width="20" height="14" rx="3" strokeWidth="2" />
            <rect x="36" y="10" width="20" height="14" rx="3" strokeWidth="2" />
            <rect x="22" y="40" width="20" height="14" rx="3" strokeWidth="2" />
            <path d="M18 24v8h28v-8M32 32v8" strokeWidth="2" />
          </svg>
        );
      case 'oop':
        return (
          <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor">
            <rect x="12" y="12" width="40" height="40" rx="6" strokeWidth="2.5" />
            <circle cx="26" cy="26" r="4" strokeWidth="2" />
            <circle cx="38" cy="26" r="4" strokeWidth="2" />
            <circle cx="32" cy="38" r="5" strokeWidth="2" />
          </svg>
        );
      default:
        return (
          <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor">
            <rect x="10" y="10" width="44" height="44" rx="8" strokeWidth="2.5" />
            <circle cx="32" cy="32" r="12" strokeWidth="2.5" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && accentColor && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-30 transition-opacity duration-300"
          style={{ backgroundColor: accentColor }}
        />
      )}
      <div className="relative z-10">{renderIcon()}</div>
    </div>
  );
}
