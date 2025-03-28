'use client';

import { useEffect, useState } from "react";
import { getTransactionsForSelectedMonthAndYear } from "@/db/actions";

interface TransactionsListProps {
    selectedMonth: string;
}

interface Transaction {
    id: string;
    transactionType: string;
    amount: string;
}

export function TransactionsList({ selectedMonth }: TransactionsListProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const date = new Date();

    useEffect(() => {
        async function fetchTransactions() {
            const data: Transaction[] = await getTransactionsForSelectedMonthAndYear(selectedMonth, date.getFullYear());
            setTransactions(data);
        }

        fetchTransactions();
    }, [selectedMonth]);

    return (
        <div>
            <h2>{selectedMonth} {date.getFullYear()}</h2>
            <ul>
                {transactions.map((tx, index) => (
                    <li key={index}>{JSON.stringify(tx)}</li>
                ))}
            </ul>
        </div>
    );
}
