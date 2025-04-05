import { decimal, integer, pgTable, uuid, varchar, boolean, text, timestamp } from "drizzle-orm/pg-core";

export const trackedMonthsTable = pgTable('tracked_months', {
    id: uuid('id').primaryKey().defaultRandom(),
    year: integer('year').notNull(),
    month: varchar('month', { length: 9 }).notNull(),
    completed: boolean('is_completed').notNull().default(false),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const transactionsTable = pgTable('transactions', {
    id: uuid('id').primaryKey().defaultRandom(),
    trackedMonthId: uuid('tracked_month_id').notNull().references(() => trackedMonthsTable.id),
    transactionType: varchar('transaction_type', { length: 8 }).notNull(),
    category: uuid('category_id').notNull().references(() => categoriesTable.id),
    amount: decimal('amount', { scale: 2 }).notNull(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const categoriesTable = pgTable('categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar().notNull(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

// Better auth schema
export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').notNull(),
    image: text('image'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at')
});

export const schema = { user, session, account, verification };