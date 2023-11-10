import { ITodo } from "../store/todo-slice";
import useTodos from "../hooks/useTodos";
import { useState, useEffect } from "react";
import { addXStepsToTimestamp } from "../../calendar/utils/date-utils";

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
    const { saveTodo, moveTodo } = useTodos();
    const setState = useState<IDraggedd | null>(currentlyDragged)[1];
    useEffect(() => {
        listeners.push(setState);
        return () => {
            listeners = listeners.filter(l => l !== setState);
        };
    }, [setState]);

    const notifyListeners = () => {
        for (let l of listeners) { l(currentlyDragged); }
    }

    const startDrag = (todo: ITodo, action: dragActions) => {
        console.log('use drag dragging ' + todo);
        currentlyDragged = { todo, action };
        notifyListeners();
    }

    const updateLastDraggedOver = (timestamp: number) => {
        lastTargetTimestamp = timestamp;
    }

    const stopDrag = () => {
        if (!currentlyDragged || !lastTargetTimestamp) {
            cleanup();
            return;
        }
        switch (currentlyDragged.action) {
            case dragActions.changeStartDate:
                saveTodo({...currentlyDragged.todo, dateStart: lastTargetTimestamp});
                break;
            case dragActions.changeEndDate:
/*              calendar fields are numbered at the top, so if the task is dropped between hour 00:00 and 00:15,
                it will read time as 00:00. It works for creating task or setting start time, but if im trying 
                to change the end date, i want the task stretching all the way to 00:15, so i add 15 minutes */
                saveTodo({...currentlyDragged.todo, dateEnd: addXStepsToTimestamp(lastTargetTimestamp, 1)});
                break;
        }
        cleanup();
    }

    const handleDrop = (droppedOnDate: number) => {
        console.log('handledrop, current: ' + currentlyDragged);
        if (!currentlyDragged) return;
        moveTodo(currentlyDragged.todo, droppedOnDate);
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