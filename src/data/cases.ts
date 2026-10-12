import type { Localized } from "../i18n/ui"
import { experience } from "./site"

export type Figure = {
  src: string
  width: number
  height: number
  /**
   * light: dark monochrome diagram on white, inverted in the dark theme.
   * dark: light monochrome diagram on black, inverted in the light theme.
   * color: photos and colored diagrams, never touched.
   */
  tone: "light" | "dark" | "color"
  /** "bleed" spans the frame edge to edge (wide photos only). */
  mode?: "plate" | "bleed"
  caption: Localized
  source?: string
}

type Block =
  | { p: Localized }
  | { list: { term: Localized; text: Localized }[] }

export type CaseSection = {
  title: Localized
  blocks: Block[]
  figures?: Figure[]
  detail?: { letter: string; title: Localized; text: Localized; figure?: Figure }
  video?: { youtubeId: string; caption: Localized }
}

export type CaseStudy = {
  /** Matches an `experience` id in site.ts; the case order follows those rows. */
  exp: string
  date: string
  titleHref: string
  title: Localized<{ before: string; link: string; after: string }>
  lead: Localized
  facts: { key: "client" | "organization" | "stack"; value: Localized }[]
  sections: CaseSection[]
}

const img = (path: string) => `/${path}`

export const cases: CaseStudy[] = [
  {
    exp: "tech-solutions",
    date: "2024-08-19",
    titleHref: "https://www.techkeppercr.com/",
    title: {
      en: { before: "Development of a Custom Web Application for a Restaurant for ", link: "techkeppercr", after: "" },
      es: { before: "Desarrollo de una aplicación web a la medida de un restaurante para ", link: "techkeppercr", after: "" },
    },
    lead: {
      en: "Development of a custom web application for a restaurant, focused on optimizing order management, customer interaction, and kitchen operations. This project was part of my internship using Next.js for the frontend and Express with Node.js for the backend.",
      es: "Desarrollo de una aplicación web a la medida para un restaurante, enfocada en optimizar la gestión de pedidos, la interacción con los clientes y las operaciones de cocina. Este proyecto fue parte de mi pasantía: usé Next.js para el frontend y Express con Node.js para el backend.",
    },
    facts: [
      { key: "client", value: "techkeppercr" },
      { key: "stack", value: "Next.js 14 · Express · Node.js · Prisma · Tailwind CSS · Jest · Swagger" },
    ],
    sections: [
      {
        title: { en: "Frontend Development", es: "Desarrollo del frontend" },
        blocks: [
          {
            p: {
              en: "The frontend of the application was developed using Next.js 14, a framework that offers server-side rendering and static site generation, making it an ideal choice for a high-performance web application. Using Next.js allowed us to deliver a fast and responsive user interface, crucial for restaurant operations where real-time updates are essential.",
              es: "El frontend se desarrolló con Next.js 14, un framework que ofrece renderizado del lado del servidor y generación de sitios estáticos, lo que lo hace ideal para una aplicación web de alto rendimiento. Next.js nos permitió entregar una interfaz rápida y adaptable, algo crucial en la operación de un restaurante, donde las actualizaciones en tiempo real son esenciales.",
            },
          },
        ],
        figures: [
          {
            src: img("2024/internship-at-tech-solutions/nextjs.jpg"),
            width: 900,
            height: 589,
            tone: "color",
            caption: { en: "How the pieces of Next.js fit together", es: "Cómo encajan las piezas de Next.js" },
          },
        ],
        detail: {
          letter: "A",
          title: { en: "Technical Details of the Frontend", es: "Detalles técnicos del frontend" },
          text: {
            en: "Next.js was chosen for its ability to handle complex routing, server-side rendering, and its seamless integration with React. Using useContext allowed us to efficiently manage state across different components, particularly for handling user sessions and order data. TailwindCSS was integrated for styling, providing consistent, responsive styling throughout the app.",
            es: "Elegimos Next.js por su capacidad para manejar rutas complejas y renderizado del lado del servidor, y por su integración natural con React. useContext nos permitió manejar el estado entre distintos componentes de forma eficiente, en especial las sesiones de usuario y los datos de los pedidos. Para los estilos integramos TailwindCSS, que dio un diseño consistente y adaptable en toda la aplicación.",
          },
          figure: {
            src: img("2024/internship-at-tech-solutions/contextapi.jpg"),
            width: 751,
            height: 541,
            tone: "light",
            caption: { en: "Sharing state with the Context API", es: "Estado compartido con la Context API" },
            source: "https://episyche.com/blog/how-to-use-context-api-in-a-nextjs-app",
          },
        },
      },
      {
        title: { en: "Backend Development", es: "Desarrollo del backend" },
        blocks: [
          {
            p: {
              en: "The backend was developed using Express and Node.js, with a focus on creating a robust and scalable API to manage the restaurant’s operations. The backend architecture was designed using a repository pattern, with Prisma as the ORM to interact with the SQL database. This setup provided a clear separation of responsibilities, making it easier to maintain and extend the code.",
              es: "El backend se desarrolló con Express y Node.js, con el foco en crear una API robusta y escalable para gestionar las operaciones del restaurante. La arquitectura se diseñó con el patrón Repository y Prisma como ORM para interactuar con la base de datos SQL. Esta configuración dio una separación clara de responsabilidades y facilitó mantener y extender el código.",
            },
          },
        ],
        figures: [
          {
            src: img("2024/internship-at-tech-solutions/nodejs.jpg"),
            width: 741,
            height: 362,
            tone: "color",
            caption: { en: "Structure of the Express REST API", es: "Estructura de la API REST con Express" },
            source: "https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way/",
          },
        ],
        detail: {
          letter: "B",
          title: { en: "Technical Details of the Backend", es: "Detalles técnicos del backend" },
          text: {
            en: "We implemented unit tests using Jest to ensure the reliability of the backend services. This was especially important for functions such as order processing and user authentication. In addition, comprehensive documentation was created to facilitate future development and maintenance, using Swagger for API documentation.",
            es: "Implementamos pruebas unitarias con Jest para asegurar la confiabilidad de los servicios del backend, algo especialmente importante en funciones como el procesamiento de pedidos y la autenticación de usuarios. Además, creamos documentación completa para facilitar el desarrollo y el mantenimiento futuros, con Swagger para documentar la API.",
          },
          figure: {
            src: img("2024/internship-at-tech-solutions/tests.jpg"),
            width: 800,
            height: 800,
            tone: "color",
            caption: { en: "Continuous integration flow", es: "Flujo de integración continua" },
          },
        },
      },
      {
        title: { en: "Results and Benefits", es: "Resultados y beneficios" },
        blocks: [
          {
            p: {
              en: "The web application significantly improved the restaurant’s operations by automating order management, reducing errors, and speeding up service. The responsive frontend combined with a powerful backend provided a seamless experience for both staff and customers, leading to increased efficiency and customer satisfaction.",
              es: "La aplicación web mejoró significativamente la operación del restaurante: automatizó la gestión de pedidos, redujo errores y agilizó el servicio. La combinación de un frontend adaptable con un backend sólido ofreció una experiencia fluida tanto al personal como a los clientes, con más eficiencia y mayor satisfacción.",
            },
          },
          {
            list: [
              {
                term: { en: "Improved User Experience", es: "Mejor experiencia de usuario" },
                text: {
                  en: "The Next.js-powered frontend offered a fast and responsive interface, essential for managing the restaurant’s real-time operations.",
                  es: "El frontend con Next.js ofreció una interfaz rápida y adaptable, esencial para gestionar en tiempo real la operación del restaurante.",
                },
              },
              {
                term: { en: "Scalable Backend", es: "Backend escalable" },
                text: {
                  en: "The Express and Node.js backend, combined with Prisma, allowed for easy scalability and maintenance, ensuring that the application could grow with the restaurant’s needs.",
                  es: "El backend con Express y Node.js, junto con Prisma, facilitó escalar y mantener la aplicación, para que pudiera crecer con las necesidades del restaurante.",
                },
              },
              {
                term: { en: "Greater Accuracy", es: "Mayor precisión" },
                text: {
                  en: "Automating order management reduced human errors, streamlining operations and improving service quality.",
                  es: "Automatizar la gestión de pedidos redujo los errores humanos, agilizó la operación y mejoró la calidad del servicio.",
                },
              },
            ],
          },
        ],
      },
      {
        title: { en: "Key Learnings", es: "Aprendizajes clave" },
        blocks: [
          {
            p: {
              en: "This project reinforced the importance of choosing the right technologies based on the project requirements. Using Next.js and useContext provided an efficient way to manage the frontend, while the backend benefited from the modular architecture enabled by the repository pattern and Prisma. Furthermore, the experience highlighted the need for thorough testing and documentation, which played a crucial role in the success of the project.",
              es: "Este proyecto reforzó la importancia de elegir las tecnologías adecuadas según los requerimientos. Next.js y useContext ofrecieron una forma eficiente de manejar el frontend, mientras que el backend se benefició de la arquitectura modular que permitieron el patrón Repository y Prisma. Además, la experiencia dejó clara la necesidad de pruebas y documentación exhaustivas, que fueron cruciales para el éxito del proyecto.",
            },
          },
        ],
        figures: [
          {
            src: img("2024/internship-at-tech-solutions/ideas.jpg"),
            width: 2115,
            height: 540,
            tone: "light",
            caption: { en: "Key learnings, mapped", es: "Aprendizajes clave, en un mapa" },
          },
        ],
      },
      {
        title: { en: "Software Presentation", es: "Presentación del software" },
        blocks: [
          {
            p: {
              en: "The following video demonstrates the key features and functionality of the web application developed for the restaurant.",
              es: "El siguiente video muestra las principales características y funcionalidades de la aplicación web desarrollada para el restaurante.",
            },
          },
        ],
        video: {
          youtubeId: "-894MRBJNGs",
          caption: { en: "Software preview", es: "Vista previa del software" },
        },
      },
    ],
  },

  {
    exp: "microsoft",
    date: "2024-08-03",
    titleHref: "https://mvp.microsoft.com/studentambassadors",
    title: {
      en: { before: "", link: "Microsoft Student Ambassador", after: "" },
      es: { before: "", link: "Microsoft Student Ambassador", after: "" },
    },
    lead: {
      en: "As a Microsoft Student Ambassador, I had the opportunity to engage with students and educators, sharing my knowledge and passion for technology. This role allowed me to contribute to the tech community, organize events, and collaborate with like-minded individuals. Here are some highlights from my experience as a Microsoft Student Ambassador.",
      es: "Como Microsoft Student Ambassador tuve la oportunidad de conectar con estudiantes y docentes, y de compartir mi conocimiento y mi pasión por la tecnología. Este rol me permitió aportar a la comunidad tecnológica, organizar eventos y colaborar con personas con intereses afines. Estos son algunos momentos destacados de esa experiencia.",
    },
    facts: [{ key: "organization", value: "Microsoft" }],
    sections: [
      {
        title: { en: "Community Engagement", es: "Participación en la comunidad" },
        blocks: [
          {
            p: {
              en: "One of the key responsibilities of a Microsoft Student Ambassador is to engage with the community, both on and off-campus. I aimed to inspire and empower the next generation of tech enthusiasts, encouraging them to explore new technologies and pursue their passion for innovation.",
              es: "Una de las responsabilidades principales de un Microsoft Student Ambassador es involucrarse con la comunidad, dentro y fuera del campus. Mi objetivo fue inspirar y empoderar a la próxima generación de entusiastas de la tecnología, animándolos a explorar nuevas herramientas y a seguir su pasión por la innovación.",
            },
          },
        ],
        figures: [
          {
            src: img("2024/microsoft-student-ambassador/microsoft-office.jpg"),
            width: 1600,
            height: 720,
            tone: "color",
            mode: "bleed",
            caption: { en: "Microsoft offices in Costa Rica", es: "Oficinas de Microsoft en Costa Rica" },
            source: "https://www.microsoft.com/es-cr/costa-rica",
          },
        ],
      },
      {
        title: { en: "My Experience", es: "Mi experiencia" },
        blocks: [
          {
            p: {
              en: "During my time as a Microsoft Student Ambassador, I had the opportunity to organize and participate in various events, workshops, and hackathons. These experiences not only allowed me to enhance my technical skills but also provided me with valuable networking opportunities and insights into the tech industry. I collaborated with students from diverse backgrounds, sharing knowledge and learning from each other’s experiences.",
              es: "Durante mi tiempo como Microsoft Student Ambassador organicé y participé en diversos eventos, talleres y hackatones. Estas experiencias no solo me permitieron mejorar mis habilidades técnicas: también me dieron valiosas oportunidades de networking y una mejor comprensión de la industria. Colaboré con estudiantes de perfiles muy distintos, compartiendo conocimientos y aprendiendo de sus experiencias.",
            },
          },
        ],
        figures: [
          {
            src: img("2024/microsoft-student-ambassador/anibal.jpg"),
            width: 1758,
            height: 3480,
            tone: "color",
            caption: { en: "At the Microsoft office", es: "En la oficina de Microsoft" },
          },
        ],
      },
    ],
  },

  {
    exp: "inventory",
    date: "2023-03-26",
    titleHref: "https://hogarbuensamaritano.org/",
    title: {
      en: { before: "Custom Software Development for ", link: "Hogar El Buen Samaritano", after: ": A Technical Summary" },
      es: { before: "Desarrollo de software a la medida para ", link: "Hogar El Buen Samaritano", after: ": resumen técnico" },
    },
    lead: {
      en: "This project involved the creation of a desktop application for inventory management at the Hogar El Buen Samaritano Association. This development was part of a university community service project (TCU) and was carried out by me and a team member. The main goal was to optimize the manual inventory control process, reduce errors, and improve the operational efficiency of the organization.",
      es: "Este proyecto consistió en crear una aplicación de escritorio para la gestión del inventario de la Asociación Hogar El Buen Samaritano. El desarrollo formó parte de un Trabajo Comunal Universitario (TCU) y lo realicé junto con un compañero de equipo. El objetivo principal era optimizar el control manual del inventario, reducir errores y mejorar la eficiencia operativa de la organización.",
    },
    facts: [
      { key: "client", value: "Hogar El Buen Samaritano" },
      { key: "stack", value: "C# · SQLite · Windows Forms" },
    ],
    sections: [
      {
        title: { en: "Requirements Analysis and Technology Selection", es: "Análisis de requerimientos y selección de tecnologías" },
        blocks: [
          {
            p: {
              en: "From the beginning of the project, a thorough analysis of user requirements was conducted to understand the specific needs of the Association. Based on this analysis, technologies were selected that offered a balance between robustness and ease of maintenance. We opted to use C# for developing the desktop application due to its native integration with Windows, and SQLite as the database management system for its lightweight and simple configuration.",
              es: "Desde el inicio del proyecto hicimos un análisis detallado de los requerimientos de los usuarios para entender las necesidades específicas de la Asociación. Con base en ese análisis, elegimos tecnologías que ofrecieran un equilibrio entre robustez y facilidad de mantenimiento: C# para la aplicación de escritorio, por su integración nativa con Windows, y SQLite como sistema de base de datos, por ser liviano y fácil de configurar.",
            },
          },
        ],
      },
      {
        title: { en: "User Interface Design", es: "Diseño de la interfaz de usuario" },
        blocks: [
          {
            p: {
              en: "One of the main challenges was designing an intuitive and accessible user interface for the association’s staff, who did not necessarily have advanced technical knowledge. We implemented a user-centered approach, using minimalist design principles to reduce the learning curve and increase system adoption. The interface was built using Windows Forms, which offered the necessary flexibility to customize the user experience according to the organization’s needs.",
              es: "Uno de los principales desafíos fue diseñar una interfaz intuitiva y accesible para el personal de la asociación, que no necesariamente tenía conocimientos técnicos avanzados. Aplicamos un enfoque centrado en el usuario, con principios de diseño minimalista para reducir la curva de aprendizaje y aumentar la adopción del sistema. La interfaz se construyó con Windows Forms, que daba la flexibilidad necesaria para adaptar la experiencia a las necesidades de la organización.",
            },
          },
        ],
        figures: [
          {
            src: img("2023/inventory-management-system-for-non-profit/diagram.jpg"),
            width: 1376,
            height: 2400,
            tone: "dark",
            caption: { en: "From challenges to a user-friendly design", es: "De los desafíos a un diseño fácil de usar" },
          },
        ],
      },
      {
        title: { en: "State Management and Data Synchronization", es: "Gestión de estado y sincronización de datos" },
        blocks: [
          {
            p: {
              en: "To ensure data consistency across different modules of the application, a state management system was implemented that centralizes data handling in a single source of truth. Additionally, a data synchronization mechanism was developed to allow operation in offline mode, storing changes locally and synchronizing them with the central database once the connection is restored.",
              es: "Para asegurar la consistencia de los datos entre los distintos módulos de la aplicación, implementamos un sistema de gestión de estado que centraliza el manejo de los datos en una única fuente de verdad. Además, desarrollamos un mecanismo de sincronización que permite trabajar sin conexión: los cambios se guardan localmente y se sincronizan con la base de datos central cuando se restablece la conexión.",
            },
          },
        ],
      },
      {
        title: { en: "Repository Pattern Implementation", es: "Implementación del patrón Repository" },
        blocks: [
          {
            p: {
              en: "To decouple data access logic from business logic, the Repository pattern was implemented. This pattern provided effective abstraction between the database and the application, facilitating changes in the persistence layer without affecting other parts of the system. The implementation of the Repository pattern also made unit testing easier, allowing the use of mock objects to simulate database interactions.",
              es: "Para desacoplar la lógica de acceso a datos de la lógica de negocio, implementamos el patrón Repository. Este patrón ofreció una abstracción eficaz entre la base de datos y la aplicación, y facilitó los cambios en la capa de persistencia sin afectar otras partes del sistema. También simplificó las pruebas unitarias, al permitir usar objetos simulados (mocks) para reproducir las interacciones con la base de datos.",
            },
          },
        ],
        figures: [
          {
            src: img("2023/inventory-management-system-for-non-profit/diagram-db.jpg"),
            width: 489,
            height: 171,
            tone: "color",
            caption: { en: "The Repository pattern", es: "El patrón Repository" },
            source: "https://www.veloxcore.com/repository-pattern-csharp-entity-framework/",
          },
        ],
      },
      {
        title: { en: "Results and Benefits", es: "Resultados y beneficios" },
        blocks: [
          {
            p: {
              en: "The development of this application not only met the stated objectives but also brought unexpected benefits. The automation of the inventory process significantly reduced response times during internal audits and improved the accuracy of financial reports. The association’s staff reported a decrease in workload related to inventory management, allowing them to focus more on the organization’s core activities.",
              es: "La aplicación no solo cumplió los objetivos planteados, sino que también trajo beneficios inesperados. La automatización del inventario redujo significativamente los tiempos de respuesta en las auditorías internas y mejoró la precisión de los informes financieros. El personal de la asociación reportó una menor carga de trabajo en la gestión del inventario, lo que le permitió dedicar más tiempo a las actividades centrales de la organización.",
            },
          },
          {
            list: [
              {
                term: { en: "Time Optimization", es: "Optimización del tiempo" },
                text: {
                  en: "Digitizing the inventory allowed for a reduction in the time spent on management, increasing operational efficiency.",
                  es: "Digitalizar el inventario redujo el tiempo dedicado a su gestión y aumentó la eficiencia operativa.",
                },
              },
              {
                term: { en: "Increased Accuracy", es: "Mayor precisión" },
                text: {
                  en: "Automating the control process reduced common errors in manual inventory handling.",
                  es: "Automatizar el control redujo los errores comunes del manejo manual del inventario.",
                },
              },
              {
                term: { en: "Audit Improvements", es: "Mejores auditorías" },
                text: {
                  en: "The accuracy and accessibility of data facilitated internal audit processes and improved transparency.",
                  es: "La precisión y la accesibilidad de los datos facilitaron las auditorías internas y mejoraron la transparencia.",
                },
              },
            ],
          },
        ],
      },
      {
        title: { en: "Conclusions and Recommendations", es: "Conclusiones y recomendaciones" },
        blocks: [
          {
            p: {
              en: "The experience gained during this project highlighted the importance of good planning and the proper selection of tools and technologies. The modularity of the code, along with the abstraction of data access logic, made the system easily maintainable and scalable. We recommend that future similar projects consider the importance of involving end users throughout the development process to ensure the final solution meets their expectations and needs.",
              es: "La experiencia de este proyecto dejó clara la importancia de una buena planificación y de elegir bien las herramientas y tecnologías. La modularidad del código, junto con la abstracción del acceso a datos, hizo que el sistema fuera fácil de mantener y de escalar. Para proyectos similares, recomendamos involucrar a los usuarios finales durante todo el desarrollo, para asegurar que la solución final responda a sus expectativas y necesidades.",
            },
          },
        ],
      },
    ],
  },

  {
    exp: "medical",
    date: "2022-12-15",
    titleHref: "https://www.levelsolo.io/",
    title: {
      en: { before: "Medical Prescription App Development for ", link: "Lvel Solo", after: ": A Technical Overview" },
      es: { before: "Desarrollo de una app de recetas médicas para ", link: "Lvel Solo", after: ": resumen técnico" },
    },
    lead: {
      en: "Desktop application for managing medical prescriptions, targeting a client in Chile, a healthcare professional who previously relied on manual processes for creating prescriptions. The main objective was to optimize these processes, reducing inefficiencies and improving patient care.",
      es: "Aplicación de escritorio para gestionar recetas médicas, dirigida a un cliente en Chile: un profesional de la salud que hasta entonces dependía de procesos manuales para crear sus recetas. El objetivo principal era optimizar esos procesos, reducir ineficiencias y mejorar la atención a los pacientes.",
    },
    facts: [{ key: "client", value: "Lvel Solo · Chile" }],
    sections: [
      {
        title: { en: "Initial Challenges and Problems", es: "Desafíos y problemas iniciales" },
        blocks: [
          {
            p: {
              en: "Prior to the development of the app, the client was facing several challenges. The manual process was not only slow, but also prone to human error, which could compromise the quality of patient care. The need to automate prescription creation and delivery, as well as improve management of patient and user data, was evident from the start.",
              es: "Antes de la aplicación, el cliente enfrentaba varios desafíos. El proceso manual no solo era lento, sino también propenso a errores humanos, lo que podía comprometer la calidad de la atención. Desde el inicio era evidente la necesidad de automatizar la creación y el envío de recetas, y de mejorar la gestión de los datos de pacientes y usuarios.",
            },
          },
        ],
        figures: [
          {
            src: img("2022/medical-prescription-app-development/initial-diagram.jpg"),
            width: 657,
            height: 539,
            tone: "color",
            caption: { en: "Use-case diagram — initial cycle", es: "Diagrama de casos de uso — ciclo inicial" },
          },
        ],
      },
      {
        title: { en: "Choosing Architecture and Design Patterns", es: "Elección de la arquitectura y los patrones de diseño" },
        blocks: [
          {
            p: {
              en: "I opted for a 3-Layer Architecture for this project, using design patterns such as Business Logic Layer (BLL) and Data Access Layer (DAL). This choice was not arbitrary; the separation of the business logic and data access layers was crucial to keeping the code modular and maintainable. With this structure, any changes to the business logic or the database could be handled in isolation, minimizing the impact on other parts of the system. Furthermore, this architecture allows for greater flexibility to scale the application in the future, by allowing different components to be developed and updated independently.",
              es: "Opté por una arquitectura de 3 capas, con patrones de diseño como la capa de lógica de negocio (BLL) y la capa de acceso a datos (DAL). No fue una elección arbitraria: separar la lógica de negocio del acceso a datos era clave para mantener el código modular y fácil de mantener. Con esta estructura, cualquier cambio en la lógica de negocio o en la base de datos podía manejarse de forma aislada, minimizando el impacto en el resto del sistema. Además, esta arquitectura da más flexibilidad para escalar la aplicación en el futuro, porque permite desarrollar y actualizar cada componente por separado.",
            },
          },
        ],
        figures: [
          {
            src: img("2022/medical-prescription-app-development/3-layers-diagram.jpg"),
            width: 1366,
            height: 890,
            tone: "light",
            caption: {
              en: "Sequence diagram — generating and emailing a report",
              es: "Diagrama de secuencia — generar y enviar un reporte por correo",
            },
          },
        ],
      },
      {
        title: { en: "Factory Pattern Implementation", es: "Implementación del patrón Factory" },
        blocks: [
          {
            p: {
              en: "In addition, I implemented the Factory pattern to manage the creation of objects within the application. This pattern proved to be essential in simplifying the addition of new functionalities without the need to modify existing code. Implementing the Factory pattern facilitated the integration of new features in a fluid manner without affecting the stability of the system. This flexibility was key to the success of the project, allowing the application to evolve according to the client’s changing needs without compromising its stability.",
              es: "Además, implementé el patrón Factory para gestionar la creación de objetos dentro de la aplicación. Este patrón resultó esencial para simplificar la incorporación de nuevas funcionalidades sin modificar el código existente, y permitió integrar nuevas características con fluidez y sin afectar la estabilidad del sistema. Esa flexibilidad fue clave para el éxito del proyecto: la aplicación pudo evolucionar según las necesidades cambiantes del cliente sin comprometer su estabilidad.",
            },
          },
        ],
        figures: [
          {
            src: img("2022/medical-prescription-app-development/factory-diagram.jpg"),
            width: 1920,
            height: 1200,
            tone: "color",
            caption: { en: "The Factory Method, illustrated", es: "El Factory Method, ilustrado" },
            source: "https://refactoring.guru/design-patterns/factory-method",
          },
        ],
      },
      {
        title: { en: "Results and Benefits", es: "Resultados y beneficios" },
        blocks: [
          {
            p: {
              en: "The development of this application brought with it multiple benefits. Automating the creation of prescriptions significantly reduced the time needed to complete this task, allowing the client to focus on other critical areas of their medical practice. Digitizing the process minimized human errors associated with manual methods, improving the accuracy of the prescriptions issued. In addition, more efficient and accurate management of prescriptions resulted in better patient care, with faster turnaround times and greater overall satisfaction. The implementation of this application not only optimized the client’s internal processes, but also contributed to a better experience for patients, reflecting a positive impact on the quality of the service offered.",
              es: "Esta aplicación trajo múltiples beneficios. Automatizar la creación de recetas redujo significativamente el tiempo necesario para esta tarea, lo que permitió al cliente concentrarse en otras áreas críticas de su práctica médica. Digitalizar el proceso minimizó los errores humanos propios de los métodos manuales y mejoró la precisión de las recetas emitidas. Además, una gestión más eficiente y precisa de las recetas se tradujo en una mejor atención, con tiempos de respuesta más cortos y mayor satisfacción general. La aplicación no solo optimizó los procesos internos del cliente: también mejoró la experiencia de los pacientes, con un impacto positivo en la calidad del servicio.",
            },
          },
          {
            list: [
              {
                term: { en: "Increased Efficiency", es: "Mayor eficiencia" },
                text: {
                  en: "Automating prescription creation significantly reduced the time required to complete this task, allowing the client to focus on other critical areas of their medical practice.",
                  es: "Automatizar la creación de recetas redujo significativamente el tiempo de esta tarea, lo que permitió al cliente concentrarse en otras áreas críticas de su práctica médica.",
                },
              },
              {
                term: { en: "Error Reduction", es: "Menos errores" },
                text: {
                  en: "Digitizing the process minimized human errors associated with manual methods, which in turn improved the accuracy of the prescriptions issued.",
                  es: "Digitalizar el proceso minimizó los errores humanos de los métodos manuales, lo que a su vez mejoró la precisión de las recetas emitidas.",
                },
              },
              {
                term: { en: "Improved Patient Care", es: "Mejor atención al paciente" },
                text: {
                  en: "More efficient and accurate prescription management resulted in better patient care, with faster turnaround times and greater overall satisfaction.",
                  es: "Una gestión de recetas más eficiente y precisa se tradujo en una mejor atención, con tiempos de respuesta más cortos y mayor satisfacción general.",
                },
              },
            ],
          },
        ],
      },
      {
        title: { en: "Key Learnings", es: "Aprendizajes clave" },
        blocks: [
          {
            p: {
              en: "The development process was a valuable learning experience. Modularity turned out to be one of the most important aspects of the project; utilizing BLLs and DALs not only made code maintenance easier, but also allowed for scalability that would have been difficult to achieve with a monolithic structure. I also learned the importance of designing with the end user in mind. Although technical solutions were crucial, customer adoption was highly dependent on the user-friendliness of the interface. This experience reaffirmed the need to balance technical complexity with simplicity in user interface design. Implementing a modular and flexible architecture allowed for not only an efficient solution for the present, but also a solid foundation for future extensions and improvements.",
              es: "El desarrollo fue una experiencia de aprendizaje muy valiosa. La modularidad resultó uno de los aspectos más importantes del proyecto: usar BLL y DAL no solo facilitó el mantenimiento del código, sino que permitió una escalabilidad difícil de lograr con una estructura monolítica. También aprendí la importancia de diseñar pensando en el usuario final. Aunque las soluciones técnicas fueron cruciales, la adopción por parte del cliente dependía en gran medida de lo fácil de usar que fuera la interfaz. Esta experiencia reafirmó la necesidad de equilibrar la complejidad técnica con la simplicidad en el diseño de la interfaz. Una arquitectura modular y flexible permitió no solo una solución eficiente para el presente, sino también una base sólida para futuras extensiones y mejoras.",
            },
          },
        ],
        figures: [
          {
            src: img("2022/medical-prescription-app-development/evidence-1.png"),
            width: 881,
            height: 516,
            tone: "color",
            caption: { en: "Login screen of the application", es: "Pantalla de inicio de sesión de la aplicación" },
          },
        ],
      },
      {
        title: { en: "Future Improvements", es: "Mejoras a futuro" },
        blocks: [
          {
            p: {
              en: "Although the project was successful, there is always room for improvement. An integration with electronic health record (EHR) systems would be a valuable addition, allowing for direct synchronization with patient medical records and further improving the efficiency of the system. Additionally, collecting and analyzing user feedback will be key to continuing to refine and improve the application, ensuring that it continues to meet the needs of the client and their patients. Implementing a feedback system will allow for areas of improvement to be identified and the application to be adapted to the changing demands of the medical environment.",
              es: "Aunque el proyecto fue un éxito, siempre hay espacio para mejorar. Integrar la aplicación con sistemas de expediente clínico electrónico (EHR) sería un aporte valioso: permitiría sincronizar directamente los expedientes de los pacientes y haría el sistema aún más eficiente. Además, recopilar y analizar la retroalimentación de los usuarios será clave para seguir refinando la aplicación y asegurar que continúe respondiendo a las necesidades del cliente y de sus pacientes. Un sistema de retroalimentación permitiría identificar áreas de mejora y adaptar la aplicación a las demandas cambiantes del entorno médico.",
            },
          },
          {
            list: [
              {
                term: { en: "Integration with EHR Systems", es: "Integración con sistemas EHR" },
                text: {
                  en: "A future iteration could include integration with electronic health record (EHR) systems, allowing for direct synchronization with patient medical records.",
                  es: "Una próxima versión podría integrarse con sistemas de expediente clínico electrónico (EHR) para sincronizar directamente los expedientes de los pacientes.",
                },
              },
              {
                term: { en: "User Feedback Analysis", es: "Análisis de retroalimentación" },
                text: {
                  en: "Collecting and analyzing user feedback will be key to refining and improving the application, ensuring that it continues to meet the needs of the client and their patients.",
                  es: "Recopilar y analizar la retroalimentación de los usuarios será clave para refinar la aplicación, de modo que siga respondiendo a las necesidades del cliente y de sus pacientes.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
]

/** Each case joined with its Experience row (order, role, short name, page path). */
export const caseStudies = cases.map((study) => {
  const job = experience.find((entry) => entry.id === study.exp)
  if (!job?.casePath) throw new Error(`No experience row with a casePath for "${study.exp}"`)
  return { ...study, job, path: job.casePath }
})
