'use client';
import { useState } from "react";
import { TimelineItem } from "./timeline-item";

interface TrackedMonth {
    id: string;
    year: number;
    month: string;
    completed: boolean;
}

interface TimelineProps {
    months: string[];
    trackedMonths: TrackedMonth[];
}

export function Timeline({months, trackedMonths}: TimelineProps) {

    const date = new Date();
    const [selectedMonth, setSelectedMonth] = useState(months[date.getMonth()]);

    const handleSelectedMonthChange = (month: string) => {
        setSelectedMonth(month);
        localStorage.setItem('selectedMonth', month);
    }

    return (
        <>
            <h3 className='mx-8 font-bold text-lg'>{date.getFullYear()}</h3>
            <ul className="timeline timeline-compact timeline-vertical mx-8">
                {
                    months.slice(0, date.getMonth() + 1).map((month) => {
                        const monthFromDB = trackedMonths.find(t => t.month === month);
                        return <TimelineItem key={month} month={month} completed={monthFromDB?.completed!} isSelected={month == selectedMonth} setSelectedMonth={handleSelectedMonthChange} finalMonth={months[date.getMonth()]} />
                    })
                }
            </ul>
        </>
    )
}