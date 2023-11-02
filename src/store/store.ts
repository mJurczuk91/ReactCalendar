import { configureStore } from '@reduxjs/toolkit';
import datepickerSlice from '../features/datepicker/store/datepicker.slice';
import todoSlice from '../features/todos/store/todo-slice';

const store = configureStore({
    reducer: {
        datepickerSlice,
        todoSlice,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;