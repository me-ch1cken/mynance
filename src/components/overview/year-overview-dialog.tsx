'use client';

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogClose } from "../ui/dialog";
import { LinearChartComponent } from "../charts/linear-chart";

interface Transaction {
    id: string;
    transactionType: string;
    amount: number;
    categoryId: string;
    categoryName: string;
}

interface OverviewDialogProps {
    transactions: Transaction[];
    selectedYear: number;
    user: User;
}

interface User {
    id: string;
    name: string;
}

export function YearOverviewDialog({ transactions, selectedYear, user }: OverviewDialogProps) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mx-8 mb-2" variant={'outline'}><Search />Toon jaaroverzicht</Button>
            </DialogTrigger>
            <DialogContent className="w-[680px]">
                <DialogHeader>
                    <DialogTitle>Overzicht voor {selectedYear}</DialogTitle>
                    <DialogDescription>
                        Krijg een duidelijker beeld van je uitgaven.
                    </DialogDescription>
                </DialogHeader>
                <LinearChartComponent transactions={transactions} selectedYear={selectedYear} user={user} />
                <DialogFooter>
                    <DialogClose asChild><Button type="submit" variant={'ghost'}>Sluit venster</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}