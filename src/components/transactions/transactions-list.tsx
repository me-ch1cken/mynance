import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { TransactionItem } from "./transaction-item";

interface Transaction {
    id: string;
    transactionType: string;
    amount: number;
    categoryId: string;
    categoryName: string;
}

interface TransactionsListProps {
    transactions: Transaction[];
    removeTransaction: (id: string) => void;
}

export function TransactionsList({transactions, removeTransaction}: TransactionsListProps) {

    const total: number = transactions.reduce((sum, tx) => tx.transactionType === 'POSITIVE' ? sum + tx.amount : sum - tx.amount, 0);
    const positiveTransactions = transactions.filter(tx => tx.transactionType === 'POSITIVE');
    const negativeTransactions = transactions.filter(tx => tx.transactionType === 'NEGATIVE');


    if(!transactions || transactions.length === 0) {
        return (
            <div className="flex items-start justify-start mt-4">
                <p className="text-gray-500 text-lg">Geen transacties gevonden die aan uw filters voldoen.</p>
            </div>
        );
    }

    return (
        <div className="mt-4 me-80">
            <h3>
                <strong>Totaal: </strong>
                <span className={`${total > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    &euro; {total.toFixed(2)}
                </span>
            </h3>
            <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[300px]">
                    <h4 className="font-semibold mb-2">Inkomsten</h4>
                    {positiveTransactions.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {positiveTransactions.map((tx) => <TransactionItem key={tx.id} transaction={tx} fromDialog={false} removeTransaction={removeTransaction} />)}
                        </div>
                    ) : (
                        <p className="text-gray-500">Geen inkomsten gevonden die aan uw filters voldoen.</p>
                    )}
                </div>
                <div className="flex-1 min-w-[300px]">
                    <h4 className="font-semibold mb-2">Uitgaven</h4>
                    {negativeTransactions.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {negativeTransactions.map((tx) => <TransactionItem key={tx.id} transaction={tx} fromDialog={false} removeTransaction={removeTransaction} />)}
                        </div>
                    ) : (
                        <p className="text-gray-500">Geen uitgaven gevonden die aan uw filters voldoen.</p>
                    )}
                </div>
            </div>
        </div>
    );
}