import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";

export interface IDateSlice {
    day: number,
    month: number,
    year: number,
};

let currentDate = new Date();
const initialState: IDateSlice = {
    day: currentDate.getDate(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
};

const DatepickerSlice = createSlice({
    name: "datepickerSlice",
    initialState,
    reducers: {
            setDate(state, {payload: {day, month, year}}: PayloadAction<IDateSlice>) {
            state.day = day;
            state.month = month;
            state.year = year;

/*             if(state.viewMonth !== month) state.viewMonth = month;
            if(state.viewYear !== year) state.viewYear = year; */
        },
    }
});

export const { setDate } = DatepickerSlice.actions;
export const selectPickedDate = (state: RootState) => state.datepickerSlice;
export default DatepickerSlice.reducer;