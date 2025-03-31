'use client';
import { useEffect, useState } from "react";
import { TimelineItem } from "./timeline-item";
import { getTotalExpensesForSelectedYear } from "@/db/actions";

interface TrackedMonth {
    id: string;
    year: number;
    month: string;
    completed: boolean;
}

interface Transaction {
    id: string;
    transactionType: string;
    amount: number;
    categoryId: string;
    categoryName: string;
}

interface TimelineProps {
    months: string[];
    trackedMonths: TrackedMonth[];
    selectedMonth: string;
    transactions: Transaction[];
    setSelectedMonth: (month: string) => void;
}

export function Timeline({months, trackedMonths, selectedMonth, transactions, setSelectedMonth}: TimelineProps) {

    const [yearTotal, setYearTotal] = useState<number>(0);
    const date = new Date();

    useEffect(() => {
        async function getYearTotalData() {
            const total: number = await getTotalExpensesForSelectedYear(date.getFullYear());
            setYearTotal(total);
        }
        getYearTotalData();
    }, [transactions])

    return (
        <>
            <h3 className='mx-8 font-bold text-lg'>{date.getFullYear()}</h3>
            <p className='mx-8 text-sm'><strong>Jaartotaal: </strong>{yearTotal}</p>
            <ul className="timeline timeline-compact timeline-vertical mx-8 mt-2">
                {
                    months.slice(0, date.getMonth() + 1).map((month, index) => {
                        const monthFromDB = trackedMonths.find(t => t.month === month);
                        const isPreviousCompleted = trackedMonths.find(t => t.month === months[index - 1 < 0 ? 0 : index - 1])?.completed!;
                        const isNextFinal = index + 1 === date.getMonth();

                        return <TimelineItem key={month} month={month} completed={monthFromDB?.completed!} isSelected={month == selectedMonth} setSelectedMonth={setSelectedMonth} isPreviousCompleted={isPreviousCompleted} isNextFinal={isNextFinal} finalMonth={months[date.getMonth()]} />
                    })
                }
            </ul>
        </>
    )
}