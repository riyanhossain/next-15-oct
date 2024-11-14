import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  name: text().notNull(),
  email: text().notNull().unique(),
  phone: text().notNull().unique(),
  address: text().notNull(),
  password: text().notNull(),
  role: text("role", { enum: ["admin", "user"] })
    .notNull()
    .default("user"),
  created_at: text().default("CURRENT_TIMESTAMP"),
  updated_at: text().default("CURRENT_TIMESTAMP"),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export type User = z.infer<typeof selectUserSchema>;
