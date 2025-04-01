import { Badge } from "@/app/components/ui/badge";
import { DeleteTransactionDialog } from "./transactions-delete-dialog";

interface Transaction {
    id: string;
    transactionType: string;
    amount: number;
    categoryId: string;
    categoryName: string;
}

interface TransactionItemProps {
    transaction: Transaction;
    fromDialog: boolean;
    removeTransaction: (id: string) => void;
}

export function TransactionItem({transaction, fromDialog, removeTransaction}: TransactionItemProps) {
    return (
        <div key={transaction.id} className="flex items-center gap-2 border border-gray-300 p-2 rounded-lg">
            <Badge className={`text-white font-black ${transaction.transactionType === 'POSITIVE' ? 'bg-green-500' : 'bg-red-500'}`}>
                {transaction.categoryName}
            </Badge>
            <span className="flex items-center space-x-1">
                <span className="text-lg">&euro; {transaction.amount.toFixed(2)}</span>
                <span className="ml-2 flex items-center cursor-pointer">
                    {fromDialog ? null : <DeleteTransactionDialog transaction={transaction} removeTransaction={removeTransaction} />}
                </span>
            </span>
        </div>
    )
}