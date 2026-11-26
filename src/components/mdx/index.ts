// Components available inside the MDX files (cases and posts) without importing them.
// `pre` replaces the element Markdown makes for fenced code blocks, and `a` its links.
import CodeBlock from "./CodeBlock.astro"
import Detail from "./Detail.astro"
import Figure from "./Figure.astro"
import Link from "./Link.astro"
import Quote from "./Quote.astro"
import Section from "./Section.astro"
import Term from "./Term.astro"
import Terms from "./Terms.astro"
import Video from "./Video.astro"

export const mdxComponents = { Section, Figure, Detail, Terms, Term, Video, Quote, pre: CodeBlock, a: Link }
