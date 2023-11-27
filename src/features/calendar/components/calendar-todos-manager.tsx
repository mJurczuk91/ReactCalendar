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

type OutputGroup = {
    indent: number,
    todos: ITodo[],
    startDate: number,
    lastEndDate: number,
}


const CalendarTodosManager: React.FC<Props> = ({ intervalTimestamps }) => {
    const calendarFieldHeight = 48;
    const dispatch = useAppDispatch();
    const todoStore = useAppSelector(selectTodos);
    const [editedTodo, setEditedTodo] = useState<ITodo | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [todoDragStatus, setTodoDragStatus] = useState<ITodoDrag | null>(null);
    const todos = editedTodo ? todoStore.list.concat(editedTodo) : todoStore.list;

    const newTodo = (date: number) => {
        const newTodo = { id: todoStore.idCounter, dateStart: date, dateEnd: addXStepsToTimestamp(date, 1), description: '' }
        startEditingTodo(newTodo);
    }

    const startEditingTodo = (todo:ITodo) => {
        setEditedTodo(todo);
        setShowModal(true);
    }

    const cancelEditingTodo = () => {
        setEditedTodo(null);
        setShowModal(false);
    }

    const saveTodo = (todo: ITodo) => {
        if (todo.dateEnd <= todo.dateStart) todo.dateEnd = addXStepsToTimestamp(todo.dateStart, 1);
        if(todoStore.list.find((t) => t.id === todo.id)) dispatch(updateTodo(todo));
        else dispatch(createTodo({...todo}))

        if (editedTodo) setEditedTodo(null);
    }

    const moveTodo = (todo: ITodo, newStartDate: number) => {
        const todoLength = getTimeDiffInMinutes(todo.dateStart, todo.dateEnd);
        saveTodo({
            ...todo,
            dateStart: newStartDate,
            dateEnd: addXStepsToTimestamp(newStartDate, todoLength / calendarStepInMinutes),
        });
    }

    const prepareTodosForDisplay = () => {
        let groups = groupTodos();
        for(let group of groups){
            for(let group2 of groups){
                if(group.startDate < group2.startDate && group.startDate < group2.lastEndDate) group2.indent++;
            }
        }
        return groups;
    }

    const groupTodos = () => {
        let outputGroups:OutputGroup[] = [];
        for(let todo of todos){
            let group = outputGroups.find(group => group.startDate === todo.dateStart);
            if(group){
                group.todos.push(todo);
                if(todo.dateEnd > group.lastEndDate) group.lastEndDate = todo.dateEnd;
            } else {
                let arr = [];
                arr.push(todo);
                outputGroups.push({
                    indent: 0,
                    todos: arr,
                    startDate: todo.dateStart,
                    lastEndDate: todo.dateEnd,
                })
            }
        }
        return outputGroups;
    }

    const todosToDisplay = prepareTodosForDisplay();


    return <>
        {editedTodo && showModal && createPortal(
            <TodoEditModal 
                todo={editedTodo}
                saveTodo={saveTodo}
                updateEditedTodo={setEditedTodo}
                cancelEditingTodo={cancelEditingTodo}
            />,
            document.getElementById('modal') as Element)}

        <div className={classes.container}>
            {intervalTimestamps.map((timestamp) => {
                const group = todosToDisplay.find((group) => group.startDate === timestamp.getTime());
                return <TodoDroptarget
                    timestamp={timestamp.getTime()}
                    createTodo={newTodo}
                    saveTodo={saveTodo}
                    moveTodo={moveTodo}
                    drag={{ status: todoDragStatus, setTodoDragStatus }}
                    key={timestamp.getTime()}>
                    {group &&
                        <div
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                zIndex: group.indent + 1,
                                left: group.indent * 10 + '%',
                            }}
                        >
                            {group.todos.map((todo, i) =>
                                <Todo
                                    todosInLine={group.todos.length}
                                    placeInLine={i}
                                    drag={{ status: todoDragStatus, setTodoDragStatus }}
                                    calendarFieldHeight={calendarFieldHeight}
                                    todo={todo}
                                    key={`${todo.id}`}
                                />)}
                        </div>
                    }
                </TodoDroptarget>
            })}
        </div>
    </>
}


export default CalendarTodosManager;