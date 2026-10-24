// schema.org data (JSON-LD) that tells search engines who the site is about
// and what each page is. Everything is derived from src/data, so it stays in sync.
import { basics } from "../data/cv.json"
import {
  experience,
  FULL_NAME,
  GITHUB_URL,
  LINKEDIN_URL,
  projects,
  SITE_URL,
} from "../data/site"
import { L, localePath, type Lang } from "../i18n/ui"

const abs = (path: string) => new URL(path, SITE_URL).href
const PERSON_ID = abs("/#person")
const WEBSITE_ID = abs("/#website")

function person(lang: Lang) {
  const current = experience.find((job) => job.endDate == null)
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: FULL_NAME,
    url: abs("/"),
    image: abs("/logo.jpg"),
    jobTitle: current ? L(current.role, lang) : undefined,
    worksFor: current ? { "@type": "Organization", name: L(current.company, lang) } : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: basics.location.city,
      addressCountry: basics.location.countryCode,
    },
    sameAs: [GITHUB_URL, LINKEDIN_URL],
  }
}

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: abs("/"),
  name: FULL_NAME,
  inLanguage: ["en", "es"],
  publisher: { "@id": PERSON_ID },
}

/** Home: a profile page about the person. */
export function homeData(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      website,
      person(lang),
      {
        "@type": "ProfilePage",
        url: abs(localePath(lang, "/")),
        inLanguage: lang,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
      },
    ],
  }
}

/** /projects: the list of projects. */
export function projectsData(lang: Lang, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      website,
      person(lang),
      {
        "@type": "CollectionPage",
        name,
        description,
        url: abs(localePath(lang, "/projects")),
        inLanguage: lang,
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((project, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "SoftwareSourceCode",
              name: project.name,
              description: L(project.description, lang),
              codeRepository: project.github,
              url: project.demo,
              programmingLanguage: project.stack.includes("TypeScript") ? "TypeScript" : undefined,
              author: { "@id": PERSON_ID },
            },
          })),
        },
      },
    ],
  }
}

type ArticlePage = {
  path: string
  headline: string
  description: string
  date: string
  image: string
  keywords?: string[]
}

function article(lang: Lang, type: "Article" | "BlogPosting", page: ArticlePage) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      website,
      person(lang),
      {
        "@type": type,
        headline: page.headline,
        description: page.description,
        datePublished: page.date,
        url: abs(localePath(lang, page.path)),
        inLanguage: lang,
        image: abs(page.image),
        keywords: page.keywords?.join(", "),
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
    ],
  }
}

/** Case study: an article written by the person. */
export function caseData(lang: Lang, page: ArticlePage) {
  return article(lang, "Article", page)
}

/** Blog post. */
export function postData(lang: Lang, page: ArticlePage) {
  return article(lang, "BlogPosting", page)
}

/** /blog: the list of posts. */
export function blogData(
  lang: Lang,
  name: string,
  description: string,
  posts: { path: string; headline: string; date: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      website,
      person(lang),
      {
        "@type": "Blog",
        name,
        description,
        url: abs(localePath(lang, "/blog")),
        inLanguage: lang,
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.headline,
          url: abs(localePath(lang, post.path)),
          datePublished: post.date,
          author: { "@id": PERSON_ID },
        })),
      },
    ],
  }
}
