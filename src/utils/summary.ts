/**
 * Short description for search results: the first sentence if it fits,
 * otherwise cut at a word boundary with "…". Google shows about 155 characters.
 */
export function summary(text: string, max = 155) {
  const firstSentence = text.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? text
  if (firstSentence.length <= max) return firstSentence
  const cut = firstSentence.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "")}…`
}
