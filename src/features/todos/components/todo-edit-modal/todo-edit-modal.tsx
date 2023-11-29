import { useState } from "react";
import Datepicker from "../../../datepicker";
import { IDateSlice } from "../../../datepicker/store/datepicker.slice";
import classes from "./todo-edit-modal.module.scss"
import { ITodo } from "../../store/todo-slice";
import { addXStepsToTimestamp, getMonthNameInPolish, getTimeDiffInMinutes } from "../../../calendar/utils/date-utils";
import { padWithZeros } from "../../../calendar/utils/date-utils";
import { useAppDispatch } from "../../../../store/redux-hooks";
import { calendarStepInMinutes } from "../../../calendar/components/calendar-dashboard";
import { setDate } from "../../../datepicker/store/datepicker.slice";

interface Props {
    todo: ITodo;
    saveTodo: (todo: ITodo) => void;
    updateEditedTodo: React.Dispatch<React.SetStateAction<ITodo | null>>,
    cancelEditingTodo: () => void,
}


const TodoEditModal: React.FC<Props> = ({ todo, saveTodo, updateEditedTodo, cancelEditingTodo }) => {
    const [displayDatepicker, setDisplayDatepicker] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const toggleDisplayDatepicker = (e: React.MouseEvent) => {
        if (!displayDatepicker) setDisplayDatepicker(true);
        else setDisplayDatepicker(false);
    }

/*     const changeTodoStartDate = ({ day, month, year }: IDateSlice) => {
        const newStartDate = new Date(todo.dateStart);
        newStartDate.setFullYear(year, month, day);

        updateEditedTodo({
            ...todo,
            dateStart: newStartDate.getTime(),
            dateEnd: addXStepsToTimestamp(
                newStartDate.getTime(),
                (getTimeDiffInMinutes(todo.dateStart, todo.dateEnd) / calendarStepInMinutes),
            ),
        });

        //change global display date
        dispatch(setDate({
            day: newStartDate.getDate(),
            month: newStartDate.getMonth(),
            year: newStartDate.getFullYear(),
        }));

        setDisplayDatepicker(false);
    }
 */
    
    return <div>
    </div>
}
export default TodoEditModal;