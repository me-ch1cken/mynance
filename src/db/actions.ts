'use server';

import { db } from './index';
import { eq } from 'drizzle-orm';
import { trackedMonthsTable } from "./schema";

export async function getMonthsForSelectedYear(year: number) {
    const months = await db.select().from(trackedMonthsTable).where(eq(trackedMonthsTable.year, year)).execute();
    return months ?? null;
}

export async function createMonth(month: string, year: number) {
    const monthFromDB = await db.insert(trackedMonthsTable).values({
        year: year,
        month: month,
    });
    return monthFromDB;
}