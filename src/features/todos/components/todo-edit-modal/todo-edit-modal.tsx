import { ITodo } from "../../store/todo-slice";
import classes from "./todo-edit-modal.module.scss"
import DateInput from "./components/date-input";
import StartHourInput from "./components/start-hour-input";
import EndHourInput from "./components/end-hour-input";

interface Props {
    saveTodo: (todo: ITodo) => void;
    cancelEditingTodo: () => void,
}


const TodoEditModal: React.FC<Props> = ({ saveTodo, cancelEditingTodo }) => {
    return <div className={classes.modal}>
        <DateInput />
        <StartHourInput />
        <EndHourInput />
    </div>
}
export default TodoEditModal;