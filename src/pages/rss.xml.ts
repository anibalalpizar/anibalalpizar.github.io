import type { APIRoute } from "astro"
import { blogFeed } from "../utils/rss"

export const GET: APIRoute = () => blogFeed("en")
