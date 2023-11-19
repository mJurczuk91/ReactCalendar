import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import DatepickerDashboard from "./components/datepicker-dashboard";
import DatepickerNavbar from "./components/datepicker-navbar";
import { IDateSlice, ISetDate, selectPickedDate, setDate } from "./store/datepicker.slice";

interface Props {
    setSelectedDate?: ({day, month, year}:ISetDate) => void,
    selectedDate?:  IDateSlice,
}

const Datepicker: React.FC<Props> = ({setSelectedDate, selectedDate}) => {
    const dispatch = useAppDispatch();
    const  globalSetSelectedDate  = setSelectedDate ? setSelectedDate : ({day, month, year}:ISetDate) => {
        dispatch(setDate({day, month, year}));
    };
    const globalSelectedDate = useAppSelector(selectPickedDate);
    
    return <div>
        <DatepickerNavbar />
        <DatepickerDashboard setSelectedDate={setSelectedDate ? setSelectedDate : globalSetSelectedDate} selectedDate={selectedDate ? selectedDate : globalSelectedDate}/>
    </div>
}

export default Datepicker;