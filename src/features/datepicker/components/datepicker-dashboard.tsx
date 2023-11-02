import useSetDatepicker from "../hooks/useSetDatepicker";
import { sameDayMonthYear, sameMonth } from "../../calendar/utils/date-utils";
import classes from "./datepicker-dashboard.module.scss";
import { useAppSelector } from "../../../store/redux-hooks";
import { selectPickedDate } from "../store/datepicker.slice";

const DatepickerDashboard: React.FC = () => {
    const { setPickedDay } = useSetDatepicker();
    const dates = useAppSelector(selectPickedDate);
    const today = new Date();

    const buildWeeks = () => {
        const calendar = [];
        const firstWeekStart = new Date(dates.viewYear, dates.viewMonth, 1);
        while (firstWeekStart.getDay() > 1) {
            firstWeekStart.setDate(firstWeekStart.getDate() - 1);
        }

        const dayClickHandler = (date: Date) => {
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            return () => {
                setPickedDay({ day, month, year });
            }
        }

        const incrementingDay = new Date(firstWeekStart);
        for (let i = 0; i < 6; i++) {
            let week = [];
            let weekDay = 0;
            while (weekDay <= 6) {
                let currentDay = new Date(incrementingDay);
                week.push(
                    <div
                        key={incrementingDay.getTime()}
                        className={
                            sameDayMonthYear(currentDay, today) ? classes.today :
                            sameDayMonthYear(currentDay, new Date(dates.pickedYear, dates.pickedMonth, dates.pickedDay)) ? classes.pickedDay :
                            sameMonth(currentDay, new Date(dates.viewYear, dates.viewMonth, 10)) ? classes.currentMonth : ''
                    }
                        onClick={dayClickHandler(currentDay)}
                    >      
                    {incrementingDay.getDate()}           
                    </div>
                );
                weekDay++;
                incrementingDay.setDate(incrementingDay.getDate() + 1);
            }
            calendar.push(week);
        }
        return calendar;
    }

    return <>
        <div className={classes.container}>
            <div>Pn</div><div>Wt</div><div>Śr</div><div>Cz</div><div>Pt</div><div>Sb</div><div>Nd</div>
            {buildWeeks()}
        </div>
    </>
}

export default DatepickerDashboard;