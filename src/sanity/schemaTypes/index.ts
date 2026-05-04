import type { SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContent";
import { authorType } from "./author";
import { categoryType } from "./category";
import { postType } from "./post";

export const schemaTypes: { types: SchemaTypeDefinition[] } = {
  types: [postType, authorType, categoryType, blockContentType],
};
