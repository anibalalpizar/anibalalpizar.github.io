// Names for the page transitions (Layout.astro). An element on one page and an
// element on the next with the same name are animated from one place and size to
// the other, e.g. an Experience row growing into its case study.
//
// The names aren't fixed: a script in Layout.astro gives them out as a page is
// left or shown, only to elements on screen that go with the page on the other
// side. A fixed name would pair, say, a row far down the home page with a hero
// and fly it across the screen.

/** A case study: its Experience row, its hero and the Previous / Next links to it. */
export const caseTransition = (path: string) => `case${path.replace(/\//g, "-")}`

/** A post: its row in the blog list and on the home page, its hero and the Previous / Next links to it. */
export const postTransition = (slug: string) => `post-${slug}`

/** "Projects" on the home page and the /projects heading. */
export const PROJECTS_TITLE = "projects-title"

/**
 * Attributes for an element that takes part. `forPath` is the page it goes with
 * (for a link, its href). Without it the element stands for the page it's on,
 * like a hero, and goes with whichever page comes before or after.
 */
export const transitionAttrs = (name: string | undefined, forPath?: string) =>
  name ? { "data-transition": name, "data-transition-for": forPath } : {}
