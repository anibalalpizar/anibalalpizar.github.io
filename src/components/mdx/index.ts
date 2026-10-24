// Components available inside the MDX files (cases and posts) without importing them.
import Detail from "./Detail.astro"
import Figure from "./Figure.astro"
import Section from "./Section.astro"
import Term from "./Term.astro"
import Terms from "./Terms.astro"
import Video from "./Video.astro"

export const mdxComponents = { Section, Figure, Detail, Terms, Term, Video }
