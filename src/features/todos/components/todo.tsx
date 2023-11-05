import { useEffect, useState } from "react";
import { ITodo } from "../store/todo-slice";
import ResizeHandlebar from "./resize-handlebar";
import useDragDrop, {dragActions} from "../drag-drop/useDragDrop";
import { calendarStepInMinutes, getTimeDiffInMinutes } from "../../calendar/utils/date-utils";

interface Props {
    todo: ITodo,
}
export enum resizeDirection {up, down};

const Todo:React.FC<Props> = ({todo}, ) => {
    const defaultHeight = 48;
    const [currentPosYOffset, setCurrentPosYOffset] = useState<number>(0);
    const [currentHeight, setCurrentHeight] = useState<number>(calculateHeightInPixels(todo.dateStart, todo.dateEnd));  
    const {startDrag, stopDrag} = useDragDrop();
    const [pointerEvents, setPointerEvents] = useState<boolean>(true);

    useEffect(() => {
        setCurrentHeight(calculateHeightInPixels(todo.dateStart, todo.dateEnd));
        const startDate = new Date(todo.dateStart);
        const endDate =  new Date(todo.dateEnd);
        console.log(`start date: ${startDate.toLocaleString()}`);
        console.log(`end date: ${endDate.toLocaleString()}`);
        console.log(`height in pixels: ${calculateHeightInPixels(todo.dateStart, todo.dateEnd)}`);
    }, [todo.dateStart, todo.dateEnd, todo])

    const dragStartHandler = (e:React.DragEvent) => {
        console.log('starting drag');
        startDrag(todo, dragActions.changeStartDate);
        e.dataTransfer.setDragImage(e.currentTarget, e.clientX - e.currentTarget.getBoundingClientRect().left, 0);
    };

    let resizeStartMouseYPos = 0;
    let resizeStartHeight = currentHeight;
    const startResizing = (e:React.MouseEvent, direction:resizeDirection) => {
        e.preventDefault();
        e.stopPropagation();
        resizeStartMouseYPos = e.pageY;
        resizeStartHeight = currentHeight;
        setPointerEvents(false);
        switch(direction){
            case resizeDirection.up:
                window.addEventListener('mousemove', handleResizingUp);
                window.addEventListener('mouseup', stopResizingUp);
                startDrag(todo, dragActions.changeStartDate);
                break;
            case resizeDirection.down:
                window.addEventListener('mousemove', handleResizingDown);
                window.addEventListener('mouseup', stopResizingDown);
                startDrag(todo, dragActions.changeEndDate)
                break;
        }
    }

    const handleResizingUp = (e:MouseEvent) => {
        const yDistanceMoved = (resizeStartMouseYPos - e.pageY)
        setCurrentHeight(Math.max(defaultHeight, resizeStartHeight + yDistanceMoved));
        setCurrentPosYOffset(-Math.max((defaultHeight - resizeStartHeight), yDistanceMoved));
    }

    const handleResizingDown = (e:MouseEvent) => {
        const yDistanceMoved = (e.pageY - resizeStartMouseYPos)
        setCurrentHeight(Math.max(defaultHeight, resizeStartHeight + yDistanceMoved));
    }

    const stopResizingUp = () => {
        window.removeEventListener('mousemove', handleResizingUp);
        window.removeEventListener('mouseup', stopResizingUp);
        resizeStartMouseYPos = 0;
        resizeStartHeight = 0;
        stopDrag();
        setPointerEvents(true);
    }

    const stopResizingDown = () => {
        console.log('stop resizing down in todo');
        window.removeEventListener('mousemove', handleResizingDown);
        window.removeEventListener('mouseup', stopResizingDown);
        resizeStartMouseYPos = 0;
        resizeStartHeight = 0;
        stopDrag();
        setPointerEvents(true);
    }

    const handleMouseClick = (e:React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    function calculateHeightInPixels(dateStart:number, dateEnd:number) {
        return getTimeDiffInMinutes(dateStart, dateEnd) / calendarStepInMinutes * defaultHeight ;
    }

    let style:React.CSSProperties = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'red',
        minWidth: '95%',

        top: currentPosYOffset,
        height: currentHeight+`px`,
        pointerEvents: pointerEvents ? 'all' : 'none',
        zIndex: 2,
    };

    return <>
    <div
    draggable
    onDragStart={dragStartHandler}
    onClick={handleMouseClick}
    style={style}>
        <ResizeHandlebar resizeDirection={resizeDirection.up} handleMouseDown={startResizing}/>
        {todo.description}
        <ResizeHandlebar resizeDirection={resizeDirection.down} handleMouseDown={startResizing}/>
    </div>
    </>
};



export default Todo;