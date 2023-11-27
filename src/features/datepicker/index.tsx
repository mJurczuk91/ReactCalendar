import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { useEffect, useState } from "react";
import DatepickerDashboard from "./components/datepicker-dashboard";
import DatepickerNavbar from "./components/datepicker-navbar";
import { IDateSlice, selectPickedDate, setDate } from "./store/datepicker.slice";

interface Props {
    setSelectedDate?: ({ day, month, year }: IDateSlice) => void,
    selectedDate?: IDateSlice,
}

const Datepicker: React.FC<Props> = ({ setSelectedDate, selectedDate }) => {
    const globalSelectedDate = useAppSelector(selectPickedDate);
    const [viewMonth, setViewMonth] = useState<number>( selectedDate ? selectedDate.month : globalSelectedDate.month);
    const [viewYear, setViewYear] = useState<number>( selectedDate ? selectedDate.year : globalSelectedDate.year);
    
    useEffect(() => {
        if(!selectedDate) {
            setViewMonth(globalSelectedDate.month);
            setViewYear(globalSelectedDate.year);
        }
    },[globalSelectedDate, selectedDate])

    const dispatch = useAppDispatch();

    const setGlobalSelectedDate = setSelectedDate ? setSelectedDate : ({ day, month, year }: IDateSlice) => {
        dispatch(setDate({ day, month, year }));
    };

    

    return <div>
        <DatepickerNavbar
            setViewMonth={setViewMonth}
            setViewYear={setViewYear}
            viewMonth={viewMonth}
            viewYear={viewYear}
        />
        <DatepickerDashboard
            setViewMonth={setViewMonth}
            setViewYear={setViewYear}
            setSelectedDate={setSelectedDate ? setSelectedDate : setGlobalSelectedDate}
            selectedDate={selectedDate ? selectedDate : globalSelectedDate}
            viewMonth={viewMonth}
            viewYear={viewYear}
        />
    </div>
}

export default Datepicker;