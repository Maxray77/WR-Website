import type { StructureResolver } from "sanity/structure";
import { DocumentTextIcon, UserIcon, TagIcon } from "@sanity/icons";

/**
 * Sidebar layout for Sanity Studio.
 * Lists posts by date, then authors, then categories.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Wildlife Rescue")
    .items([
      S.listItem()
        .title("Blog Posts")
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList("post")
            .title("Blog Posts")
            .defaultOrdering([{ field: "date", direction: "desc" }])
        ),
      S.divider(),
      S.listItem()
        .title("Authors")
        .icon(UserIcon)
        .child(S.documentTypeList("author").title("Authors")),
      S.listItem()
        .title("Categories")
        .icon(TagIcon)
        .child(S.documentTypeList("category").title("Categories")),
    ]);
