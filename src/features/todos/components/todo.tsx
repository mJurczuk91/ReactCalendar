import { useEffect, useState } from "react";
import { ITodo } from "../store/todo-slice";
import ResizeHandlebar from "./resize-handlebar";
import { getTimeDiffInMinutes } from "../../calendar/utils/date-utils";
import { calendarStepInMinutes } from "../../calendar/components/calendar-dashboard";

interface Props {
    todo: ITodo,
    calendarFieldHeight: number,
    todosInLine: number,
    placeInLine: number,
    drag: { status: ITodoDrag | null, setTodoDragStatus: React.Dispatch<React.SetStateAction<ITodoDrag | null>> }
}

export enum TodoDragActions {
    move,
    resize,
}

export interface ITodoDrag {
    todo: ITodo,
    dragAction: TodoDragActions,
}

const Todo: React.FC<Props> = ({ todo, calendarFieldHeight, drag, todosInLine, placeInLine}) => {

    const [currentHeight, setCurrentHeight] = useState<number>(calculateHeightInPixels(todo.dateStart, todo.dateEnd));
    const [pointerEvents, setPointerEvents] = useState<boolean>(true);

    useEffect(() => {
        setCurrentHeight(calculateHeightInPixels(todo.dateStart, todo.dateEnd));
    }, [todo, calculateHeightInPixels])

    useEffect(() => {
        if (drag.status) setPointerEvents(false);
        else setPointerEvents(true);
    }, [drag]);

    const handleDragStart = (e: React.DragEvent) => {
        drag.setTodoDragStatus({ todo, dragAction: TodoDragActions.move });
        e.dataTransfer.setDragImage(e.currentTarget, e.clientX - e.currentTarget.getBoundingClientRect().left, 0);
    };

    const startResizing = (e: React.MouseEvent) => {
        drag.setTodoDragStatus({ todo, dragAction: TodoDragActions.resize });
    }

    const handleMouseClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    function calculateHeightInPixels(dateStart: number, dateEnd: number) {
        return getTimeDiffInMinutes(dateStart, dateEnd) / calendarStepInMinutes * calendarFieldHeight;
    }

    let style: React.CSSProperties = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'red',
        minWidth: '95%',
        left: 100 / todosInLine * placeInLine +'%',
        height: currentHeight + `px`,
        pointerEvents: pointerEvents ? 'all' : 'none',
        border: '1px solid white',
    };

    return <>
        <div
            draggable
            onDragStart={handleDragStart}
            onClick={handleMouseClick}
            style={style}>
            <div></div>
            {todo.description}
            <ResizeHandlebar handleStartResizing={startResizing} />
        </div>
    </>
};

export default Todo;