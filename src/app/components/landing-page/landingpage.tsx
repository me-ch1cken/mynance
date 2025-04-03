'use client';

import { useEffect, useState } from "react";
import { Timeline } from "../timeline/timeline";
import { Transactions } from "../transactions/transactions";

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

interface LandingPageProps {
    months: string[];
    trackedMonths: TrackedMonth[];
}

export function TransactionsPageComponent({months, trackedMonths}: LandingPageProps) {
    const date = new Date();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedMonth, setSelectedMonth] = useState(months[date.getMonth()]);
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());

    useEffect(() => {
        setSelectedMonth(months[date.getMonth()]);
    }, [selectedYear])

    return (
        <div className="flex">
            <div className="w-1/5 p-4">
                <Timeline months={months} trackedMonths={trackedMonths} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} transactions={transactions} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            </div>
            <div className="w-4/5 p-4">
                <Transactions selectedMonth={selectedMonth} selectedYear={selectedYear} months={months} transactions={transactions} setTransactions={setTransactions}/>
            </div>
        </div>
    );
}