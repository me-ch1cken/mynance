'use client';

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogClose } from "../ui/dialog";
import { PieChartComponent } from "../charts/pie-chart";
import { BarChartComponent } from "../charts/bar-chart";

interface Transaction {
    id: string;
    transactionType: string;
    amount: number;
    categoryId: string;
    categoryName: string;
}

interface OverviewDialogProps {
    transactions: Transaction[];
    selectedMonth: string;
}

export function ShowOverviewDialog({ transactions, selectedMonth }: OverviewDialogProps) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><Search />Toon overzicht</Button>
            </DialogTrigger>
            <DialogContent className="w-[680px]">
                <DialogHeader>
                    <DialogTitle>Overzicht voor {selectedMonth}</DialogTitle>
                    <DialogDescription>
                        Krijg een duidelijker beeld van je uitgaven.
                    </DialogDescription>
                </DialogHeader>
                {charts(transactions)}
                <DialogFooter>
                    <DialogClose asChild><Button type="submit" variant={'ghost'}>Sluit venster</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function charts(transactions: Transaction[]) {

    const negativeTransactions = transactions.filter(tx => tx.transactionType === 'NEGATIVE');

    if(!transactions || transactions.length === 0) {
        return (
            <div className="flex justify-center items-center h-full mt-4">
                <p className="text-sm text-muted-foreground">Je hebt nog geen transacties toegevoegd voor deze maand.</p>
            </div>
        );
    }
    
    if(!negativeTransactions || negativeTransactions.length === 0) {
        return (
            <div className="flex justify-center items-center h-full mt-4">
                <p className="text-sm text-muted-foreground">Je hebt nog geen uitgaven toegevoegd voor deze maand.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap justify-center gap-4">
            <PieChartComponent transactions={transactions} />
            <BarChartComponent transactions={transactions} />
        </div>
    );
}