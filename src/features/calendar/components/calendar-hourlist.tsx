import classes from "./calendar-hourlist.module.scss";
import { padWithZeros } from "../utils/date-utils";


const CalendarHourlist:React.FC<{children?: React.ReactNode, intervalTimestamps:Date[]}> = ({intervalTimestamps}) => {
    return <div className={classes.container}>
        {intervalTimestamps.map((timestamp) => {
            return <div key={timestamp.getTime()} className={classes.timestamp}>
               <p>{`${padWithZeros(timestamp.getHours())}:${padWithZeros(timestamp.getMinutes())}`}</p>
            </div>
        })}
    </div>
}

export default CalendarHourlist;