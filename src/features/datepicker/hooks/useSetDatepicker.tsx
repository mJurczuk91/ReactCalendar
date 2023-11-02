import { setDate, setNextViewMonth, setPreviousViewMonth } from "../store/datepicker.slice";
import { useAppDispatch } from "../../../store/redux-hooks";
import { ISetDate } from "../store/datepicker.slice";

const useSetDatepicker = () => {
    const dispatch = useAppDispatch();
    const viewPreviousMonth = () => { dispatch(setPreviousViewMonth()) }
    const viewNextMonth = () => { dispatch(setNextViewMonth()) }

    const setPickedDay = ({day, month, year}:ISetDate) => {
        dispatch(setDate({day, month, year}));
    }
    return {viewPreviousMonth, viewNextMonth, setPickedDay};
}

export default useSetDatepicker;

