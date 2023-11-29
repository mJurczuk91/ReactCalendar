import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import { addXStepsToTimestamp, getTimeDiffInMinutes } from "../../calendar/utils/date-utils";
import { calendarStepInMinutes } from "../../calendar/components/calendar-dashboard";

export interface ITodo {
    id: number,
    description: string,
    dateStart: Date,
    dateEnd: Date,
}


const initialState: { list: ITodo[], idCounter: number } = { list: [], idCounter: 1 };

const TodoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        createTodo(state, action: PayloadAction<ITodo>) {
            state.list = [...state.list, {
                ...action.payload,
            }];
            state.idCounter++;
        },
        updateTodo(state, action: PayloadAction<ITodo>) {
            state.list = state.list.map(todo => {
                if (todo.id === action.payload.id) {
                    return { ...action.payload };
                } else return todo;
            })
        },
        deleteTodo(state, { payload: { id } }: PayloadAction<ITodo>) {
            state.list = state.list.filter(todo => todo.id !== id);
        },
    }
});

export const changeTodoStartDateKeepDuration = (todo:ITodo, newStartDate:Date):ITodo => {
    const durationInMinutes = getTimeDiffInMinutes(todo.dateStart.getTime(), todo.dateEnd.getTime())
    return {
        ...todo,
        dateStart: newStartDate,
        dateEnd: new Date(addXStepsToTimestamp(newStartDate.getTime(), durationInMinutes / calendarStepInMinutes)),
    }
}

export const { createTodo, updateTodo, deleteTodo } = TodoSlice.actions;
export const selectTodos = (state: RootState) => state.todoSlice;
export default TodoSlice.reducer;