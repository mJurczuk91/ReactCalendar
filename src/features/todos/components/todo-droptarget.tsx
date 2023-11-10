import { useState } from 'react';
import classes from './todo-droptarget.module.scss';
import useDragDrop from '../drag-drop/useDragDrop';
import { dragActions } from '../drag-drop/useDragDrop';
import { ITodo } from '../store/todo-slice';

interface Props {
    timestamp: number;
    createTodo: (timestamp:number) => void;
    saveTodo: (todo:ITodo) => void;
    children?: React.ReactNode;
}

const TodoDroptarget:React.FC<Props> = ({timestamp, createTodo, children, saveTodo}) => {
    const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
    let {updateLastDraggedOver, handleDrop, currentlyDragged} = useDragDrop();

    const droppedOn = (e:React.DragEvent) => {

    }

    const handleDragEnter = () => {
        setIsDraggedOver(true);
        if(currentlyDragged?.action === dragActions.changeEndDate) saveTodo({...currentlyDragged.todo, dateEnd: timestamp});
    }

    const handleDragLeave = () => {
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
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={(e:React.DragEvent) => {
            e.stopPropagation();
            e.preventDefault();
            handleDrop(timestamp);
            setIsDraggedOver(false);
        }}
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