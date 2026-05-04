import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Metadata" },
    { name: "advanced", title: "Advanced" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      description:
        "Auto-generated from title. The URL will be /blog/{slug}.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      group: "content",
      rows: 3,
      description:
        "Short summary shown on the blog listing page and in social previews.",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "image",
      title: "Featured image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Important for accessibility and SEO.",
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "content",
      description:
        "The main article content. Use the toolbar to add headings, lists, links, and images.",
    }),

    // ── Metadata ─────────────────────────────────────────────────────────────
    defineField({
      name: "date",
      title: "Publish date",
      type: "datetime",
      group: "meta",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "author",
      type: "reference",
      group: "meta",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      group: "meta",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read time",
      type: "string",
      group: "meta",
      description: "e.g. '3 min', '5 min', or 'PDF' for report-only posts.",
      initialValue: "3 min",
    }),

    // ── Advanced ─────────────────────────────────────────────────────────────
    defineField({
      name: "pdfUrl",
      title: "PDF URL (optional)",
      type: "url",
      group: "advanced",
      description:
        "Link to a downloadable PDF (e.g. annual report). Shows a download banner on the post page.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"], allowRelative: true }),
    }),
    defineField({
      name: "annualReportYear",
      title: "Annual report year (optional)",
      type: "number",
      group: "advanced",
      description:
        "If set, the post is rendered with the annual report card UI instead of a plain hero image. Use only for annual report posts.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      date: "date",
      media: "image",
    },
    prepare({ title, author, date, media }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "Unscheduled";
      return {
        title,
        subtitle: `${author ?? "No author"} · ${formattedDate}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Publish date (newest first)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Title A→Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
