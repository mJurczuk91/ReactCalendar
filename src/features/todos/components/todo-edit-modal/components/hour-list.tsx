import { padWithZeros } from "../../../../calendar/utils/date-utils"
import { getTimeDiffInMinutes } from "../../../../calendar/utils/date-utils"

interface Props {
    hourList: Date[],
    setPickedHour: (date: Date) => void,
    startDate?: Date,
}

const HourList: React.FC<Props> = ({ hourList, setPickedHour, startDate }) => {
    return <>
        {hourList.map(date => <button 
            onClick={(e:React.SyntheticEvent) => {
                e.stopPropagation();
                e.preventDefault();
                setPickedHour(date)
            }}
        >
            {padWithZeros(date.getHours())} : {padWithZeros(date.getMinutes())}
            {startDate && `(duration: ${getTimeDiffInMinutes(startDate.getTime(), date.getTime())} min)`}
        </button>)
        }
    </>
}

export default HourList;