import { useEffect, useState } from "react";
import { ITodo } from "../store/todo-slice";
import ResizeHandlebar from "./resize-handlebar";
import useDragDrop, {dragActions} from "../drag-drop/useDragDrop";
import { calendarStepInMinutes, getTimeDiffInMinutes } from "../../calendar/utils/date-utils";

interface Props {
    todo: ITodo,
    saveTodo: () => void,
}


const Todo:React.FC<Props> = ({todo, saveTodo}, ) => {
    const [currentHeight, setCurrentHeight] = useState<number>(() => {
        console.log(getTimeDiffInMinutes(todo.dateStart, todo.dateEnd));
        console.log(todo.dateStart);
        console.log(todo.dateEnd);
        return getTimeDiffInMinutes(todo.dateStart, todo.dateEnd) / calendarStepInMinutes * 48;
    });
    const {startDrag, stopDrag} = useDragDrop();

    const dragStartHandler = (e:React.DragEvent) => {
        startDrag({id: todo.id, action: dragActions.changeStartDate});
        e.dataTransfer.setDragImage(e.currentTarget, e.clientX - e.currentTarget.getBoundingClientRect().left, 0);
    };

    let resizeStartMouseYPos = 0;
    let resizeStartHeight = currentHeight;
    enum resizeDirection {up, down};
    const startResizing = (e:React.MouseEvent, direction:resizeDirection) => {
        e.preventDefault();
        e.stopPropagation();
        resizeStartMouseYPos = e.pageY;
        resizeStartHeight = currentHeight;
        switch(direction){
            case resizeDirection.up:
                window.addEventListener('mousemove', handleResizingUp);
                window.addEventListener('mouseup', stopResizingUp)
                console.log('inside up');
                break;
            case resizeDirection.down:
                window.addEventListener('mousemove', handleResizingDown);
                window.addEventListener('mouseup', stopResizingDown)
                console.log('inside up');
                break;
        }
    }

    const handleResizingUp = (e:MouseEvent) => {
        let yDistanceMoved = (e.pageY - resizeStartMouseYPos)
        setCurrentHeight(resizeStartHeight + yDistanceMoved)
    }

    const handleResizingDown = (e:MouseEvent) => {
        let yDistanceMoved = (e.pageY - resizeStartMouseYPos)
        setCurrentHeight(resizeStartHeight + yDistanceMoved)    
    }

    const stopResizingUp = () => {
        window.removeEventListener('mousemove', handleResizingUp);
        window.removeEventListener('mouseup', stopResizingUp);
        resizeStartMouseYPos = 0;
        resizeStartHeight = 0;
    }

    const stopResizingDown = () => {
        window.removeEventListener('mousemove', handleResizingDown);
        window.removeEventListener('mouseup', stopResizingDown);
        resizeStartMouseYPos = 0;
        resizeStartHeight = 0;
    }

    const handleMouseClick = (e:React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    let style:React.CSSProperties = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'red',
        height: currentHeight+`px`,
        minWidth: '95%',
        zIndex: 2,
    };

    return <>
    <div
    draggable
    onDragStart={dragStartHandler}
    onClick={handleMouseClick}
    style={style}>
        <ResizeHandlebar handleMouseDown={(e) => {
            startResizing(e, resizeDirection.up);
        }}/>
        {todo.description}
        <ResizeHandlebar handleMouseDown={(e) => {
            startResizing(e, resizeDirection.down);
        }}/>
    </div>
    </>
};



export default Todo;