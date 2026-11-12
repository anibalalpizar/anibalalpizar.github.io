// What only the CV shows. Everything else on it (jobs, dates, roles, stack,
// links) comes from site.ts and cv.json, so the CV and the site can't disagree.
// The PDFs are made from src/components/pages/CvPage.astro by scripts/build-cv.mjs.
import type { Localized } from "../i18n/ui"

/** Full legal name, as it appears on the CV. */
export const LEGAL_NAME = "Aníbal Alberto Alpízar Campos"
export const PHONE = "+506 7169 9681"

export const objective: Localized = {
  en: "Software Engineer with development skills. Committed to effective communication and motivated to learn. I am looking for a position where I can apply and develop my skills in a dynamic professional environment.",
  es: "Ingeniero de software con habilidades de desarrollo, comprometido con la comunicación efectiva y con ganas de aprender. Busco un puesto donde aplicar y desarrollar mis habilidades en un entorno profesional dinámico.",
}

/** Per Experience row (by its id in site.ts): a different name for the CV, and what was done. */
export const jobDetails: Record<string, { organization?: Localized; bullets?: Localized<string[]> }> = {
  "grupo-asesor": {
    organization: "Grupo Asesor en Informática S.A.",
    bullets: {
      en: [
        "Develop and maintain digital solutions for Costa Rican public institutions; currently on a project for the Ministry of Public Works and Transport (MOPT).",
        "Built features for the RETC-REACAI system of the Ministry of Health.",
        "Implemented an internal transportation and overtime management system for the Legislative Assembly of Costa Rica.",
        "Developed and maintain background services for PROCOMER.",
        "Work on frontend and backend features across systems and domains, within existing architectures and adapting solutions to each institution's requirements.",
      ],
      es: [
        "Desarrollo y mantengo soluciones digitales para instituciones públicas de Costa Rica; actualmente en un proyecto para el Ministerio de Obras Públicas y Transportes (MOPT).",
        "Desarrollé funcionalidades del sistema RETC-REACAI del Ministerio de Salud.",
        "Implementé un sistema de gestión de transporte interno y horas extra para la Asamblea Legislativa de Costa Rica.",
        "Desarrollé y mantengo servicios en segundo plano para PROCOMER.",
        "Trabajo en frontend y backend en distintos sistemas y dominios, dentro de arquitecturas existentes y adaptando las soluciones a los requisitos de cada institución.",
      ],
    },
  },
  "tech-solutions": {
    bullets: {
      en: [
        "Modernized order management and operations in a restaurant, replacing inefficient and error-prone manual methods.",
        "Built a web application with Next.js and Node.js that automates order management, reducing errors and speeding up service.",
        "Improved operational efficiency and the experience of staff and customers.",
      ],
      es: [
        "Modernicé la gestión de pedidos y las operaciones de un restaurante, reemplazando métodos manuales ineficientes y propensos a errores.",
        "Desarrollé una aplicación web con Next.js y Node.js que automatiza la gestión de pedidos, reduce errores y agiliza el servicio.",
        "Mejoré la eficiencia operativa y la experiencia del personal y de los clientes.",
      ],
    },
  },
  microsoft: {
    bullets: {
      en: [
        "Engaged with fellow students to promote Microsoft technologies and initiatives.",
        "Organized and took part in campus events about technology and innovation.",
        "Collaborated with Microsoft teams to give feedback on products and services.",
      ],
      es: [
        "Promoví las tecnologías e iniciativas de Microsoft entre estudiantes.",
        "Organicé y participé en eventos de tecnología e innovación en el campus.",
        "Colaboré con equipos de Microsoft dando retroalimentación sobre productos y servicios.",
      ],
    },
  },
  inventory: {
    organization: "Asoc. Hogar El Buen Samaritano",
    bullets: {
      en: [
        "Built an inventory management application with .NET and SQL during a university community work project (TCU).",
        "Worked closely with the staff to understand the needs and problems of their inventory control.",
        "Replaced manual processes, reducing the time spent on inventory tasks and the errors they caused.",
      ],
      es: [
        "Desarrollé una aplicación de gestión de inventario con .NET y SQL durante el Trabajo Comunal Universitario (TCU).",
        "Trabajé de cerca con el personal para entender las necesidades y problemas de su control de inventario.",
        "Reemplacé procesos manuales, reduciendo el tiempo dedicado al inventario y los errores que causaban.",
      ],
    },
  },
  medical: {
    organization: { en: "Freelance project", es: "Proyecto freelance" },
    bullets: {
      en: [
        "Built a desktop application with .NET and SQL with a medical professional to replace manual prescriptions.",
        "Significantly reduced the time spent writing prescriptions and minimized errors, improving patient care.",
      ],
      es: [
        "Desarrollé con un profesional médico una aplicación de escritorio en .NET y SQL para reemplazar las recetas manuales.",
        "Reduje de forma importante el tiempo dedicado a las recetas y minimicé errores, mejorando la atención al paciente.",
      ],
    },
  },
}

export const education: { school: string; degrees: { title: Localized; years: string }[] }[] = [
  {
    school: "Universidad Técnica Nacional · Sede Central",
    degrees: [
      {
        title: { en: "Licentiate in Software Engineering (in progress)", es: "Licenciatura en Ingeniería del Software (en curso)" },
        years: "2025–2027",
      },
      { title: { en: "Bachelor of Software Engineering", es: "Bachillerato en Ingeniería del Software" }, years: "2023–2024" },
      { title: { en: "Diploma in Information Technology", es: "Diplomado en Tecnologías de la Información" }, years: "2021–2023" },
    ],
  },
  {
    school: "Colegio Técnico Profesional de Flores · Heredia",
    degrees: [
      { title: { en: "IT Support Technician", es: "Técnico medio en Informática en Soporte" }, years: "2019–2021" },
    ],
  },
]

export const languages: Localized<string[]> = {
  en: ["Spanish (native)", "English (intermediate)"],
  es: ["Español (nativo)", "Inglés (intermedio)"],
}

export const interests: Localized = {
  en: "Passionate about sharing knowledge; regular contributor to open-source projects.",
  es: "Me apasiona compartir conocimiento; contribuyo con regularidad a proyectos open source.",
}
