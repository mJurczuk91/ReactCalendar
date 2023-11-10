import { useState } from 'react';
import classes from './todo-droptarget.module.scss';
import { ITodo } from '../store/todo-slice';
import { ITodoDrag } from './todo';
import { TodoDragActions } from './todo';

interface Props {
    timestamp: number;
    createTodo: (timestamp:number) => void,
    saveTodo: (todo:ITodo) => void,
    moveTodo: (todo: ITodo, newStartDate:number) => void,
    drag: {status:ITodoDrag|null, setDragStatus:React.Dispatch<React.SetStateAction<ITodoDrag|null>>},
    children?: React.ReactNode,
}

const TodoDroptarget:React.FC<Props> = ({timestamp, createTodo, children, saveTodo, moveTodo, drag}) => {
    const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

    const handleDragEnter = () => {
        setIsDraggedOver(true);
        if(drag.status?.dragAction === TodoDragActions.resize) saveTodo({...drag.status.todo, dateEnd: timestamp});
    }

    const handleDragLeave = () => {
        setIsDraggedOver(false);
    }

    const handleClick = (e:React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        createTodo(timestamp);
    }

    const handleDrop = (e:React.DragEvent) => {
        setIsDraggedOver(false);
        if(drag.status?.dragAction === TodoDragActions.move) moveTodo(drag.status.todo, timestamp)
        drag.setDragStatus(null);
    }


    return <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        //ondragover prevent default needed for ondrop to work properly (?!)
        onDragOver={(e:React.DragEvent) => {
            e.stopPropagation();
            e.preventDefault();
        }}
        onClick={handleClick}
        className={`${classes.target} ${isDraggedOver ? classes.draggedOver : ''}`}
        >

        {children}
    </div>
}

export default TodoDroptarget;