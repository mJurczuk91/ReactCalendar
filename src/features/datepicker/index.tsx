import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { useState } from "react";
import DatepickerDashboard from "./components/datepicker-dashboard";
import DatepickerNavbar from "./components/datepicker-navbar";
import { IDateSlice, selectPickedDate, setDate } from "./store/datepicker.slice";

interface Props {
    setSelectedDate?: ({ day, month, year }: IDateSlice) => void,
    selectedDate?: IDateSlice,
}

const Datepicker: React.FC<Props> = ({ setSelectedDate, selectedDate }) => {
    const [viewMonth, setViewMonth] = useState<number>(new Date().getMonth());
    const [viewYear, setViewYear] = useState<number>(new Date().getFullYear());

    const dispatch = useAppDispatch();

    const setGlobalSelectedDate = setSelectedDate ? setSelectedDate : ({ day, month, year }: IDateSlice) => {
        dispatch(setDate({ day, month, year }));
    };

    const globalSelectedDate = useAppSelector(selectPickedDate);

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