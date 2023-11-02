import { useEffect, useRef, useState } from "react";
//import classes from "./todo.module.scss";
import { ITodo } from "../store/todo-slice";
import Resizer from "./resizer";
import useDragDrop, {dragActions} from "../drag-drop/useDragDrop";
import { calendarStepInMinutes, getTimeDiffInMinutes } from "../../calendar/utils/calendar-utils";

interface Props {
    todo: ITodo,
    saveTodo: () => void,
}

let resizeStartY:number|null = null;

const Todo:React.FC<Props> = ({todo, saveTodo}, ) => {
    const [isResizing, setIsResizing] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const {startDrag, stopDrag} = useDragDrop();

    let verticalSizeMultiplier = 1;
    useEffect(() => {
        verticalSizeMultiplier = getTimeDiffInMinutes(todo.dateEnd, todo.dateStart) / calendarStepInMinutes;
    }, [todo]);
    console.log('size = ', verticalSizeMultiplier);

    const dragStartHandler = (e:React.DragEvent) => {
        startDrag({id: todo.id, action: dragActions.changeStartDate});
        e.dataTransfer.setDragImage(e.currentTarget, e.clientX - e.currentTarget.getBoundingClientRect().left, 0);
    };

    const handleMouseDown = (e:React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        resizeStartY = e.clientY;
        setIsResizing(true);
    }

    const handleMouseUp = (e:React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        resizeStartY = null;
        setIsResizing(false);
    }

    const handleMouseClick = (e:React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleResize = (e:React.MouseEvent) => {
/*         e.preventDefault();
        if(!isResizing) return;
        console.log('resizing true');
        if(ref.current === null) return;
        console.log('ref.current not nsetVerticalSizeMultiplier(sizeMultiplier);ull');
        if(resizeStartY === null) return;
        console.log('resizeStartY not null');
        console.log(resizeStartY);
        console.log(e.clientY);
        ref.current.style.height = `${resizeStartY + e.clientY}px`; */
    }

    let style:React.CSSProperties = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'red',
        height: ``+(3*verticalSizeMultiplier - 0.3)+`em`,
        minWidth: '95%',
        zIndex: 2
    };

    return <>
    <div //className={classes.todo}
    draggable
    onDragStart={dragStartHandler}
    onClick={handleMouseClick}
    style={style}
    ref={ref}
    >
        <Resizer onResize={handleResize} handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp}/>
        {todo.description}
        <Resizer onResize={handleResize} handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp}/>
    </div>
    </>
};



export default Todo;