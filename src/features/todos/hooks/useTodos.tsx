import { useAppSelector } from "../../../store/redux-hooks";
import { ITodo, selectTodos } from "../store/todo-slice";
import { useAppDispatch } from "../../../store/redux-hooks";
import { createTodo, updateTodo, deleteTodo } from "../store/todo-slice";
import React, { useEffect, useState } from "react";

let editedTodo: ITodo | null = null;
let listeners: React.Dispatch<React.SetStateAction<ITodo[] | undefined>>[] = [];
let todos = [] as ITodo[];

const useTodos = () => {
    const setState = useState<ITodo[]>()[1];
    useEffect(() => {
        listeners.push(setState);
        return () => {
            listeners = listeners.filter(l => l !== setState);
        };
    }, [setState]);

    const notifyListeners = () => {
        let updates = editedTodo ? todos.concat(editedTodo) : todos;
        for(let l of listeners){
            l(updates);
        }
    }

    const dispatch = useAppDispatch();
    todos = useAppSelector(selectTodos).list;

    const getTodos = ():ITodo[] => {
        return editedTodo ? todos.concat(editedTodo) : todos;
    }

    const startEditingTodo = (date: number) => {
        const todo = todos.find(t => t.dateStart === date);
        editedTodo = todo ? { ...todo } : { id: undefined, dateStart: date, dateEnd: date, description: '' };
        notifyListeners();
    }

    const updateTodoStartDate = (id:number|undefined, newStartDate:number) => {
        if(id) {
            console.log('updating todo start date');
            const todo = todos.find(t => t.id === id);
            if(todo !== undefined) {
                saveTodo({...todo, dateStart: newStartDate} );
            }
        }
        else{
            if(editedTodo !== null){
                editedTodo = {...editedTodo, dateStart: newStartDate};
                notifyListeners();
            }
        }
    }

    const updateTodoDescription = (description:string) => {
        if(editedTodo !== null) {
            editedTodo.description = description;
            saveTodo(editedTodo);
        }
    }

    const saveTodo = (todo?:ITodo) => {
        let todoToSave = todo ? todo : editedTodo;
        if(!todoToSave) return;
        if (todoToSave.id === undefined) {
            dispatch(createTodo(todoToSave));
            editedTodo = null;
        } else {
            dispatch(updateTodo(todoToSave));
            editedTodo = null;
        }
        notifyListeners();
    };

    
    return { getTodos, editedTodo, updateTodoDescription, updateTodoStartDate, startEditingTodo, saveTodo, deleteTodo: (todo: ITodo) => { dispatch(deleteTodo(todo)); } }
}

export default useTodos;