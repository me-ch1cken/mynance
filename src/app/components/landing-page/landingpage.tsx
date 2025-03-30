'use client';

import { useState } from "react";
import { Timeline } from "../timeline/timeline";
import { Transactions } from "../transactions/transactions";

interface TrackedMonth {
    id: string;
    year: number;
    month: string;
    completed: boolean;
}

interface LandingPageProps {
    months: string[];
    trackedMonths: TrackedMonth[];
}

export function LandingPageComponent({months, trackedMonths}: LandingPageProps) {
    const date = new Date();
    const [selectedMonth, setSelectedMonth] = useState(months[date.getMonth()]);

    return (
        <div className="flex">
            <div className="w-1/5 p-4">
                <Timeline months={months} trackedMonths={trackedMonths} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            </div>
            <div className="w-4/5 p-4">
                <Transactions selectedMonth={selectedMonth} />
            </div>
        </div>
    );
}