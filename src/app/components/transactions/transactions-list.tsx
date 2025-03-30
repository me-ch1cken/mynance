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
        <div className="mt-4">
            <h3><strong>Totaal: </strong> &euro; <span className={`${total > 0 ? 'text-green-500' : 'text-red-500'}`}>{total.toFixed(2)}</span></h3>
            <ul className='mt-4'>
                {transactions.map((tx) => JSON.stringify(tx))}
            </ul>
        </div>
    );
}