'use client';

import { useEffect, useState } from "react";
import { getCategories, getTransactionsForSelectedMonthAndYear } from "@/db/actions";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import { TransactionsList } from "./transactions-list";

interface TransactionsProps {
    selectedMonth: string;
}

interface Transaction {
    id: string;
    transactionType: string;
    amount: number;
    categoryId: string;
    categoryName: string;
}

interface Category {
    id: string;
    name: string;
}

export function Transactions({ selectedMonth }: TransactionsProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
    const [selectedTransactionType, setSelectedTransactionType] = useState<string>("ALL");
    const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
    const date = new Date();

    useEffect(() => {
        async function fetchData() {
            const transactions: Transaction[] = await getTransactionsForSelectedMonthAndYear(selectedMonth, date.getFullYear());
            setTransactions(transactions);
            setSelectedCategory('ALL');
            setSelectedTransactionType('ALL');
            setFilteredTransactions(transactions);
        }

        fetchData();
    }, [selectedMonth]);

    useEffect(() => {

        setFilteredTransactions(transactions.filter((tx) => (tx.transactionType === selectedTransactionType || selectedTransactionType === 'ALL') && (selectedCategory === 'ALL' || tx.categoryId === selectedCategory)));

    }, [selectedTransactionType, selectedCategory]);

    useEffect(() => {
        async function fetchData() {
            const categories: Category[] = await getCategories();
            setCategories(categories);
        }

        fetchData();
    }, [])

    return (
        <div>
            <h1 className={'font-bold text-lg'}>{selectedMonth} {date.getFullYear()}</h1>
            <ul className="mt-4 flex space-x-4">
                <li>
                    <Select value={selectedTransactionType} onValueChange={setSelectedTransactionType}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Inkomst" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='ALL'>Alle</SelectItem>
                            <SelectItem value="POSITIVE">Inkomsten</SelectItem>
                            <SelectItem value="NEGATIVE">Uitgaven</SelectItem>
                        </SelectContent>
                    </Select>
                </li>
                <li>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Kies een categorie" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='ALL'>Alle</SelectItem>
                            {categories.map(category => <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </li>
            </ul>
            <TransactionsList transactions={filteredTransactions}/>
        </div>
    );
}
