import { useState } from "react";

import classes from "./todo-edit-modal.module.scss"
import { ITodo } from "../store/todo-slice";

interface Props {
    todo: ITodo;
    saveTodo: (todo: ITodo) => void;
}


const TodoEditModal: React.FC<Props> = ({ todo, saveTodo }) => {
    const [description, setDescription] = useState<string>(todo.description);

    return <>
        <div 
        className={classes.modal}
        onClick={(e:React.MouseEvent) => { e.stopPropagation() }}>
            <form onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                saveTodo({...todo, description: description});
            }}>
                <label htmlFor="task-description">Task Description: </label>
                <input
                    autoFocus
                    id="task-description"
                    type="text"
                    placeholder="description"
                    onChange={(e) => { setDescription(e.currentTarget.value); }}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    </>

}

export default TodoEditModal;