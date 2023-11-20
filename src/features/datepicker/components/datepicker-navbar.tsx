import { getMonthNameInPolish } from '../../calendar/utils/date-utils';

interface Props {
    setViewMonth: React.Dispatch<React.SetStateAction<number>>,
    setViewYear: React.Dispatch<React.SetStateAction<number>>,
    viewMonth: number,
    viewYear: number,
}

const DatepickerNavbar: React.FC<Props> = ({viewMonth, viewYear, setViewMonth, setViewYear}) => {
    const viewNextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear(viewYear + 1)
        } else {
            setViewMonth(viewMonth + 1);
        }
    }
    const viewPreviousMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear(viewYear - 1)
        } else {
            setViewMonth(viewMonth - 1);
        }
    }
    return (
        <div>
            <p>
                {getMonthNameInPolish(viewMonth)}
            </p>
            <p>
                {viewYear}
            </p>
            <div>
                <button onClick={viewPreviousMonth}>{`<`}</button>
                <button onClick={viewNextMonth}>{`>`}</button>
            </div>
        </div>
    )
};

export default DatepickerNavbar;