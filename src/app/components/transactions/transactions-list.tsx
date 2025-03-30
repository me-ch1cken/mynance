interface Transaction {
    id: string;
    transactionType: string;
    amount: number;
    categoryId: string;
    categoryName: string;
}

interface TransactionsListProps {
    transactions: Transaction[];
}

export function TransactionsList({transactions}: TransactionsListProps) {

    const total: number = transactions.reduce((sum, tx) => tx.transactionType === 'POSITIVE' ? sum + tx.amount : sum - tx.amount, 0);

    if(!transactions || transactions.length === 0) {
        return (
            <div className="flex items-start justify-start mt-4">
                <p className="text-gray-500 text-lg">Geen transacties gevonden die aan uw filters voldoen.</p>
            </div>
        );
    }

    return (
        <div className="mt-4 me-80">
            <h3><strong>Totaal: </strong><span className={`${total > 0 ? 'text-green-500' : 'text-red-500'}`}>&euro; {total.toFixed(2)}</span></h3>
            <ul className="mt-4 space-y-2">
                {transactions.map((tx, i) => (
                    <li key={tx.id} className={`flex justify-between items-center py-2 my-0 px-4 border-gray-200 ${i !== transactions.length - 1 ? 'border-b' : null}`}>
                        <span>&euro; <span className={`${tx.transactionType === 'POSITIVE' ? 'text-green-500' : 'text-red-500'}`}>{tx.amount.toFixed(2)}</span></span>
                        <span className="text-sm text-gray-600">{tx.categoryName}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}