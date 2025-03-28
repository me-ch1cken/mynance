import { TimelineIcon } from "./timeline-icon";

interface ItemProps {
    month: string;
    finalMonth: string;
};

export function TimelineItem({month, finalMonth} : ItemProps) {

    return (
        <li>
            { month != 'Januari' ? <hr /> : null }
            <div className="timeline-middle">
                <TimelineIcon completed={month === 'Januari'} current={month == finalMonth} />
            </div>
            <div className={`timeline-end timeline-box ms-4 cursor-pointer hover:shadow-md ${month == finalMonth ? 'shadow-md font-bold' : null}`}>{month}</div>
            { month != finalMonth ? <hr /> : null }
        </li>
    );
}