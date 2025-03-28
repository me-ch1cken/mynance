'use client';

interface TransactionsListProps {
    selectedMonth: string;
}

export function TransactionsList({selectedMonth}: TransactionsListProps) {

    return (
        <div>{selectedMonth}</div>
    )

}