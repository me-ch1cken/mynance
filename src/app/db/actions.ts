'use server';

import { db } from './index';
import { eq, and, desc, sql } from 'drizzle-orm';
import { categoriesTable, trackedMonthsTable, transactionsTable } from "./schema";

export async function getMonthsForSelectedYear(year: number) {
    const months = await db.select().from(trackedMonthsTable).where(eq(trackedMonthsTable.year, year)).execute();
    return months ?? null;
}

export async function getAvailableYears() {
    const years = (await db.selectDistinct({year: trackedMonthsTable.year}).from(trackedMonthsTable).execute()).map(y => y.year);
    return years ?? null;
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

export async function deleteTransaction(id: string) {
    await db.delete(transactionsTable).where(eq(transactionsTable.id, id));
}

export async function getCategories() {
    return await db.select().from(categoriesTable);
}

export async function createCategory(name: string) {
    const [category] = await db.insert(categoriesTable).values({name: name}).returning({id: categoriesTable.id, name: categoriesTable.name});
    return category;
}

export async function getIncomeAndExpensesPerMonth(year: number) {

    const monthOrder = sql`
        CASE 
            WHEN ${trackedMonthsTable.month} = 'Januari' THEN 1
            WHEN ${trackedMonthsTable.month} = 'Februari' THEN 2
            WHEN ${trackedMonthsTable.month} = 'Maart' THEN 3
            WHEN ${trackedMonthsTable.month} = 'April' THEN 4
            WHEN ${trackedMonthsTable.month} = 'Mei' THEN 5
            WHEN ${trackedMonthsTable.month} = 'Juni' THEN 6
            WHEN ${trackedMonthsTable.month} = 'Juli' THEN 7
            WHEN ${trackedMonthsTable.month} = 'Augustus' THEN 8
            WHEN ${trackedMonthsTable.month} = 'September' THEN 9
            WHEN ${trackedMonthsTable.month} = 'Oktober' THEN 10
            WHEN ${trackedMonthsTable.month} = 'November' THEN 11
            WHEN ${trackedMonthsTable.month} = 'December' THEN 12
            ELSE 0
        END
    `;

    const results = await db
        .select({
            month: trackedMonthsTable.month,
            positive: sql<number>`COALESCE(SUM(CASE WHEN ${transactionsTable.transactionType} = 'POSITIVE' THEN ${transactionsTable.amount} ELSE 0 END), 0)`.as('positive'),
            negative: sql<number>`COALESCE(SUM(CASE WHEN ${transactionsTable.transactionType} = 'NEGATIVE' THEN ${transactionsTable.amount} ELSE 0 END), 0)`.as('negative'),
        })
        .from(trackedMonthsTable)
        .leftJoin(transactionsTable, eq(transactionsTable.trackedMonthId, trackedMonthsTable.id))
        .where(eq(trackedMonthsTable.year, year))
        .groupBy(trackedMonthsTable.year, trackedMonthsTable.month)
        .orderBy(trackedMonthsTable.year, monthOrder);

    return results;
}

export async function getTotalSavingsUntillThisYear(year: number) {
    const total = await db
        .select({
            total: sql<number>`
            COALESCE(SUM(CASE WHEN ${transactionsTable.transactionType} = 'POSITIVE' THEN ${transactionsTable.amount} ELSE 0 END), 0) -
            COALESCE(SUM(CASE WHEN ${transactionsTable.transactionType} = 'NEGATIVE' THEN ${transactionsTable.amount} ELSE 0 END), 0)
            `.as('total')
        })
        .from(transactionsTable)
        .leftJoin(trackedMonthsTable, eq(transactionsTable.trackedMonthId, trackedMonthsTable.id))
        .where(sql`${trackedMonthsTable.year} < ${year}`);

    return total[0].total;
}