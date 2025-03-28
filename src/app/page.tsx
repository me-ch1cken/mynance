import { createMonth, getMonthsForSelectedYear } from "@/db/actions";
import { LandingPageComponent } from "./components/landing-page/landingpage";

export default async function LandingPage() {

    const months: string[] = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
    const date = new Date();

    const trackedMonths = await getMonthsForSelectedYear(date.getFullYear());
    if (trackedMonths.length === 0) {
        await createMonth(months[date.getMonth()], date.getFullYear());
    }

    return (
        <LandingPageComponent months={months} trackedMonths={trackedMonths} />
    );
}
