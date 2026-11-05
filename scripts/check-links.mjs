// Checks that every internal link in the built site points to something that
// exists: pages, files (CV, RSS, images) and the ⌘K menu targets, plus absolute
// links to this site (canonical, hreflang, link preview images).
// External sites aren't checked: they can go down for reasons outside this repo.
//
// Usage: node scripts/check-links.mjs [dist]   (exits with 1 if a link is broken)
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"

const root = process.argv[2] ?? "dist"
const { url: SITE_URL } = JSON.parse(readFileSync("src/data/cv.json", "utf8")).basics
const origin = new URL(SITE_URL).origin

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]
  )
const decode = (s) => s.replace(/&#34;|&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&")

/** "/blog/" → dist/blog/index.html; "/rss.xml" → dist/rss.xml. */
function exists(path) {
  const file = join(root, decodeURIComponent(path))
  return path.endsWith("/") ? existsSync(join(file, "index.html")) : existsSync(file)
}

const pages = walk(root).filter((file) => file.endsWith(".html"))
const broken = []
const noSlash = []
let checked = 0

for (const file of pages) {
  const html = readFileSync(file, "utf8")
  const page = "/" + relative(root, file).replace(/\\/g, "/").replace(/index\.html$/, "")
  const targets = new Set()

  for (const [, value] of html.matchAll(/(?:href|src|content|data-href|data-home)="([^"]*)"/g)) {
    const link = decode(value)
    if (link.startsWith("/") && !link.startsWith("//")) targets.add(link)
    else if (link.startsWith(origin + "/")) targets.add(link.slice(origin.length))
  }
  const items = html.match(/data-items="([^"]*)"/)
  if (items) for (const item of JSON.parse(decode(items[1]))) if (item.target?.startsWith("/")) targets.add(item.target)

  for (const target of targets) {
    const path = target.split(/[?#]/)[0]
    checked++
    if (!exists(path)) broken.push(`${page} → ${target}`)
    // GitHub Pages serves pages as folders; without the slash a link goes through a redirect.
    else if (!path.endsWith("/") && !/\.[a-z0-9]+$/i.test(path)) noSlash.push(`${page} → ${target}`)
  }
}

console.log(`${pages.length} pages, ${checked} internal links checked`)
if (noSlash.length) console.log(`\nLinks without the trailing slash:\n  ${noSlash.join("\n  ")}`)
if (broken.length) {
  console.log(`\nBroken links:\n  ${broken.join("\n  ")}`)
  process.exit(1)
}
console.log("No broken links.")
