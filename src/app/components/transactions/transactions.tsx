'use client';

import { useEffect, useState } from "react";
import { getCategories, getTransactionsForSelectedMonthAndYear } from "@/app/db/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { TransactionsList } from "./transactions-list";
import { AddTransactionDialog } from "./transactions-add-dialog";
import { ShowOverviewDialog } from "../overview/show-overview-dialog";

interface TransactionsProps {
    selectedMonth: string;
    selectedYear: number;
    months: string[];
    transactions: Transaction[];
    setTransactions: (transactions: Transaction[]) => void;
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

export function Transactions({ selectedMonth, selectedYear, months, transactions, setTransactions }: TransactionsProps) {
    
    const [categories, setCategories] = useState<Category[]>([]);

    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
    const [selectedTransactionType, setSelectedTransactionType] = useState<string>("ALL");
    const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

    const date = new Date();
    const total = transactions.reduce((sum, tx) => tx.transactionType === 'POSITIVE' ? sum + tx.amount : sum - tx.amount, 0);

    const addTransaction = (transaction: Transaction) => {

        const sortedTransactions = [...transactions, transaction].sort((a, b) => {
            if (a.transactionType !== b.transactionType) {
                return a.transactionType < b.transactionType ? 1 : -1;
            }
            return b.amount - a.amount;
        });
        setTransactions(sortedTransactions);

    }

    const removeTransaction = (id: string) => {
        const transactionAfterDelete = transactions.filter(tx => tx.id !== id);
        setTransactions([...transactionAfterDelete]);
    }

    const addCategory = (category: Category) => {
        setCategories([...categories, category]);
    }

    useEffect(() => {
        async function fetchData() {
            const transactions: Transaction[] = await getTransactionsForSelectedMonthAndYear(selectedMonth, selectedYear);
            setTransactions(transactions);
            setSelectedCategory('ALL');
            setSelectedTransactionType('ALL');
            setFilteredTransactions(transactions);
        }

        fetchData();
    }, [selectedMonth]);

    useEffect(() => {

        setFilteredTransactions(transactions.filter((tx) => (tx.transactionType === selectedTransactionType || selectedTransactionType === 'ALL') && (selectedCategory === 'ALL' || tx.categoryId === selectedCategory)));

    }, [transactions, selectedTransactionType, selectedCategory]);

    useEffect(() => {
        async function fetchData() {
            const categories: Category[] = await getCategories();
            setCategories(categories);
        }

        fetchData();
    }, [])

    return (
        <div>
            <h1 className={'font-bold text-lg'}>{selectedMonth} {selectedYear} (<span className={`${total > 0 ? 'text-green-500' : 'text-red-500'} font-normal`}>&euro; {Math.abs(total).toFixed(2)}</span>)</h1>
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
                <li>
                    { date.getMonth() === months.indexOf(selectedMonth) && date.getFullYear() === selectedYear ? <AddTransactionDialog categories={categories} selectedMonth={selectedMonth} selectedYear={selectedYear} addTransactionToList={addTransaction} addCategoryToList={addCategory} /> : null }
                </li>
                <li className="ml-auto me-16">
                    <ShowOverviewDialog transactions={filteredTransactions} selectedMonth={selectedMonth} />
                </li>
            </ul>
            <TransactionsList transactions={filteredTransactions} removeTransaction={removeTransaction}/>
        </div>
    );
}
