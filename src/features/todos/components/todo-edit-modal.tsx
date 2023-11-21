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
import { FormikErrors, FormikValues, useFormik } from "formik";


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

    const changeTodoStartDate = ({ day, month, year }: IDateSlice) => {
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

    const formik = useFormik({
        initialValues: {
            description: '',
        },
        validate: values => {
            return new Promise(resolve => setTimeout(resolve, 200)).then(() => {
                const errors: FormikErrors<FormikValues> = {};
                if (!values.description) errors.description = 'Description required';
                return errors;
            }
            )
        },
        onSubmit: values => {
            saveTodo({ ...todo, description: values.description });
        }
    });

    return <>
        <div
            className={classes.modal}
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                if(displayDatepicker) setDisplayDatepicker(false);
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
                if(e.key === 'Escape') {
                    e.stopPropagation();
                    cancelEditingTodo();
                }
            }}
            >
            <div className={classes.modal__topbar}>
                <button className={classes.modal__offswitch} onClick={cancelEditingTodo}>&times;</button>
            </div>
            <div className={classes.datepicker__menu}>
                <p
                    className={classes.datepicker__toggle}
                    onClick={toggleDisplayDatepicker}
                >
                    {new Date(todo.dateStart).getDate()} {getMonthNameInPolish(new Date(todo.dateStart).getMonth())}
                </p>
                <p>
                    <span className={classes.datepicker__toggle}>{padWithZeros(new Date(todo.dateStart).getHours())}:{padWithZeros(new Date(todo.dateStart).getMinutes())}</span>
                    <span> - </span>
                    <span>{padWithZeros(new Date(todo.dateEnd).getHours())}:{padWithZeros(new Date(todo.dateEnd).getMinutes())}</span>
                </p>
                {displayDatepicker &&
                    <div className={classes.datepicker}>
                        <Datepicker selectedDate={
                            {
                                day: new Date(todo.dateStart).getDate(),
                                month: new Date(todo.dateStart).getMonth(),
                                year: new Date(todo.dateStart).getFullYear(),
                            }
                        } setSelectedDate={changeTodoStartDate} />
                    </div>
                }
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className={classes.input__container}>
                    <input
                        className={classes.description__input}
                        autoFocus
                        id="description"
                        type="text"
                        placeholder="description"
                        {...formik.getFieldProps('description')}
                    />
                </div>
                <div className={classes.input__error}>
                    {formik.errors.description && formik.errors.description}
                </div>
                <div className={classes.button__container}>
                    <button className={classes.button__save} type="submit">Save</button>
                </div>
            </form>
        </div>
    </>

}

export default TodoEditModal;