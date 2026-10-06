// src/lib/data.ts
// Single source of truth for all content extracted strictly from the résumé PDF and portfolio assets.

export interface Profile {
  name: string;
  firstName: string;
  role: string;
  heroHeadline: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  quote: string;
  github: string;
  linkedin: string;
  leetcode: string;
  portfolioUrl: string;
  resumePath: string;
  idNumber: string;
  dept: string;
  validTill: string;
}

export interface NavItem {
  id: string;
  label: string;
  index: string;
}

export type SkillFamily = 'Languages' | 'Frameworks' | 'Tools';

export interface SkillElement {
  num: number;
  symbol: string;
  name: string;
  family: SkillFamily;
  isBrand: boolean;
  logoKey: string;
  projects: string[];
  accentColor?: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  date: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  liveUrl?: string;
  illustrativeUiType: 'rag-terminal' | 'ide-debugger' | 'event-dashboard';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  bullets: string[];
  stack: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  url?: string;
}

export interface AchievementItem {
  id: string;
  index: string;
  platform: string;
  label: string;
  caption: string;
  detail: string;
  metric: number;
  metricSuffix: string;
  metricLabel: string;
  logo: string;
  url?: string;
  badge?: string;
}

export const PROFILE: Profile = {
  name: 'Shivam Chaudhary',
  firstName: 'SHIVAM',
  role: 'Backend Developer | Generative AI & Agentic AI',
  heroHeadline: 'Backend & Agentic AI Developer.',
  email: 'Shivamchy076@gmail.com',
  phone: '+91 7667736039',
  phoneHref: 'tel:+917667736039',
  location: 'Shimoga, Karnataka / Kanpur, UP',
  resumeSummary: 'Backend Developer specializing in Generative AI & Agentic AI. Engineering scalable backend architectures, autonomous AI agents with LangGraph & LangChain, and production RAG systems.',
  quote: 'Architecting scalable backend logic and autonomous AI agents that transform Generative AI into real, reliable production workflows.',
  github: 'https://github.com/DEV1767',
  linkedin: 'https://www.linkedin.com/in/shivam076/',
  leetcode: 'https://leetcode.com/u/Shivam_garg76/',
  portfolioUrl: 'https://my-portfoliyo-delta.vercel.app',
  resumePath: '/Shivam_Chaudhary_Resume.pdf',
  idNumber: 'SC-AIML-2024',
  dept: 'AI & Machine Learning',
  validTill: '2028',
};

export const NAV: NavItem[] = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'skills', label: 'Skills', index: '02' },
  { id: 'work', label: 'Work', index: '03' },
  { id: 'experience', label: 'Experience', index: '04' },
  { id: 'achievements', label: 'Achievements', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
];

