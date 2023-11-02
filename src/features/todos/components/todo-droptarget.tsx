import { useState } from 'react';
import classes from './todo-droptarget.module.scss';
import useDragDrop from '../drag-drop/useDragDrop';

interface Props {
    timestamp: number;
    editTodo: (timestamp:number) => void;
    children?: React.ReactNode;
}

const TodoDroptarget:React.FC<Props> = ({timestamp, editTodo, children}) => {
    const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
    const {handleDrop} = useDragDrop();

    const handleDragOver = (e:React.DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const droppedOn = (e:React.DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        handleDrop(timestamp);
        setIsDraggedOver(false);
    }

    const handleClick = (e:React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        editTodo(timestamp);
        console.log('clicked on droptarget');
    }

    return <div
        onDragEnter={() => { setIsDraggedOver(true) }}
        onDragExit={() => { setIsDraggedOver(false) }}
        onDragOver={handleDragOver}
        onDrop={droppedOn}
        onClick={handleClick}
        className={`${classes.target} ${isDraggedOver ? classes.draggedOver : ''}`}
        >

        {children}
    </div>
}

export default TodoDroptarget;