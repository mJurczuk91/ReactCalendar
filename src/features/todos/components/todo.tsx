import { useEffect, useState } from "react";
import { ITodo } from "../store/todo-slice";
import ResizeHandlebar from "./resize-handlebar";
import useDragDrop, {dragActions} from "../drag-drop/useDragDrop";
import { calendarStepInMinutes, getTimeDiffInMinutes } from "../../calendar/utils/date-utils";

interface Props {
    todo: ITodo,
    calendarFieldHeight: number,
}
export enum resizeDirection {up, down};

const Todo:React.FC<Props> = ({todo, calendarFieldHeight}) => {
    
    const [currentPosYOffset, setCurrentPosYOffset] = useState<number>(0);
    const [currentHeight, setCurrentHeight] = useState<number>(calculateHeightInPixels(todo.dateStart, todo.dateEnd));  
    const {startDrag, stopDrag, currentlyDragged} = useDragDrop();
    const [pointerEvents, setPointerEvents] = useState<boolean>(true);

    useEffect(() => {
        setCurrentHeight(calculateHeightInPixels(todo.dateStart, todo.dateEnd));
        const startDate = new Date(todo.dateStart);
        const endDate =  new Date(todo.dateEnd);
        console.log(`start date: ${startDate.toLocaleString()}`);
        console.log(`end date: ${endDate.toLocaleString()}`);
        console.log(`height in pixels: ${calculateHeightInPixels(todo.dateStart, todo.dateEnd)}`);
    }, [todo.dateStart, todo.dateEnd, todo])

    useEffect(() => {
        if(currentlyDragged) setPointerEvents(false);
        else setPointerEvents(true);
    }, [currentlyDragged]);

    const dragStartHandler = (e:React.DragEvent) => {
        console.log('starting drag');
        startDrag(todo, dragActions.changeStartDate);
        e.dataTransfer.setDragImage(e.currentTarget, e.clientX - e.currentTarget.getBoundingClientRect().left, 0);
    };

    const startResizing = (e:React.MouseEvent, direction:resizeDirection) => {
        startDrag(todo, dragActions.changeEndDate);
    }

    const handleMouseClick = (e:React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    function calculateHeightInPixels(dateStart:number, dateEnd:number) {
        return getTimeDiffInMinutes(dateStart, dateEnd) / calendarStepInMinutes * calendarFieldHeight ;
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