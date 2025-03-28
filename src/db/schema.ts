import { decimal, integer, pgTable, uuid, varchar, foreignKey, boolean } from "drizzle-orm/pg-core";

// tracked_months tabel
export const trackedMonthsTable = pgTable('tracked_months', {
    id: uuid('id').primaryKey().defaultRandom(),
    year: integer('year').notNull(),
    month: varchar('month', { length: 9 }).notNull(),
    completed: boolean('is_completed').notNull().default(false)
});

// transactions tabel met expliciete foreign key
export const transactionsTable = pgTable('transactions', {
    id: uuid('id').primaryKey().defaultRandom(),
    trackedMonthId: uuid('tracked_month_id').notNull().references(() => trackedMonthsTable.id), // Verwijzing naar tracked_months
    transactionType: varchar('transaction_type', { length: 8 }).notNull(),
    amount: decimal('amount', { scale: 2 })
});
