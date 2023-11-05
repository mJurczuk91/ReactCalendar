import { useState } from 'react';
import classes from './todo-droptarget.module.scss';
import useDragDrop from '../drag-drop/useDragDrop';

interface Props {
    timestamp: number;
    createTodo: (timestamp:number) => void;
    children?: React.ReactNode;
}

const TodoDroptarget:React.FC<Props> = ({timestamp, createTodo, children}) => {
    const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
    let {updateLastDraggedOver, handleDrop, currentlyDragged} = useDragDrop();

    const droppedOn = (e:React.DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        handleDrop(timestamp);
        setIsDraggedOver(false);
    }

    const handleClick = (e:React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        createTodo(timestamp);
    }

    const handleMouseOver = () => {
        if(!currentlyDragged) return;
        updateLastDraggedOver(timestamp);
        console.log('last dragged over: '+new Date(timestamp).toLocaleString());
    }

    return <div
        onDragEnter={() => { setIsDraggedOver(true) }}
        onDragLeave={() => { setIsDraggedOver(false) }}
        onDrop={droppedOn}
        //ondragover prevent default needed for ondrop to work properly (?!)
        onDragOver={(e:React.DragEvent) => {
            e.stopPropagation();
            e.preventDefault();
        }}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        className={`${classes.target} ${isDraggedOver ? classes.draggedOver : ''}`}
        >

        {children}
    </div>
}

export default TodoDroptarget;