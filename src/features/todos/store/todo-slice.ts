import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";

export interface ITodo {
    id?: number,
    description: string,
    dateStart: number,
    dateEnd: number,
}


const initialState: { list: ITodo[], counter: number } = { list: [], counter: 1 };

const TodoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        createTodo(state, action: PayloadAction<ITodo>) {
            state.list = [...state.list, {
                ...action.payload,
                id: state.counter,
            }];
            state.counter++;
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

export const { createTodo, updateTodo, deleteTodo } = TodoSlice.actions;
export const selectTodos = (state: RootState) => state.todoSlice;
export default TodoSlice.reducer;