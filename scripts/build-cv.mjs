// Prints the CV pages (/cv/ and /es/cv/, from src/components/pages/CvPage.astro)
// to PDF with Chrome, saves each where its <meta name="cv-pdf"> says (e.g.
// dist/Aníbal_CV.pdf), then removes the CV pages: only the PDFs are published.
// Runs after `astro build` (see "build" in package.json).
//
// Usage: node scripts/build-cv.mjs [dist]
// Chrome is found in the usual places, or set CHROME_PATH.
import { existsSync } from "node:fs"
import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { createServer } from "node:http"
import { dirname, extname, join, normalize } from "node:path"
import puppeteer from "puppeteer-core"

const root = process.argv[2] ?? "dist"
const pages = ["/cv/", "/es/cv/"]

const chrome =
  process.env.CHROME_PATH ??
  [
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  ].find((path) => existsSync(path))
if (!chrome) throw new Error("build-cv: Chrome not found; set CHROME_PATH")

// A small static server, so the pages load their fonts and styles as on the site.
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".woff2": "font/woff2" }
const server = createServer(async (request, response) => {
  const path = decodeURIComponent(new URL(request.url, "http://localhost").pathname)
  const file = normalize(join(root, path.endsWith("/") ? `${path}index.html` : path))
  let body
  try {
    if (!file.startsWith(normalize(root))) throw new Error("outside dist")
    body = await readFile(file)
  } catch {
    return response.writeHead(404).end()
  }
  response.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" })
  response.end(body)
})
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve))
const base = `http://127.0.0.1:${server.address().port}`

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  // GitHub's Linux runners need these to start Chrome.
  args: process.platform === "linux" ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
})

try {
  for (const path of pages) {
    const page = await browser.newPage()
    const response = await page.goto(base + path, { waitUntil: "networkidle0" })
    if (!response?.ok()) throw new Error(`build-cv: ${path} returned ${response?.status()}`)
    await page.evaluate(() => document.fonts.ready)
    const target = await page.$eval('meta[name="cv-pdf"]', (meta) => meta.content)
    const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true, tagged: true })
    const out = join(root, target)
    await mkdir(dirname(out), { recursive: true })
    await writeFile(out, pdf)
    await page.close()
    // The page was only a source for the PDF.
    await rm(join(root, path), { recursive: true })
    console.log(`build-cv: ${path} → ${target} (${Math.round(pdf.length / 1024)} KB)`)
  }
} finally {
  await browser.close()
  server.close()
}
