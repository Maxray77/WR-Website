/* Run via tsx; emits BLOG_POSTS as JSON to stdout. */
import { BLOG_POSTS } from "../src/lib/blog-data";
process.stdout.write(JSON.stringify(BLOG_POSTS, null, 2));
