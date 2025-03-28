'use client';
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