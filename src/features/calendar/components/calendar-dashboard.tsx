import CalendarTopbar from "./calendar-topbar";
import CalendarHourlist from "./calendar-hourlist";
import { createIntervalTimestamps } from "../utils/calendar-utils";
import CalendarTimestampedNotesArea from "./calendar-timestamped-notes-area";
import { useAppSelector } from "../../../store/redux-hooks";
import { selectPickedDate } from "../../datepicker/store/datepicker.slice";

import classes from "./calendar-dashboard.module.scss";



const CalendarDashboard: React.FC = () => {
    const { pickedDay, pickedMonth, pickedYear } = useAppSelector(selectPickedDate);
    const intervalTimestamps = createIntervalTimestamps(new Date(pickedYear, pickedMonth, pickedDay));

    return <div className={classes.container}>
        <CalendarTopbar
            pickedDay={pickedDay}
            pickedMonth={pickedMonth}
            pickedYear={pickedYear} />
        <div className={classes.notesarea}>
            <CalendarHourlist intervalTimestamps={intervalTimestamps} />
            <CalendarTimestampedNotesArea
                intervalTimestamps={intervalTimestamps}
                pickedDate={new Date(pickedYear, pickedMonth, pickedDay)} />
        </div>
    </div>
}

export default CalendarDashboard;