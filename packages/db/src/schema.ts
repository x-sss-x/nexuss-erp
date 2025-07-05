import { sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

import { organization, user } from "./auth-schema";

export * from "./auth-schema";

export const Post = pgTable("post", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const CreatePostSchema = createInsertSchema(Post, {
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/** Branch schema */
export const branch = pgTable("branch", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  name: t.varchar({ length: 256 }).notNull(),
  userId: t
    .uuid()
    .notNull()
    .references(() => user.id),
  organizationId: t
    .uuid()
    .notNull()
    .references(() => organization.id),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const CreateBranchSchema = createInsertSchema(branch, {
  name: z
    .string({ error: "Name of the branch is required" })
    .min(1, "Name of the branch is required")
    .max(256),
}).omit({
  id: true,
  userId: true,
  organizationId: true,
  createdAt: true,
  updatedAt: true,
});
