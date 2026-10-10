import type { Localized } from "../i18n/ui"
import { basics } from "./cv.json"

const profileUrl = (network: string) =>
  basics.profiles.find((profile) => profile.network === network)?.url

export const SITE_URL = basics.url
export const EMAIL = basics.email
export const GITHUB_URL = profileUrl("GitHub") ?? "https://github.com/anibalalpizar"
export const LINKEDIN_URL =
  profileUrl("LinkedIn") ?? "https://www.linkedin.com/in/anibalalpizar/"
export const CV_URL = "/Aníbal_CV.pdf"

/** Home sections, in page order. `key` picks the nav label from the UI strings. */
export const sections = [
  { id: "experience", key: "navExperience", index: "01" },
  { id: "projects", key: "navProjects", index: "02" },
  { id: "stack", key: "navStack", index: "03" },
  { id: "contact", key: "navContact", index: "04" },
] as const

type Experience = {
  id: string
  company: Localized
  role: Localized
  note: Localized
  startDate: string
  /** null while it's the current job. */
  endDate: string | null
  /** Path of the case study page (without the language prefix), if there is one. */
  casePath?: string
}

/** Newest first; this is also the order of the case studies. */
export const experience: Experience[] = [
  {
    id: "grupo-asesor",
    company: "Grupo Asesor",
    role: { en: "Software Engineer", es: "Ingeniero de software" },
    note: "",
    startDate: "2025-01-13",
    endDate: null,
  },
  {
    id: "tech-solutions",
    company: "Tech Solutions",
    role: { en: "Full Stack Developer", es: "Desarrollador full stack" },
    note: { en: "Internship", es: "Pasantía" },
    startDate: "2024-04-01",
    endDate: "2024-08-25",
    casePath: "/2024/internship-at-tech-solutions",
  },
  {
    id: "microsoft",
    company: "Microsoft",
    role: { en: "Student Ambassador", es: "Embajador estudiantil" },
    note: "",
    startDate: "2024-01-20",
    endDate: "2024-08-03",
    casePath: "/2024/microsoft-student-ambassador",
  },
  {
    id: "inventory",
    company: { en: "Inventory Management System", es: "Sistema de gestión de inventario" },
    role: { en: "Software Developer", es: "Desarrollador de software" },
    note: { en: "Non-profit", es: "Sin fines de lucro" },
    startDate: "2023-03-26",
    endDate: "2023-08-07",
    casePath: "/2023/inventory-management-system-for-non-profit",
  },
  {
    id: "medical",
    company: { en: "Medical Prescription App", es: "App de recetas médicas" },
    role: { en: "Software Developer", es: "Desarrollador de software" },
    note: "",
    startDate: "2022-08-02",
    endDate: "2022-12-15",
    casePath: "/2022/medical-prescription-app-development",
  },
]

export const kinds = {
  pkg: { en: "Package", es: "Paquete" },
  api: "API",
  web: { en: "Web app", es: "App web" },
  landing: "Landing page",
  tool: { en: "Tool", es: "Herramienta" },
} satisfies Record<string, Localized>

export const categories = ["npm", "web", "api", "tools"] as const
export type Category = (typeof categories)[number]

type Project = {
  id: string
  name: string
  kind: keyof typeof kinds
  category: Category
  /** Position among the four cards on the home page. */
  featured?: number
  /** Shorter stack line for the home card, when it differs from `stack`. */
  homeStack?: string[]
  stack: string[]
  description: Localized
  github: string
  demo: string
  downloads?: string
}