export const SKILL_GROUPS: SkillElement[] = [
  // Languages (01 - 06)
  { num: 1, symbol: 'Py', name: 'Python', family: 'Languages', isBrand: true, logoKey: 'python', projects: ['Git RAG'], accentColor: '#3776AB' },
  { num: 2, symbol: 'Js', name: 'JavaScript', family: 'Languages', isBrand: true, logoKey: 'javascript', projects: ['Indalnova', 'EventHub', 'AI Commander'], accentColor: '#F7DF1E' },
  { num: 3, symbol: 'Ts', name: 'TypeScript', family: 'Languages', isBrand: true, logoKey: 'typescript', projects: ['AI Commander'], accentColor: '#3178C6' },
  { num: 4, symbol: 'Jv', name: 'Java', family: 'Languages', isBrand: true, logoKey: 'java', projects: ['LeetCode / Core DSA'], accentColor: '#007396' },
  { num: 5, symbol: 'C', name: 'C', family: 'Languages', isBrand: true, logoKey: 'c', projects: ['Systems Programming'], accentColor: '#A8B9CC' },
  { num: 6, symbol: 'Sq', name: 'SQL', family: 'Languages', isBrand: true, logoKey: 'sql', projects: ['EventHub', 'Database Schemas'], accentColor: '#00618A' },

  // Frameworks & Libraries (07 - 12)
  { num: 7, symbol: 'Lg', name: 'LangGraph', family: 'Frameworks', isBrand: true, logoKey: 'langgraph', projects: ['Git RAG', 'AI Commander'], accentColor: '#2B2B2B' },
  { num: 8, symbol: 'Lc', name: 'LangChain', family: 'Frameworks', isBrand: true, logoKey: 'langchain', projects: ['Git RAG'], accentColor: '#1C3C3C' },
  { num: 9, symbol: 'Fa', name: 'FastAPI', family: 'Frameworks', isBrand: true, logoKey: 'fastapi', projects: ['Git RAG', 'AI Commander V3'], accentColor: '#009688' },
  { num: 10, symbol: 'Nd', name: 'Node.js', family: 'Frameworks', isBrand: true, logoKey: 'nodejs', projects: ['EventHub', 'AI Commander', 'Indalnova'], accentColor: '#339933' },
  { num: 11, symbol: 'Ex', name: 'Express.js', family: 'Frameworks', isBrand: true, logoKey: 'express', projects: ['EventHub', 'AI Commander', 'Indalnova'], accentColor: '#000000' },
  { num: 12, symbol: 'Mo', name: 'Mongoose', family: 'Frameworks', isBrand: true, logoKey: 'mongoose', projects: ['EventHub'], accentColor: '#880000' },

  // Tools & Platforms (13 - 26)
  { num: 13, symbol: 'Dk', name: 'Docker', family: 'Tools', isBrand: true, logoKey: 'docker', projects: ['Git RAG'], accentColor: '#2496ED' },
  { num: 14, symbol: 'Gt', name: 'Git', family: 'Tools', isBrand: true, logoKey: 'git', projects: ['All Projects'], accentColor: '#F05032' },
  { num: 15, symbol: 'Gh', name: 'GitHub', family: 'Tools', isBrand: true, logoKey: 'github', projects: ['All Repositories', 'GitHub MCP'], accentColor: '#181717' },
  { num: 16, symbol: 'Pm', name: 'Postman', family: 'Tools', isBrand: true, logoKey: 'postman', projects: ['EventHub API Testing'], accentColor: '#FF6C37' },
  { num: 17, symbol: 'Vc', name: 'VS Code', family: 'Tools', isBrand: true, logoKey: 'vscode', projects: ['AI Commander Extension'], accentColor: '#007ACC' },
  { num: 18, symbol: 'Mg', name: 'MongoDB', family: 'Tools', isBrand: true, logoKey: 'mongodb', projects: ['EventHub', 'AI Commander', 'Indalnova'], accentColor: '#47A248' },
  { num: 19, symbol: 'Rd', name: 'Redis', family: 'Tools', isBrand: true, logoKey: 'redis', projects: ['EventHub'], accentColor: '#DC382D' },
  { num: 20, symbol: 'Qd', name: 'Qdrant', family: 'Tools', isBrand: true, logoKey: 'qdrant', projects: ['Git RAG'], accentColor: '#DC382D' },
  { num: 21, symbol: 'Sb', name: 'Supabase', family: 'Tools', isBrand: true, logoKey: 'supabase', projects: ['Indalnova'], accentColor: '#3ECF8E' },
  { num: 22, symbol: 'Ls', name: 'LangSmith', family: 'Tools', isBrand: true, logoKey: 'langsmith', projects: ['Git RAG'], accentColor: '#FF6B6B' },
  { num: 23, symbol: 'Hf', name: 'Hugging Face', family: 'Tools', isBrand: true, logoKey: 'huggingface', projects: ['Git RAG'], accentColor: '#FFD21E' },
  { num: 24, symbol: 'Gq', name: 'Groq', family: 'Tools', isBrand: true, logoKey: 'groq', projects: ['Git RAG'], accentColor: '#F55036' },
  { num: 25, symbol: 'Or', name: 'OpenRouter', family: 'Tools', isBrand: true, logoKey: 'openrouter', projects: ['Git RAG'], accentColor: '#6366F1' },
  { num: 26, symbol: 'Gm', name: 'Google AI (Gemini)', family: 'Tools', isBrand: true, logoKey: 'googleai', projects: ['Git RAG', 'VeriVox AI'], accentColor: '#4285F4' },
];

