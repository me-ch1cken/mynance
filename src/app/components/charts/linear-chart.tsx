"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/app/components/ui/chart"
import { useEffect, useState } from "react";
import { getIncomeAndExpensesPerMonth, getTotalSavingsUntillThisYear } from "@/app/db/actions";

interface LinearChartProps {
    transactions: Transaction[];
    selectedYear: number;
}

interface Transaction {
    id: string;
    transactionType: string;
    amount: number;
    categoryId: string;
    categoryName: string;
}

interface ChartData {
    month: string;
    positive: number;
    negative: number;
    totalSavings: number;
}

export function LinearChartComponent({ transactions, selectedYear }: LinearChartProps) {

    const [chartData, setChartData] = useState<ChartData[]>([]);

    const chartConfig = {
        positive: {
            label: "Inkomsten",
            color: "#32CD32",
        },
        negative: {
            label: "Uitgaven",
            color: "#FF0000",
        },
        totalSavings: {
            label: "Gespaard",
            color: "#FFFF00",
        }
    } satisfies ChartConfig

    useEffect(() => {
        async function getChartData() {
            const chartData = await getIncomeAndExpensesPerMonth(selectedYear);
            const initialSavings = await getTotalSavingsUntillThisYear(selectedYear);
    
            let runningTotal = +initialSavings; // Start vanaf eerder gespaard bedrag
    
            const updatedChartData = chartData.map(item => {
                // Positieve en negatieve bedragen als nummers
                const income = +item.positive;
                const expense = +item.negative;
    
                // Update de lopende totalSavings
                runningTotal += income - expense;
    
                return {
                    ...item,
                    totalSavings: Number(runningTotal.toFixed(2)), // cumulatief bedrag
                };
            });
    
            console.log(updatedChartData);
            setChartData(updatedChartData);
        }
    
        getChartData();
    }, [transactions]);

    return (
        <ChartContainer config={chartConfig}>
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    padding={{ left: 20, right: 20 }} 
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                    dataKey="positive"
                    type="monotone"
                    stroke="var(--color-positive)"
                    strokeWidth={2}
                    dot={true}
                    isAnimationActive={false}
                />
                <Line
                    dataKey="negative"
                    type="monotone"
                    stroke="var(--color-negative)"
                    strokeWidth={2}
                    dot={true}
                    isAnimationActive={false}
                />
                <Line
                    dataKey="totalSavings"
                    type="monotone"
                    stroke="var(--color-totalSavings)"
                    strokeWidth={2}
                    dot={true}
                    isAnimationActive={false}
                />
            </LineChart>
        </ChartContainer>
    )
}
