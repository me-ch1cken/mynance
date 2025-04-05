import { createMonth, getMonthsForSelectedYear } from "@/db/actions";
import { TransactionsPageComponent } from "@/components/transactions/transactions-page-component";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function TransactionsPage() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) redirect('/login');

    const months: string[] = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
    const date = new Date();

    const trackedMonths = await getMonthsForSelectedYear(date.getFullYear(), session.user.id);
    if (trackedMonths.length === 0) {
        await createMonth(months[date.getMonth()], date.getFullYear(), session.user.id);
    }

    return (
        <TransactionsPageComponent months={months} trackedMonths={trackedMonths} userId={session.user.id} />
    );
}
