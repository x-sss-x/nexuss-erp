import { sql } from "drizzle-orm";
import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

import { team } from "./auth-schema";

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

export const currentSemesterTypeEnum = pgEnum("current_semester_type_enum", [
  "odd",
  "even",
]);

export const teamInfo = pgTable("team_info", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  teamId: t
    .text()
    .references(() => team.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  icon: t.varchar({ length: 256 }).default("IconCircleFilled"),
  currentSemesterType: currentSemesterTypeEnum().notNull(),
  numberOfsemesters: t.integer().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const CreateTeamInfoSchema = createInsertSchema(teamInfo, {
  icon: z.string().min(1),
}).omit({
  id: true,
  teamId: true,
  createdAt: true,
  updatedAt: true,
});

export const subject = pgTable("subject", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  name: t.text().notNull(),
  color: t.text().notNull(),
  semester: t.integer().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const CreateSubjectSchema = createInsertSchema(subject, {
  color: z.string().min(1),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
