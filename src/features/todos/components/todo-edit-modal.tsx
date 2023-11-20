import { useState } from "react";
import Datepicker from "../../datepicker";
import { IDateSlice } from "../../datepicker/store/datepicker.slice";
import classes from "./todo-edit-modal.module.scss"
import { ITodo } from "../store/todo-slice";
import { addXStepsToTimestamp, getMonthNameInPolish, getTimeDiffInMinutes } from "../../calendar/utils/date-utils";
import { padWithZeros } from "../../calendar/utils/date-utils";
import { useAppDispatch } from "../../../store/redux-hooks";
import { calendarStepInMinutes } from "../../calendar/components/calendar-dashboard";
import { setDate } from "../../datepicker/store/datepicker.slice";
import { useFormik } from "formik";


interface Props {
    todo: ITodo;
    saveTodo: (todo: ITodo) => void;
    updateEditedTodo: React.Dispatch<React.SetStateAction<ITodo | null>>,
}


const TodoEditModal: React.FC<Props> = ({ todo, saveTodo, updateEditedTodo }) => {
    const [description, setDescription] = useState<string>(todo.description);
    const [displayDatepicker, setDisplayDatepicker] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [startDate, setStartdDate] = useState<IDateSlice>({
        day: new Date(todo.dateStart).getDate(),
        month: new Date(todo.dateStart).getMonth(),
        year: new Date(todo.dateStart).getFullYear(),
    })

    const handleStartDateClicked = (e: React.MouseEvent) => {
        if(!displayDatepicker) setDisplayDatepicker(true);
        else setDisplayDatepicker(false);
    }

    const changeTodoStartDate = ({day, month, year}:IDateSlice) => {
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

        const newStartDateSlice:IDateSlice = {
            day: newStartDate.getDate(),
            month: newStartDate.getMonth(),
            year: newStartDate.getFullYear(),
        }

        //czemu zmiana propsów nie rerenderuje
        setStartdDate(newStartDateSlice)

        //change global display date
        dispatch(setDate(newStartDateSlice));
        setDisplayDatepicker(false);
    }

    return <>
        <div
            className={classes.modal}
            onClick={(e: React.MouseEvent) => { e.stopPropagation() }}>
            <div>
                <p>
                    <span
                        onClick={handleStartDateClicked}
                    >
                        {startDate.day} {getMonthNameInPolish(startDate.month)}
                    </span>
                    <span>{padWithZeros(new Date(todo.dateStart).getHours())}:{padWithZeros(new Date(todo.dateStart).getMinutes())}</span>
                    <span> - </span>
                    <span>{padWithZeros(new Date(todo.dateEnd).getHours())}:{padWithZeros(new Date(todo.dateEnd).getMinutes())}</span>
                </p>
                {displayDatepicker &&
                    <div>
                        <Datepicker selectedDate={startDate} setSelectedDate={changeTodoStartDate} />
                    </div>
                }
            </div>
            <form onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                saveTodo({ ...todo, description: description });
            }}>
                <div>
                    <label htmlFor="task-description">Task Description: </label>
                    <input
                        autoFocus
                        id="task-description"
                        type="text"
                        placeholder="description"
                        onChange={(e) => { setDescription(e.currentTarget.value); }}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    </>

}

export default TodoEditModal;