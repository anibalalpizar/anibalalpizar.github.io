import type { APIRoute, GetStaticPaths } from "astro"
import type { Lang } from "../../i18n/ui"
import { searchData } from "../../utils/search"

// /search/en.json and /search/es.json, loaded by the ⌘K menu when it first opens.
export const getStaticPaths = (() => [{ params: { lang: "en" } }, { params: { lang: "es" } }]) satisfies GetStaticPaths

export const GET: APIRoute = async ({ params }) =>
  new Response(JSON.stringify(await searchData(params.lang as Lang)), {
    headers: { "Content-Type": "application/json" },
  })
