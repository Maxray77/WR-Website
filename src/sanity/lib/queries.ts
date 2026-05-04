import { groq } from "next-sanity";

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  date,
  readTime,
  pdfUrl,
  annualReportYear,
  image{ ..., asset->{ _id, url, metadata } },
  "author": author->{ name, role, image },
  "category": category->{ title, "slug": slug.current }
`;

export const POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
    | order(date desc)
    { ${POST_FIELDS} }
`;

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0]
    {
      ${POST_FIELDS},
      body
    }
`;

export const POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
    { "slug": slug.current }
`;

export const RECENT_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
    | order(date desc)[0...$limit]
    { ${POST_FIELDS} }
`;
