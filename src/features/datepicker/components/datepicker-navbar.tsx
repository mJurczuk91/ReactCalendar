import { getMonthNameInPolish } from '../../calendar/utils/date-utils';
import { useAppDispatch, useAppSelector } from '../../../store/redux-hooks';
import { selectPickedDate, setNextViewMonth, setPreviousViewMonth } from '../store/datepicker.slice';

const DatepickerNavbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const {viewMonth, viewYear} = useAppSelector(selectPickedDate);
    return (
        <div>
            <p>
                {getMonthNameInPolish(viewMonth)}
            </p>
            <p>
                {viewYear}
            </p>
            <div>
                <button onClick={() => { dispatch(setPreviousViewMonth()) }}>{`<`}</button>
                <button onClick={() => { dispatch(setNextViewMonth()) }}>{`>`}</button>
            </div>
        </div>
    )
};

export default DatepickerNavbar;