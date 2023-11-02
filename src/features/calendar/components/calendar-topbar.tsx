import { getMonthNameInPolish } from "../utils/date-utils";

type Props = {
    pickedDay: number,
    pickedMonth: number,
    pickedYear: number,
}

const CalendarTopbar:React.FC<Props> = ({pickedDay, pickedMonth, pickedYear}) => {
    return (
    <div>
        <p>
            <span>{pickedDay} </span>
            <span>{getMonthNameInPolish(pickedMonth).slice(0, 3)} </span>
            <span>{pickedYear}</span>
        </p>
    </div>)
}

export default CalendarTopbar;