import { TimelineItem } from "./timeline-item";

export function Timeline() {

    const months: string[] = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
    const date = new Date();

    return (
        <>
            <h3 className='mx-8 font-bold text-lg'>{date.getFullYear()}</h3>
            <ul className="timeline timeline-compact timeline-vertical mx-8">
                {
                    months.slice(0, date.getMonth() + 1).map((month) => {
                        return <TimelineItem key={month} month={month} finalMonth={months[date.getMonth()]} />
                    })
                }
            </ul>
        </>
    )
}