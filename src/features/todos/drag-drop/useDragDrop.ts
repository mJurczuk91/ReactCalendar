import { ITodo } from "../store/todo-slice";
import useTodos from "../hooks/useTodos";

export enum dragActions {
    'changeStartDate', 'changeEndDate'
}
export interface IDraggedd {
    id: number|undefined,
    action: dragActions
}

let currentlyDragged:IDraggedd|null = null;

const useDragDrop = () => {
    const {updateTodoStartDate} = useTodos();

    const startDrag = (dragged:IDraggedd) => {
        currentlyDragged = dragged;
        console.log(currentlyDragged);
    }
    const stopDrag = () => {
        currentlyDragged = null;
    }
    const handleDrop = (droppedOnDate: number) => {
        if(!currentlyDragged) return;
        switch(currentlyDragged.action) {
            case dragActions.changeStartDate:
                updateTodoStartDate(currentlyDragged.id, droppedOnDate);
                stopDrag();
                return;
        }
    }

    return {startDrag, stopDrag, handleDrop};
}

export default useDragDrop;