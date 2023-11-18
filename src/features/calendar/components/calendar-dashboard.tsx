import CalendarTopbar from "./calendar-topbar";
import CalendarHourlist from "./calendar-hourlist";
import { createIntervalTimestamps } from "../utils/date-utils";
import CalendarTodosManager from "./calendar-todos-manager";
import { useAppSelector } from "../../../store/redux-hooks";
import { selectPickedDate } from "../../datepicker/store/datepicker.slice";

import classes from "./calendar-dashboard.module.scss";

export const calendarStepInMinutes = 15;

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
            <CalendarTodosManager
                intervalTimestamps={intervalTimestamps} />
        </div>
    </div>
}

export default CalendarDashboard;