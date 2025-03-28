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
    selectedMonth: string;
    setSelectedMonth: (month: string) => void;
}

export function Timeline({months, trackedMonths, selectedMonth, setSelectedMonth}: TimelineProps) {

    const date = new Date();

    return (
        <>
            <h3 className='mx-8 font-bold text-lg'>{date.getFullYear()}</h3>
            <ul className="timeline timeline-compact timeline-vertical mx-8">
                {
                    months.slice(0, date.getMonth() + 1).map((month) => {
                        const monthFromDB = trackedMonths.find(t => t.month === month);
                        return <TimelineItem key={month} month={month} completed={monthFromDB?.completed!} isSelected={month == selectedMonth} setSelectedMonth={setSelectedMonth} finalMonth={months[date.getMonth()]} />
                    })
                }
            </ul>
        </>
    )
}