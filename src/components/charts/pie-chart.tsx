import { Pie, PieChart } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent } from "../ui/chart";
import { useEffect, useState } from "react";

interface Transaction {
    id: string;
    transactionType: string;
    amount: number;
    categoryId: string;
    categoryName: string;
}

interface PieChartProps {
    transactions: Transaction[];
}

interface ChartData {
    category: string;
    amount: number;
    fill: string;
}

export function PieChartComponent({ transactions }: PieChartProps) {

    const [chartConfig, setChartConfig] = useState({});
    const [chartData, setChartData] = useState<ChartData[]>([]);

    const negativeTransactions = transactions.filter(tx => tx.transactionType === 'NEGATIVE');
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#E6E6FA", "#20B2AA", "#FF6347", "#4682B4", "#32CD32", "#FFD700"];


    useEffect(() => {
        // Haal unieke categorieën op
        const uniqueCategories = [...new Set(negativeTransactions.map(tx => tx.categoryName))];

        // Maak chartConfig object
        const newChartConfig = uniqueCategories.reduce((acc, category, index) => {
            acc[category] = { label: category, color: colors[index] };
            return acc;
        }, {} as Record<string, { label: string; color: string }>);

        setChartConfig(newChartConfig);
    }, [transactions]);

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
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square min-h-[300px] max-h-[300px]"
        >
            <PieChart>
                <Pie data={chartData} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={100} />
                <ChartLegend
                    content={<ChartLegendContent nameKey="category" />}
                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
            </PieChart>
        </ChartContainer>
    );
}
