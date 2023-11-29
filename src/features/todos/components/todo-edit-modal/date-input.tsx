import Datepicker from "../../../datepicker";
import { useState } from "react";
import { IDateSlice, selectPickedDate } from "../../../datepicker/store/datepicker.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/redux-hooks";
import { setDate } from "../../../datepicker/store/datepicker.slice";
import { useContext } from "react";
import { ITodo } from "../../store/todo-slice";
import { EditedTodoContext, EditedTodoContextType } from "../../../calendar/components/calendar-todos-manager";

interface Props {
    updateEditedTodoStartDate: (newStartDate:Date)=>void,
}

const DateInput: React.FC<Props> = ({ updateEditedTodoStartDate }) => {
    const {editedTodo, updateEditedTodo} = useContext(EditedTodoContext) as EditedTodoContextType
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
        updateEditedTodoStartDate(newDate);
    }

    return <div style={{display:'flex'}}>
        <label>
            Start date:
            <input
                type="text"
                {...field}
            />
            {meta.error && meta.touched && <div>{meta.error}</div>}
        </label>
        {displayDatepicker &&
            <div style={{position: 'absolute', background: 'white', top: '80px'}}>
                <Datepicker
                    selectedDate={{
                        day: value.getDate(),
                        month: value.getMonth(),
                        year: value.getFullYear(),
                    }}
                    setSelectedDate={setStartDate}
                />
            </div>
        }
    </div>
}

export default DateInput;