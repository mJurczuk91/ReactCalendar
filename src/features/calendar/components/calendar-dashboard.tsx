import CalendarTopbar from "./calendar-topbar";
import CalendarHourlist from "./calendar-hourlist";
import { createIntervalTimestamps } from "../utils/date-utils";
import CalendarTodosManager from "./calendar-todos-manager";
import { useAppSelector } from "../../../store/redux-hooks";
import { selectPickedDate } from "../../datepicker/store/datepicker.slice";

import classes from "./calendar-dashboard.module.scss";

export const calendarStepInMinutes = 15;

const CalendarDashboard: React.FC = () => {
    const { day, month, year } = useAppSelector(selectPickedDate);
    const intervalTimestamps = createIntervalTimestamps(new Date(year, month, day));
    
    return <div className={classes.container}>
        <CalendarTopbar
            pickedDay={day}
            pickedMonth={month}
            pickedYear={year} />
        <div className={classes.notesarea}>
            <CalendarHourlist intervalTimestamps={intervalTimestamps} />
            <CalendarTodosManager
                intervalTimestamps={intervalTimestamps} />
        </div>
    </div>
}

export default CalendarDashboard;