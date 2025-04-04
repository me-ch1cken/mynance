"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/app/components/ui/chart"
import { useEffect, useState } from "react";
import { getIncomeAndExpensesPerMonth } from "@/app/db/actions";

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
}

export function LinearChartComponent({ transactions, selectedYear }: LinearChartProps) {

    const [chartData, setChartData] = useState<ChartData[]>([]);

    const chartConfig = {
        positive: {
            label: "Gespaard",
            color: "#32CD32",
        },
        negative: {
            label: "Uitgaven",
            color: "#FF0000",
        },
    } satisfies ChartConfig

    useEffect(() => {
        async function getChartData() {
            const chartData = await getIncomeAndExpensesPerMonth(selectedYear);
            setChartData(chartData);
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
            </LineChart>
        </ChartContainer>
    )
}
