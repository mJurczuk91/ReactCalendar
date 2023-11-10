import React, { useState } from "react";
import classes from "./calendar-timestamped-notes-area.module.scss";
import Todo from "../../todos/components/todo";
import { ITodo } from "../../todos/store/todo-slice";
import useTodos from "../../todos/hooks/useTodos";
import TodoDroptarget from "../../todos/components/todo-droptarget";
import { createPortal } from "react-dom";
import TodoEditModal from "../../todos/components/todo-edit-modal";
import { ITodoDrag } from "../../todos/components/todo";



const CalendarTimestampedNotesArea: React.FC<{ children?: React.ReactNode, intervalTimestamps: Date[], pickedDate: Date }> = ({ intervalTimestamps, pickedDate }) => {
    const calendarFieldHeight = 48;
    const { getTodos, editedTodo, saveTodo, newTodo, moveTodo} = useTodos();
    const todos = getTodos();
    const [dragStatus, setDragStatus] = useState<ITodoDrag|null>(null);
    console.log('calendar timestamped notes rerendered');
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
                        drag={{status: dragStatus, setDragStatus}}
                        key={timestamp.getTime()}>
                        {todo &&
                            <Todo
                                drag={{status: dragStatus, setDragStatus}}
                                calendarFieldHeight={calendarFieldHeight}
                                todo={todo}
                                key={`${todo.id}`}
                            />}
                    </TodoDroptarget>
                })}
            </div>
    </>
}


export default CalendarTimestampedNotesArea;