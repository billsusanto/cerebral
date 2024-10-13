// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const posts = pgTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const receipts = pgTable(
  "receipts",
  {
    id: serial("id")
      .primaryKey()
      .notNull(),
    buyer: varchar("buyer", { length: 256 }),
    productDescription: text("product_description"),
    phoneNumber: varchar("phone_number", { length: 15 }),
    additional_data: text("additional_data"),
    address: varchar("address", { length: 256 }),
    purchase_date: timestamp("purchase_date", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
    status: varchar("status", { length: 256 })
      .default('in progress'),
 
 
  },
  (example) => ({
    idIdx: index("receipt_buyer_idx").on(example.buyer),
  }),
 );
 
 