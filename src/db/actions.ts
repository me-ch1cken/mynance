'use server';

import { db } from './index';
import { eq, and, desc } from 'drizzle-orm';
import { categoriesTable, trackedMonthsTable, transactionsTable } from "./schema";

export async function getMonthsForSelectedYear(year: number) {
    const months = await db.select().from(trackedMonthsTable).where(eq(trackedMonthsTable.year, year)).execute();
    return months ?? null;
}

export async function getTotalExpensesForSelectedYear(year: number) {
    let total: number = 0;

    const [totalPositive, totalNegative] = await Promise.all([
        db
            .select({ amount: transactionsTable.amount })
            .from(trackedMonthsTable)
            .where(and(eq(trackedMonthsTable.year, year), eq(transactionsTable.transactionType, 'POSITIVE')))
            .innerJoin(transactionsTable, eq(transactionsTable.trackedMonthId, trackedMonthsTable.id))
            .execute()
            .then(res => res.map(tx => ({ ...tx, amount: Number(tx.amount) }))),
    
        db
            .select({ amount: transactionsTable.amount })
            .from(trackedMonthsTable)
            .where(and(eq(trackedMonthsTable.year, year), eq(transactionsTable.transactionType, 'NEGATIVE')))
            .innerJoin(transactionsTable, eq(transactionsTable.trackedMonthId, trackedMonthsTable.id))
            .execute()
            .then(res => res.map(tx => ({ ...tx, amount: Number(tx.amount) }))),
    ]);
    

    total = totalPositive.reduce((sum, tx) => sum + tx.amount, 0);
    total -= totalNegative.reduce((sum, tx) => sum += tx.amount, 0);

    return total;
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
        .where(eq(transactionsTable.trackedMonthId, id))
        .orderBy(desc(transactionsTable.transactionType))
    ).map(tx => ({ ...tx, amount: Number(tx.amount) }));

    const sortedTransactions = transactions.sort((a, b) => {
        if (a.transactionType !== b.transactionType) {
            return a.transactionType < b.transactionType ? 1 : -1;
        }
        return b.amount - a.amount;
    });
      
    return sortedTransactions;
}

export async function getTransactionById(transactionId: string) {
    const [transaction] = (await db
        .select({
            id: transactionsTable.id,
            transactionType: transactionsTable.transactionType,
            amount: transactionsTable.amount,
            categoryId: transactionsTable.category,
            categoryName: categoriesTable.name,
        })
        .from(transactionsTable)
        .innerJoin(categoriesTable, eq(transactionsTable.category, categoriesTable.id))
        .where(eq(transactionsTable.id, transactionId))
        .limit(1)
        .execute()).map(tx => ({ ...tx, amount: Number(tx.amount) }));

    return transaction;
}

export async function addTransaction(month: string, year: number, category: string, type: string, amount: number) {
    const trackedMonthIDs = await db
        .select({ id: trackedMonthsTable.id })
        .from(trackedMonthsTable)
        .where(and(eq(trackedMonthsTable.month, month), eq(trackedMonthsTable.year, year)))
        .limit(1)
        .execute();

    const id = trackedMonthIDs.length > 0 ? trackedMonthIDs[0].id : (await createMonth(month, year));

    const insertedTransactionId = await db.insert(transactionsTable).values({
        trackedMonthId: id,
        transactionType: type,
        category: category,
        amount: amount.toString(),
    }).returning({
        id: transactionsTable.id
    });

    return getTransactionById(insertedTransactionId[0].id);

}

export async function getCategories() {
    return await db.select().from(categoriesTable);
}