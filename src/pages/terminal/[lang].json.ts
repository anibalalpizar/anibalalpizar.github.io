import type { APIRoute, GetStaticPaths } from "astro"
import type { Lang } from "../../i18n/ui"
import { terminalData } from "../../utils/terminal"

// /terminal/en.json and /terminal/es.json, loaded by the terminal when it opens.
export const getStaticPaths = (() => [{ params: { lang: "en" } }, { params: { lang: "es" } }]) satisfies GetStaticPaths

export const GET: APIRoute = async ({ params }) =>
  new Response(JSON.stringify(await terminalData(params.lang as Lang)), {
    headers: { "Content-Type": "application/json" },
  })
