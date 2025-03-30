import { decimal, integer, pgTable, uuid, varchar, foreignKey, boolean } from "drizzle-orm/pg-core";

export const trackedMonthsTable = pgTable('tracked_months', {
    id: uuid('id').primaryKey().defaultRandom(),
    year: integer('year').notNull(),
    month: varchar('month', { length: 9 }).notNull(),
    completed: boolean('is_completed').notNull().default(false)
});

export const transactionsTable = pgTable('transactions', {
    id: uuid('id').primaryKey().defaultRandom(),
    trackedMonthId: uuid('tracked_month_id').notNull().references(() => trackedMonthsTable.id),
    transactionType: varchar('transaction_type', { length: 8 }).notNull(),
    category: uuid('category_id').notNull().references(() => categoriesTable.id),
    amount: decimal('amount', { scale: 2 }).notNull()
});

export const categoriesTable = pgTable('categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar().notNull()
});
