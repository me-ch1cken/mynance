'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { useEffect, useState } from "react";

interface Transaction {
    id: string;
    transactionType: string;
    amount: number;
    categoryId: string;
    categoryName: string;
}

interface BarChartProps {
    transactions: Transaction[];
}

interface ChartData {
    category: string;
    amount: number;
    fill: string;
}

export function BarChartComponent({ transactions }: BarChartProps) {

    const [chartConfig, setChartConfig] = useState({amount: {label: "Bedrag", color: "#333333"}});
    const [chartData, setChartData] = useState<ChartData[]>([]);

    const negativeTransactions = transactions.filter(tx => tx.transactionType === 'NEGATIVE');
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#E6E6FA", "#20B2AA", "#FF6347", "#4682B4", "#32CD32", "#FFD700"];

    useEffect(() => {
        // Groepeer transacties op categorie en bereken totaalbedrag
        const groupedData = negativeTransactions.reduce((acc, tx, index) => {
            const existing = acc.find(item => item.category === tx.categoryName);
            if (existing) {
                existing.amount += tx.amount;
            } else {
                acc.push({ category: tx.categoryName, amount: tx.amount, fill: colors[index] });
            }
            return acc;
        }, [] as ChartData[]);

        setChartData(groupedData);
    }, [transactions]);

    return (
        <ChartContainer config={chartConfig} className="mx-auto aspect-square min-h-[300px] max-h-[300px]">
            <BarChart
                width={300}
                height={300}
                accessibilityLayer
                data={chartData}
                margin={{ top: 20 }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="amount" fill="var(--color-desktop)" radius={8}>
                    <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                </Bar>
            </BarChart>
        </ChartContainer>
    );
}
