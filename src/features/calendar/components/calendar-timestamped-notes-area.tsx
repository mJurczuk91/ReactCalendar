import React from "react";
import classes from "./calendar-timestamped-notes-area.module.scss";
import Todo from "../../todos/components/todo";
import { ITodo } from "../../todos/store/todo-slice";
import useTodos from "../../todos/hooks/useTodos";
import TodoDroptarget from "../../todos/components/todo-droptarget";
import { createPortal } from "react-dom";
import TodoEditModal from "../../todos/components/todo-edit-modal";



const CalendarTimestampedNotesArea: React.FC<{ children?: React.ReactNode, intervalTimestamps: Date[], pickedDate: Date }> = ({ intervalTimestamps, pickedDate }) => {
    const { getTodos, saveTodo, editedTodo, updateTodoDescription, newTodo ,startEditingTodo } = useTodos();
    const todos = getTodos();
    return <>
        {editedTodo && createPortal(
            <TodoEditModal todo={editedTodo as ITodo} updateTodoDescription={updateTodoDescription} />,
            document.getElementById('modal') as Element)}

        <div className={classes.container}>
            <div className={classes.container}>
                {intervalTimestamps.map((timestamp) => {
                    const todo = todos.find((todo) => todo.dateStart === timestamp.getTime());
                    return <TodoDroptarget
                        timestamp={timestamp.getTime()}
                        createTodo={newTodo}
                        key={timestamp.getTime()}>
                        {todo &&
                            <Todo
                                todo={todo}
                                saveTodo={saveTodo}
                                key={`${todo.id}`}
                            />}
                    </TodoDroptarget>
                })}
            </div>
        </div>
    </>
}


export default CalendarTimestampedNotesArea;