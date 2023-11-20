import { sameDayMonthYear, sameMonth } from "../../calendar/utils/date-utils";
import classes from "./datepicker-dashboard.module.scss";
import { IDateSlice } from "../store/datepicker.slice";

interface Props {
    setSelectedDate: ({ day, month, year }: IDateSlice) => void,
    setViewMonth: React.Dispatch<React.SetStateAction<number>>,
    setViewYear: React.Dispatch<React.SetStateAction<number>>,
    selectedDate: IDateSlice,
    viewMonth: number,
    viewYear: number,
}

const DatepickerDashboard: React.FC<Props> = ({ setSelectedDate, selectedDate, viewMonth, viewYear, setViewMonth, setViewYear }) => {
    const today = new Date();

    const buildCalendar = () => {
        const calendar = [];
        const firstWeekStart = new Date(viewYear, viewMonth, 1);
        while (firstWeekStart.getDay() > 1) {
            firstWeekStart.setDate(firstWeekStart.getDate() - 1);
        }

        const dayClickHandler = (date: Date) => {
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            setSelectedDate({ day, month, year });
            if(month !== viewMonth) setViewMonth(month);
            if(year !== viewYear) setViewYear(year);
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
                                sameDayMonthYear(currentDay, new Date(selectedDate.year, selectedDate.month, selectedDate.day)) ? classes.pickedDay :
                                    sameMonth(currentDay, new Date(selectedDate.year, selectedDate.month, 10)) ? classes.currentMonth : ''
                        }
                        onClick={() => {
                            dayClickHandler(currentDay)
                        }}
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
            {buildCalendar()}
        </div>
    </>
}

export default DatepickerDashboard;