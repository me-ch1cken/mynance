'use client';

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogClose } from "../ui/dialog";
import { PieChartComponent } from "../charts/pie-chart";
import { useEffect, useState } from "react";
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
            <DialogContent className="w-[700px]">
                <DialogHeader>
                    <DialogTitle>Overzicht voor {selectedMonth}</DialogTitle>
                    <DialogDescription>
                        Krijg een duidelijker beeld van je uitgaven.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-wrap justify-center gap-4">
                    <PieChartComponent transactions={transactions} />
                    <BarChartComponent transactions={transactions} />
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="submit" variant={'ghost'}>Sluit venster</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}