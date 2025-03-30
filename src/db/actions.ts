'use server';

import { db } from './index';
import { eq, and } from 'drizzle-orm';
import { categoriesTable, trackedMonthsTable, transactionsTable } from "./schema";

export async function getMonthsForSelectedYear(year: number) {
    const months = await db.select().from(trackedMonthsTable).where(eq(trackedMonthsTable.year, year)).execute();
    return months ?? null;
}

export async function createMonth(month: string, year: number) {
    const [monthFromDB] = await db.insert(trackedMonthsTable).values({
        year: year,
        month: month,
    }).returning({id: trackedMonthsTable.id});
    return monthFromDB?.id;
}

export async function getTransactionsForSelectedMonthAndYear(month: string, year: number) {
    const trackedMonthIDs = await db
        .select({ id: trackedMonthsTable.id })
        .from(trackedMonthsTable)
        .where(and(eq(trackedMonthsTable.month, month), eq(trackedMonthsTable.year, year)))
        .limit(1)
        .execute();

    const id = trackedMonthIDs.length > 0 ? trackedMonthIDs[0].id : (await createMonth(month, year));

    const transactions = (await db
        .select({
          id: transactionsTable.id,
          transactionType: transactionsTable.transactionType,
          amount: transactionsTable.amount,
          categoryId: transactionsTable.category,
          categoryName: categoriesTable.name,
        })
        .from(transactionsTable)
        .innerJoin(categoriesTable, eq(transactionsTable.category, categoriesTable.id))
        .where(eq(transactionsTable.trackedMonthId, id)))
        .map(tx => ({ ...tx, amount: Number(tx.amount) }));


    return transactions;
}

export async function getCategories() {
    return await db.select().from(categoriesTable);
}