export const PROJECTS: Project[] = [
  {
    id: 'git-rag',
    index: '01',
    title: 'Git RAG — Agentic GitHub Repository Assistant',
    kicker: 'Agentic AI Coding Assistant',
    date: '08/2026 – Present',
    description: 'Built an Agentic AI GitHub Repository Assistant using LangGraph, Hybrid RAG (Qdrant + BM25), Cross-Encoder reranking, and GitHub MCP as an end-to-end, developer-focused AI coding assistant.',
    features: [
      'Implemented JEV-based intent classification and intelligent MCP tool selection, enabling the agent to dynamically decide between normal conversation, repository retrieval, and live GitHub actions.',
      'Added evidence filtering, deduplication, and local Hugging Face embeddings with grounded LLM generation (Groq/OpenRouter/Google AI).',
      'High-performance backend served through FastAPI and fully containerized with Docker for seamless deployment.',
      'Hybrid retrieval combines BM25 keyword matching and Qdrant vector search with Cross-Encoder reranking for code discovery.'
    ],
    tech: ['Python', 'LangGraph', 'LangChain', 'FastAPI', 'Docker', 'Qdrant', 'Hugging Face', 'Groq'],
    github: 'https://github.com/DEV1767/Git_rag',
    illustrativeUiType: 'rag-terminal',
  },
  {
    id: 'ai-commander',
    index: '02',
    title: 'AI Commander — VS Code Agent',
    kicker: 'Autonomous IDE Debugger',
    date: '08/2026 – Present',
    description: "Built a custom TypeScript VS Code extension integrated with a Node.js/Express backend and a LangGraph-based agent to capture and clean terminal error output, generating LLM-powered debugging guidance directly within the developer's IDE workflow.",
    features: [
      "Custom TypeScript extension capturing real-time terminal error output and streaming debug guidance right into VS Code.",
      'Enhanced in V2 with authentication architecture, context-aware error analysis, and dedicated frontend dashboard.',
      'Displays AI-generated error explanations, risk severity levels, and automated prevention recommendations.',
      'Currently building V3 with FastAPI agent backend & Model Context Protocol (MCP) for direct log access from hosted apps.'
    ],
    tech: ['VS Code Extension API', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'FastAPI', 'LangGraph', 'LLM APIs'],
    github: 'https://github.com/DEV1767/Ai-Commander',
    illustrativeUiType: 'ide-debugger',
  },
  {
    id: 'eventhub',
    index: '03',
    title: 'EventHub — College Event Management Platform',
    kicker: 'Production Platform · 1,000+ Users',
    date: '03/2026 – 08/2026',
    description: 'Architected a role-based backend (MVC pattern, JWT auth, Joi-validated REST APIs) to manage events, teams, and scheduling for 1,000+ concurrent users, deployed and live in production.',
    features: [
      'Role-based access control (RBAC) backend managing events, student teams, and scheduling for 1,000+ concurrent users.',
      'Cut average database fetch latency from ~700ms to ~100ms (≈85% faster) by introducing Redis caching for hot queries.',
      'Hardened the API layer with robust rate limiting to prevent abuse and resolved file-upload concurrency bugs.',
      'Centralized middleware validation with Joi schemas and comprehensive error logging.'
    ],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Redis', 'Postman'],
    github: 'https://github.com/DEV1767/eventhub-backend',
    liveUrl: 'https://eduhub-eta-coral.vercel.app/index.html',
    illustrativeUiType: 'event-dashboard',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'indalnova',
    role: 'Freelance Web Developer',
    company: 'Indalnova',
    location: 'Remote / Kanpur, UP',
    period: '08/2025 – Present',
    type: 'Freelance',
    bullets: [
      'Designed and built a full-stack skincare e-commerce site end-to-end (HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, Supabase), shipping dynamic product listings and an order-management system as sole developer from requirements through deployment.',
      'Continuing to maintain a stable, incident-free production environment by resolving 10–15 client-reported bugs and modification requests per quarter, keeping the live storefront (10–15 orders/month) reliable for ongoing customers.',
      'Own the project fully — client communication, feature scoping, deployment, and monitoring — for this live, client-facing system, active since launch.'
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Supabase'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'jnnce',
    degree: 'Bachelor of Engineering — Artificial Intelligence & Machine Learning',
    institution: 'Jawaharlal Nehru New College of Engineering',
    location: 'Shimoga, Karnataka',
    period: '09/2024 – Present',
    details: 'Pursuing undergraduate degree in Artificial Intelligence & Machine Learning, focusing on backend engineering, system architecture, distributed services, and autonomous agentic workflows.',
  },
];

// In accordance with rule 1 (never fabricate; if not in resume, remove section),
// the resume PDF does not list external certifications.
export const CERTIFICATIONS: CertificationItem[] = [];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'tcs-hackathon',
    index: '01 / 04',
    platform: 'TCS Tech Day',
    label: 'TCS Hackathon @ JNNCE',
    caption: '1st Place Winner',
    detail: 'Secured 1st Place in the prestigious TCS Hackathon hosted at JNNCE as part of TCS Tech Day, solving real-world challenges through agile teamwork and robust engineering.',
    metric: 1,
    metricSuffix: 'st',
    metricLabel: 'Place Award',
    logo: 'tcs',
    badge: '1st Prize 🏆',
  },
  {
    id: 'bug-bounty',
    index: '02 / 04',
    platform: 'Mysterio 6.0',
    label: 'Bug Bounty Event',
    caption: '2nd Place Winner',
    detail: 'Secured 2nd Place identifying and exploiting live security vulnerabilities in production web applications.',
    metric: 2,
    metricSuffix: 'nd',
    metricLabel: 'Place Award',
    logo: 'mysterio',
  },
  {
    id: 'hackathons',
    index: '03 / 04',
    platform: 'Hackathons & Contests',
    label: 'Competitive Engineering',
    caption: '6 Hackathons Competed',
    detail: "Participated in 6 hackathons including TCS Hackathon (1st Place), Smart India Hackathon (SIH), IGNITRON 2K25 (GM University), and Alva's Hackathon.",
    metric: 6,
    metricSuffix: '+',
    metricLabel: 'Hackathons',
    logo: 'hackathon',
  },
  {
    id: 'leetcode',
    index: '04 / 04',
    platform: 'LeetCode',
    label: 'Algorithmic Problem Solving',
    caption: 'Active Practice',
    detail: 'Actively solving Data Structures and Algorithms problems on LeetCode with continuous daily practice.',
    metric: 10,
    metricSuffix: '+',
    metricLabel: 'Problems Solved',
    logo: 'leetcode',
    url: 'https://leetcode.com/u/Shivam_garg76/',
  },
];

