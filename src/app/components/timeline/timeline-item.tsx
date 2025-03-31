import { TimelineIcon } from "./timeline-icon";

interface ItemProps {
    month: string;
    finalMonth: string;
    completed: boolean;
    isSelected: boolean;
    isPreviousCompleted: boolean;
    isCurrentYear: boolean;
    setSelectedMonth: (month: string) => void;
};

export function TimelineItem({month, finalMonth, completed, isSelected, isPreviousCompleted, isCurrentYear, setSelectedMonth} : ItemProps) {

    return (
        <li>
            { month != 'Januari' ? !isPreviousCompleted ? <hr className='bg-red-500' /> : <hr className="bg-green-500" /> : null }
            <div className="timeline-middle">
                <TimelineIcon completed={completed} current={isCurrentYear ? month == finalMonth : false} />
            </div>
            <div className={`timeline-end timeline-box ms-4 text-left cursor-pointer hover:shadow-md min-w-24 ${isSelected ? 'shadow-md ms-6' : null}`} onClick={() => setSelectedMonth(month)}>{month}</div>
            { month != finalMonth ? !completed ? <hr className='bg-red-500' /> : <hr className='bg-green-500'/> : null }
        </li>
    );
}