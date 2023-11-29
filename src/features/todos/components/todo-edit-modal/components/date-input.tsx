import Datepicker from "../../../../datepicker";
import { useState } from "react";
import { IDateSlice, selectPickedDate } from "../../../../datepicker/store/datepicker.slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/redux-hooks";
import { setDate } from "../../../../datepicker/store/datepicker.slice";
import { useContext } from "react";
import { EditedTodoContext } from "../../../../calendar/components/calendar-todos-manager";
import { changeTodoStartDateKeepDuration } from "../../../store/todo-slice";
import { getMonthNameInPolish } from "../../../../calendar/utils/date-utils";


const DateInput: React.FC = () => {
    const {editedTodo, updateEditedTodo} = useContext(EditedTodoContext);
    const dispatch = useAppDispatch();

    const { day: globalDay, month: globalMonth, year: globalYear } = useAppSelector(selectPickedDate);
    const [displayDatepicker, setDisplayDatepicker] = useState<boolean>(false);

    const setStartDate = async ({ day, month, year }: IDateSlice) => {
        const newDate = new Date(editedTodo.dateStart.getTime());
        newDate.setFullYear(year);
        newDate.setMonth(month);
        newDate.setDate(day);

/*         const errors = await helper.setValue(newDate, true);
        if(errors && 'dateStart' in errors) {
            console.log(errors);
            return;
        } */

        //set global date to change viewed day
        if (day !== globalDay || month !== globalMonth || year !== globalYear) dispatch(setDate({ day, month, year }));

        setDisplayDatepicker(false);
        updateEditedTodo(
            changeTodoStartDateKeepDuration(editedTodo, newDate)
        );
    }

    return <div style={{display:'flex'}}>
        <label>
            Start date:
            <input
                type="text"
                value={`${editedTodo.dateStart.getDate()} ${getMonthNameInPolish(editedTodo.dateStart.getMonth())}`}
                readOnly={true}
                onFocus={() => {
                    setDisplayDatepicker(true)
                }}
            />
        </label>
        {displayDatepicker &&
            <div style={{position: 'absolute', background: 'white', top: '80px'}}>
                <Datepicker
                    selectedDate={{
                        day: editedTodo.dateStart.getDate(),
                        month: editedTodo.dateStart.getMonth(),
                        year: editedTodo.dateStart.getFullYear(),
                    }}
                    setSelectedDate={setStartDate}
                />
            </div>
        }
    </div>
}

export default DateInput;