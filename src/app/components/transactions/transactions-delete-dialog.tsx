import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { TransactionItem } from "./transaction-item";
import { deleteTransaction } from "@/db/actions";

interface Transaction {
    id: string;
    transactionType: string;
    amount: number;
    categoryId: string;
    categoryName: string;
}

interface DeleteTransactionDialogProps {
    transaction: Transaction;
    removeTransaction: (id: string) => void;
}

export function DeleteTransactionDialog({transaction, removeTransaction}: DeleteTransactionDialogProps) {

    const handleDeleteTransaction = async (id: string) => {
        await deleteTransaction(id);
        removeTransaction(id);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Trash2 size={16} color="#fb2c36" strokeWidth={2} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Verwijder transactie</DialogTitle>
                    <DialogDescription>
                        Bevestig dat u volgende transactie wilt verwijderen.
                    </DialogDescription>
                </DialogHeader>
                <TransactionItem transaction={transaction} fromDialog={true} removeTransaction={removeTransaction} />
                <DialogFooter>
                    <Button type="submit" variant={'destructive'} onClick={() => handleDeleteTransaction(transaction.id)}>Bevestig</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}