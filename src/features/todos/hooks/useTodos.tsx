import { useAppSelector } from "../../../store/redux-hooks";
import { ITodo, selectTodos } from "../store/todo-slice";
import { useAppDispatch } from "../../../store/redux-hooks";
import { createTodo, updateTodo, deleteTodo } from "../store/todo-slice";
import React, { useEffect, useState } from "react";
import { addXStepsToTimestamp, getTimeDiffInMinutes, calendarStepInMinutes } from "../../calendar/utils/date-utils";

let editedTodo: ITodo | null = null;
let listeners: React.Dispatch<React.SetStateAction<ITodo[] | undefined>>[] = [];
let todos = [] as ITodo[];

const useTodos = () => {
    const dispatch = useAppDispatch();
    todos = useAppSelector(selectTodos).list;
    const nextUnusedId = useAppSelector(selectTodos).idCounter;

    const setState = useState<ITodo[]>()[1];
    useEffect(() => {
        listeners.push(setState);
        return () => {
            listeners = listeners.filter(l => l !== setState);
        };
    }, [setState]);

    const notifyListeners = () => {
        let updates = editedTodo ? todos.concat(editedTodo) : todos;
        for (let l of listeners) {
            l(updates);
        }
    }

    const getTodos = (): ITodo[] => {
        return todos;
    }

    const newTodo = (date: number) => {
        const newTodo = { id: nextUnusedId, dateStart: date, dateEnd: addXStepsToTimestamp(date, 1), description: '' }
        dispatch(createTodo({ ...newTodo }));
        startEditingTodo({ ...newTodo })
    }

    const startEditingTodo = (todo: ITodo) => {
        editedTodo = todo;
        notifyListeners();
    }

    const moveTodo = (todo: ITodo, newStartDate:number) => {
        const todoLength = getTimeDiffInMinutes(todo.dateStart, todo.dateEnd);
        saveTodo({
            ...todo,
            dateStart: newStartDate,
            dateEnd: addXStepsToTimestamp(newStartDate, todoLength / calendarStepInMinutes),
        });
    }

    const updateTodoStartDate = (todo: ITodo, newStartDate: number) => {
        saveTodo({
            ...todo,
            dateStart: newStartDate,
        });
    }

    const updateTodoEndDate = (todo: ITodo, newEndDate: number) => {
        const endDate = new Date(newEndDate);
        console.log(`changing end date from ${new Date(todo.dateEnd).toLocaleString()} to ${endDate.toLocaleString()}`);
        saveTodo({
            ...todo,
            dateEnd: newEndDate,
        });
    }

    const updateTodoDescription = (description: string) => {
        if (editedTodo !== null) {
            console.log('DESCRIPTION');
            editedTodo.description = description;
            saveTodo(editedTodo);
        }
    }

    const saveTodo = (todo?: ITodo) => {
        const todoToSave = todo ? todo : editedTodo;
        if (!todoToSave) return;
        dispatch(updateTodo(todoToSave));
        editedTodo = null;
        notifyListeners();
    }


    return { getTodos, editedTodo, updateTodoDescription, updateTodoStartDate, updateTodoEndDate, newTodo, startEditingTodo, saveTodo, moveTodo, deleteTodo: (todo: ITodo) => { dispatch(deleteTodo(todo)); } }
}

export default useTodos;