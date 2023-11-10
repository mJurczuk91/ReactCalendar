import { useEffect, useState } from "react";
import { ITodo } from "../store/todo-slice";
import ResizeHandlebar from "./resize-handlebar";
import { calendarStepInMinutes, getTimeDiffInMinutes } from "../../calendar/utils/date-utils";

interface Props {
    todo: ITodo,
    calendarFieldHeight: number,
    drag: {status:ITodoDrag|null, setDragStatus:React.Dispatch<React.SetStateAction<ITodoDrag|null>>}
}

export enum TodoDragActions {
    move,
    resize,
}

export interface ITodoDrag{
    todo: ITodo,
    dragAction: TodoDragActions,
}

const Todo:React.FC<Props> = ({todo, calendarFieldHeight, drag}) => {

    const [currentHeight, setCurrentHeight] = useState<number>(calculateHeightInPixels(todo.dateStart, todo.dateEnd));  
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
        if(drag.status) setPointerEvents(false);
        else setPointerEvents(true);
    }, [drag]);

    const handleDragStart = (e:React.DragEvent) => {
        drag.setDragStatus({todo, dragAction: TodoDragActions.move});
        e.dataTransfer.setDragImage(e.currentTarget, e.clientX - e.currentTarget.getBoundingClientRect().left, 0);
    };

    const startResizing = (e:React.MouseEvent) => {
        drag.setDragStatus({todo, dragAction: TodoDragActions.resize});
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
        height: currentHeight+`px`,
        pointerEvents: pointerEvents ? 'all' : 'none',
        zIndex: 2,
    };

    return <>
    <div
    draggable
    onDragStart={handleDragStart}
    onClick={handleMouseClick}
    style={style}>
        {todo.description}
        <ResizeHandlebar handleStartResizing={startResizing}/>
    </div>
    </>
};



export default Todo;