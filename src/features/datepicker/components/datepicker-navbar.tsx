import useSetDatepicker from '../hooks/useSetDatepicker';
import { getMonthNameInPolish } from '../../calendar/utils/date-utils';
import { useAppSelector } from '../../../store/redux-hooks';
import { selectPickedDate } from '../store/datepicker.slice';

const DatepickerNavbar: React.FC = () => {
    const { viewPreviousMonth, viewNextMonth } = useSetDatepicker();
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
                <button onClick={() => { viewPreviousMonth(); }}>{`<`}</button>
                <button onClick={() => { viewNextMonth(); }}>{`>`}</button>
            </div>
        </div>
    )
};

export default DatepickerNavbar;