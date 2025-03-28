import { TimelineIcon } from "./timeline-icon";

interface ItemProps {
    month: string;
    finalMonth: string;
    completed: boolean;
    isSelected: boolean;
    setSelectedMonth: (month: string) => void;
};

export function TimelineItem({month, finalMonth, completed, isSelected, setSelectedMonth} : ItemProps) {

    return (
        <li>
            { month != 'Januari' ? <hr /> : null }
            <div className="timeline-middle">
                <TimelineIcon completed={completed} current={month == finalMonth} />
            </div>
            <div className={`timeline-end timeline-box ms-4 text-left cursor-pointer hover:shadow-md min-w-24 ${isSelected ? 'shadow-md ms-6' : null}`} onClick={() => setSelectedMonth(month)}>{month}</div>
            { month != finalMonth ? <hr /> : null }
        </li>
    );
}