export const projects: Project[] = [
  {
    id: "env-protector",
    name: "env-protector",
    kind: "pkg",
    category: "npm",
    featured: 1,
    homeStack: ["TypeScript"],
    stack: ["TypeScript", "NPM", "Node.js"],
    description: {
      en: "A lightweight TypeScript package for validating environment variables, ensuring they are properly set and typed to prevent runtime errors.",
      es: "Paquete liviano de TypeScript para validar variables de entorno y asegurar que estén definidas y tipadas, para evitar errores en tiempo de ejecución.",
    },
    github: "https://github.com/anibalalpizar/env-protector",
    demo: "https://www.npmjs.com/package/env-protector",
    downloads: "250+",
  },
  {
    id: "api-geo-cr",
    name: "API GEO CR",
    kind: "api",
    category: "api",
    featured: 2,
    stack: ["NestJS", "TypeScript"],
    description: {
      en: "API for Costa Rica’s provinces, cantons, and districts.",
      es: "API de provincias, cantones y distritos de Costa Rica.",
    },
    github: "https://github.com/anibalalpizar/api-geo-cr",
    demo: "https://api-geo-cr.vercel.app",
  },
  {
    id: "json-to-xml",
    name: "JSON to XML",
    kind: "web",
    category: "web",
    featured: 3,
    stack: ["Next.js", "Tailwind CSS", "shadcn/ui", "TypeScript"],
    description: {
      en: "Easily convert JSON to XML with a modern UI.",
      es: "Convierte JSON a XML fácilmente, con una interfaz moderna.",
    },
    github: "https://github.com/anibalalpizar/json-to-xml-converter",
    demo: "https://json-to-xml.vercel.app",
  },
  {
    id: "nextjs-landing",
    name: "Next.js Landing Page",
    kind: "landing",
    category: "web",
    featured: 4,
    homeStack: ["Next.js", "Tailwind CSS", "shadcn/ui", "TypeScript"],
    stack: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "TypeScript"],
    description: {
      en: "Open-source landing page built with Next.js and shadcn/ui.",
      es: "Landing page open source hecha con Next.js y shadcn/ui.",
    },
    github: "https://github.com/anibalalpizar/nextjs-shadcn-landing",
    demo: "https://nextjs-shadcn-landing.vercel.app",
  },
  {
    id: "api-stress",
    name: "API Stress",
    kind: "pkg",
    category: "npm",
    stack: ["TypeScript", "NPM", "Node.js"],
    description: {
      en: "Middleware to simulate network conditions in APIs.",
      es: "Middleware para simular condiciones de red en APIs.",
    },
    github: "https://github.com/anibalalpizar/api-stress",
    demo: "https://www.npmjs.com/package/api-stress",
    downloads: "70+",
  },
  {
    id: "audit-log-middleware",
    name: "Audit Log Middleware",
    kind: "pkg",
    category: "npm",
    stack: ["TypeScript", "NPM", "Node.js"],
    description: {
      en: "Automated audit logging system with JSON/CSV support.",
      es: "Sistema automatizado de registros de auditoría, compatible con JSON y CSV.",
    },
    github: "https://github.com/anibalalpizar/audit-log-middleware",
    demo: "https://www.npmjs.com/package/audit-log-middleware",
    downloads: "70+",
  },
  {
    id: "secure-password-checker",
    name: "Secure Password Checker",
    kind: "pkg",
    category: "npm",
    stack: ["TypeScript", "NPM", "Node.js"],
    description: {
      en: "A robust library for customizable password validation, designed to enhance security and prevent weak or compromised credentials.",
      es: "Librería robusta para validar contraseñas de forma configurable, pensada para reforzar la seguridad y evitar credenciales débiles o comprometidas.",
    },
    github: "https://github.com/anibalalpizar/secure-password-checker",
    demo: "https://www.npmjs.com/package/secure-password-checker",
    downloads: "65+",
  },
  {
    id: "terminal-portfolio-json",
    name: "Terminal Portfolio JSON",
    kind: "tool",
    category: "tools",
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    description: {
      en: "A portfolio powered by a single, customizable JSON configuration.",
      es: "Un portafolio que funciona con un único archivo de configuración JSON personalizable.",
    },
    github: "https://github.com/anibalalpizar/terminal-portfolio-json",
    demo: "https://terminal-portfolio-json.vercel.app",
  },
  {
    id: "shortify",
    name: "Shortify",
    kind: "tool",
    category: "tools",
    stack: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "TypeScript"],
    description: {
      en: "Link Shortener: Utilizing Next.js and Shadcn for blazing-fast performance and sleek design. Simplify link sharing with this modern, efficient tool.",
      es: "Acortador de enlaces hecho con Next.js y shadcn/ui, muy rápido y con un diseño limpio. Simplifica compartir enlaces con esta herramienta moderna y eficiente.",
    },
    github: "https://github.com/anibalalpizar/shortify",
    demo: "https://www.shortify.art",
  },
  {
    id: "agency-landing-page",
    name: "Agency Landing Page",
    kind: "landing",
    category: "web",
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    description: {
      en: "Website Home Page Design, Agency Website UI Design.",
      es: "Diseño de la página de inicio y de la interfaz del sitio web de una agencia.",
    },
    github: "https://github.com/anibalalpizar/nextjs-agency-landing",
    demo: "https://agency-landing-lime.vercel.app",
  },
  {
    id: "website-landing-page",
    name: "Website Landing Page",
    kind: "landing",
    category: "web",
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    description: {
      en: "Website Landing Page Design.",
      es: "Diseño de landing page para un sitio web.",
    },
    github: "https://github.com/anibalalpizar/nextjs-website-landing",
    demo: "https://nextjs-website-landing.vercel.app",
  },
]

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => a.featured! - b.featured!)

export const stack: { label: Localized; items: string[] }[] = [
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "Angular",
      "Tailwind CSS",
      "Bootstrap",
      "shadcn/ui",
      "Radix",
      "React Router",
      "Redux",
      "Styled Components",
      "Zod",
      "Figma",
      "React Query",
      "T3 Stack",
    ],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "NestJS", "Drizzle", "jQuery", "JWT", "Zod"],
  },
  {
    label: { en: "Languages", es: "Lenguajes" },
    items: ["TypeScript", "Java", "C#", "Bash", "JavaScript"],
  },
  {
    label: { en: "Databases", es: "Bases de datos" },
    items: ["PostgreSQL", "MongoDB", "SQL", "SQLite", "MySQL", "Redis"],
  },
  {
    label: { en: "Tools & DevOps", es: "Herramientas y DevOps" },
    items: [
      "Git",
      "Docker",
      "AWS",
      "Linux",
      "VS Code",
      "DigitalOcean",
      "Heroku",
      "Kubernetes",
      "Neovim",
      "Notion",
      "Obsidian",
      "Postman",
      "Railway",
      "Visual Studio",
      "Swagger",
      "Vim",
      "Vercel",
    ],
  },
]

export type Page = "home" | "case" | "projects"
