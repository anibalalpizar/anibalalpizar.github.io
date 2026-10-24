// Builds the 1200×630 social preview for a case study (or a blog post), following
// the designer's "og-article" template: blueprint frame, a small kicker line,
// the title, and the name + domain at the bottom. Runs at build time only.
import { readFile } from "node:fs/promises"
import { createRequire } from "node:module"
import { Resvg } from "@resvg/resvg-js"
import satori from "satori"
import { SITE_URL } from "../data/site"

const require = createRequire(import.meta.url)
const fontFile = (weight: 400 | 600) =>
  readFile(require.resolve(`@fontsource/geist-mono/files/geist-mono-latin-${weight}-normal.woff`))

const WIDTH = 1200
const HEIGHT = 630
const LINE = "#262626"
const MARK = "#6b6b6b"
const MUTED = "#a1a1a1"
const FG = "#ededed"

type Node = { type: string; props: Record<string, unknown> }
const el = (style: Record<string, unknown>, children?: unknown): Node => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children },
})

const lines = [
  el({ position: "absolute", top: 0, bottom: 0, left: 71, width: 2, background: LINE }),
  el({ position: "absolute", top: 0, bottom: 0, left: 1127, width: 2, background: LINE }),
  el({ position: "absolute", left: 0, right: 0, top: 71, height: 2, background: LINE }),
  el({ position: "absolute", left: 0, right: 0, top: 557, height: 2, background: LINE }),
]

// "+" marks: 26px, 2px stroke, centred on the four frame crossings.
const marks = [
  [59, 59],
  [1115, 59],
  [59, 545],
  [1115, 545],
].flatMap(([left, top]) => [
  el({ position: "absolute", left: left + 12, top, width: 2, height: 26, background: MARK }),
  el({ position: "absolute", left, top: top + 12, width: 26, height: 2, background: MARK }),
])

export async function renderOgImage({
  kicker,
  aside = "",
  title,
}: {
  /** Top-left line, e.g. "Case study · 2024". */
  kicker: string
  /** Top-right line, e.g. "5 min read" for blog posts. */
  aside?: string
  title: string
}) {
  // 64px fits about 75 characters in three lines; longer titles go to 52px.
  const titleSize = title.length > 75 ? 52 : 64
  const tree = el(
    {
      position: "relative",
      width: WIDTH,
      height: HEIGHT,
      background: "#000",
      color: FG,
      fontFamily: "Geist Mono",
    },
    [
      ...lines,
      ...marks,
      el(
        {
          position: "absolute",
          left: 120,
          right: 120,
          top: 112,
          justifyContent: "space-between",
          fontSize: 22,
          letterSpacing: "0.02em",
          color: MUTED,
        },
        [el({}, kicker), el({}, aside)]
      ),
      el(
        {
          position: "absolute",
          left: 118,
          top: 196,
          width: 940,
          fontSize: titleSize,
          fontWeight: 600,
          letterSpacing: "-0.05em",
          lineHeight: 1.04,
        },
        title
      ),
      el(
        {
          position: "absolute",
          left: 120,
          right: 120,
          bottom: 116,
          justifyContent: "space-between",
          alignItems: "baseline",
        },
        [
          el({ fontSize: 32, fontWeight: 600, letterSpacing: "-0.04em" }, "Aníbal"),
          el({ fontSize: 22, color: MUTED }, new URL(SITE_URL).host),
        ]
      ),
    ]
  )

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Geist Mono", data: await fontFile(400), weight: 400, style: "normal" },
      { name: "Geist Mono", data: await fontFile(600), weight: 600, style: "normal" },
    ],
  })
  return new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render().asPng()
}
