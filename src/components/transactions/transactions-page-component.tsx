'use client';

import { useEffect, useState } from "react";
import { Timeline } from "../timeline/timeline";
import { Transactions } from "./transactions";
import { getUserById } from "@/db/actions";

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

interface User {
    id: string;
    name: string;
}

interface TransactionsPageProps {
    months: string[];
    trackedMonths: TrackedMonth[];
    userId: string;
}

export function TransactionsPageComponent({months, trackedMonths, userId}: TransactionsPageProps) {
    const date = new Date();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedMonth, setSelectedMonth] = useState(months[date.getMonth()]);
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setSelectedMonth(months[date.getMonth()]);
    }, [selectedYear]);

    useEffect(() => {
        async function getUser() {
            const user = await getUserById(userId);
            setUser(user);
        }
        getUser();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex">
            <div className="w-1/5 p-4">
                <Timeline months={months} trackedMonths={trackedMonths} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} transactions={transactions} selectedYear={selectedYear} setSelectedYear={setSelectedYear} user={user} />
            </div>
            <div className="w-4/5 p-4">
                <Transactions selectedMonth={selectedMonth} selectedYear={selectedYear} months={months} transactions={transactions} setTransactions={setTransactions} user={user}/>
            </div>
        </div>
    );
}