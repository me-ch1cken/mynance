'use client';
import { useEffect, useState } from "react";
import { TimelineItem } from "./timeline-item";
import { getAvailableYears, getTotalExpensesForSelectedYear } from "@/app/db/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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
    selectedYear: number;
    setSelectedYear: (year: number) => void;
    setSelectedMonth: (month: string) => void;
}

export function Timeline({months, trackedMonths, selectedMonth, transactions, selectedYear, setSelectedYear, setSelectedMonth}: TimelineProps) {

    const [yearTotal, setYearTotal] = useState<number>(0);
    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const date = new Date();

    useEffect(() => {
        async function getYearTotalData() {
            const total: number = await getTotalExpensesForSelectedYear(selectedYear);
            setYearTotal(total);
        }
        getYearTotalData();
    }, [transactions]);

    useEffect(() => {
        async function getAvailableYearsData() {
            const availableYears = await getAvailableYears();
            setAvailableYears(availableYears);
        }

        getAvailableYearsData();
    }, []);

    return (
        <>
            <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
                <SelectTrigger className="mx-8 font-bold text-lg">
                    <SelectValue placeholder="Inkomst" />
                </SelectTrigger>
                <SelectContent>
                    {
                        availableYears.map((year) => <SelectItem key={year} value={year.toString()}>{year}</SelectItem>)
                    }
                </SelectContent>
            </Select>
            <p className='mx-8 text-sm mt-2'><strong>Jaartotaal: </strong>{yearTotal}</p>
            <ul className="timeline timeline-compact timeline-vertical mx-8 mt-2">
                {
                    date.getFullYear() === selectedYear ? months.slice(0, date.getMonth() + 1).map((month, index) => {
                        const monthFromDB = trackedMonths.find(t => t.month === month);
                        const isPreviousCompleted = trackedMonths.find(t => t.month === months[index - 1 < 0 ? 0 : index - 1])?.completed!;
                        return <TimelineItem key={month} month={month} completed={monthFromDB?.completed!} isSelected={month == selectedMonth} setSelectedMonth={setSelectedMonth} isPreviousCompleted={isPreviousCompleted} finalMonth={months[date.getMonth()]} isCurrentYear={date.getFullYear() === selectedYear} />
                    }) : months.map((month, index) => {
                        const monthFromDB = trackedMonths.find(t => t.month === month);
                        const isPreviousCompleted = trackedMonths.find(t => t.month === months[index - 1 < 0 ? 0 : index - 1])?.completed!;
                        return <TimelineItem key={month} month={month} completed={monthFromDB?.completed!} isSelected={month === selectedMonth} setSelectedMonth={setSelectedMonth} isPreviousCompleted={isPreviousCompleted} finalMonth={months[11]} isCurrentYear={false} />
                    })
                }
            </ul>
        </>
    )
}