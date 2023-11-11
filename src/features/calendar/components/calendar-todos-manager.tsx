import React, { useState } from "react";
import classes from "./calendar-todos-manager.module.scss";
import Todo from "../../todos/components/todo";
import { ITodo, createTodo, selectTodos, updateTodo } from "../../todos/store/todo-slice";
import TodoDroptarget from "../../todos/components/todo-droptarget";
import { createPortal } from "react-dom";
import TodoEditModal from "../../todos/components/todo-edit-modal";
import { ITodoDrag } from "../../todos/components/todo";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";
import { addXStepsToTimestamp, getTimeDiffInMinutes } from "../utils/date-utils";
import { calendarStepInMinutes } from "./calendar-dashboard";


interface Props {
    intervalTimestamps: Date[],
}


const CalendarTodosManager: React.FC<Props> = ({ intervalTimestamps }) => {
    const calendarFieldHeight = 48;
    const dispatch = useAppDispatch();
    const todoStore = useAppSelector(selectTodos);
    const [editedTodo, setEditedTodo] = useState<ITodo|null>(null);
    const [todoDragStatus, setTodoDragStatus] = useState<ITodoDrag|null>(null);
    const todos = editedTodo ? todoStore.list.concat(editedTodo) : todoStore.list;

    const newTodo = (date: number) => {
        const newTodo = { id: todoStore.idCounter, dateStart: date, dateEnd: addXStepsToTimestamp(date, 1), description: '' }
        dispatch(createTodo({ ...newTodo }));
        setEditedTodo({ ...newTodo })
    }

    const saveTodo = (todo?: ITodo) => {
        let todoToSave = todo ? todo : editedTodo;
        if (!todoToSave) return;
        if(todoToSave.dateEnd <= todoToSave.dateStart) todoToSave.dateEnd = addXStepsToTimestamp(todoToSave.dateStart, 1);
        dispatch(updateTodo(todoToSave));
        if(editedTodo) setEditedTodo(null);
    }

    const moveTodo = (todo: ITodo, newStartDate:number) => {
        const todoLength = getTimeDiffInMinutes(todo.dateStart, todo.dateEnd);
        saveTodo({
            ...todo,
            dateStart: newStartDate,
            dateEnd: addXStepsToTimestamp(newStartDate, todoLength / calendarStepInMinutes),
        });
    }
    
    return <>
        {editedTodo && createPortal(
            <TodoEditModal todo={editedTodo as ITodo} saveTodo={saveTodo} />,
            document.getElementById('modal') as Element)}

            <div className={classes.container}>
                {intervalTimestamps.map((timestamp) => {
                    const todo = todos.find((todo) => todo.dateStart === timestamp.getTime());
                    return <TodoDroptarget
                        timestamp={timestamp.getTime()}
                        createTodo={newTodo}
                        saveTodo={saveTodo}
                        moveTodo={moveTodo}
                        drag={{status: todoDragStatus, setTodoDragStatus}}
                        key={timestamp.getTime()}>
                        {todo &&
                            <Todo
                                drag={{status: todoDragStatus, setTodoDragStatus}}
                                calendarFieldHeight={calendarFieldHeight}
                                todo={todo}
                                key={`${todo.id}`}
                            />}
                    </TodoDroptarget>
                })}
            </div>
    </>
}


export default CalendarTodosManager;