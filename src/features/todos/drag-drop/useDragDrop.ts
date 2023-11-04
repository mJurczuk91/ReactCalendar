import { ITodo } from "../store/todo-slice";
import useTodos from "../hooks/useTodos";
import { useState, useEffect } from "react";

export enum dragActions {
    'changeStartDate', 'changeEndDate'
}
export interface IDraggedd {
    todo: ITodo,
    action: dragActions
}

let currentlyDragged: IDraggedd | null = null;
let lastTargetTimestamp: number | null;
let listeners: React.Dispatch<React.SetStateAction<IDraggedd | null>>[] = [];

const useDragDrop = () => {
    const { updateTodoStartDate, updateTodoEndDate } = useTodos();
    const setState = useState<IDraggedd | null>(currentlyDragged)[1];
    useEffect(() => {
        listeners.push(setState);
        return () => {
            listeners = listeners.filter(l => l !== setState);
        };
    }, [setState]);

    const notifyListeners = () => {
        for(let l of listeners){ l(currentlyDragged); }
    }

    const startDrag = (todo: ITodo, action: dragActions) => {
        currentlyDragged = { todo, action };
        notifyListeners();
    }

    const updateLastDraggedOver = (timestamp: number) => {
        lastTargetTimestamp = timestamp;
    }

    const stopDrag = () => {
        console.log(`currently dragged`);
        if (!currentlyDragged || !lastTargetTimestamp) {
            cleanup();
            return;
        }
        switch (currentlyDragged.action) {
            case dragActions.changeStartDate:
                updateTodoStartDate(currentlyDragged.todo, lastTargetTimestamp);
                break;
            case dragActions.changeEndDate:
                updateTodoEndDate(currentlyDragged.todo, lastTargetTimestamp);
                break;
        }
        cleanup();
    }

    const handleDrop = (droppedOnDate: number) => {
        console.log('handledrop, current: ' + currentlyDragged);
        if (!currentlyDragged) return;
        updateTodoStartDate(currentlyDragged.todo, droppedOnDate);
        console.log("handledrop");
        cleanup();
    }

    const cleanup = () => {
        currentlyDragged = null;
        lastTargetTimestamp = null;
        notifyListeners();
    }

    return { startDrag, stopDrag, handleDrop, updateLastDraggedOver, currentlyDragged };
}

export default useDragDrop;