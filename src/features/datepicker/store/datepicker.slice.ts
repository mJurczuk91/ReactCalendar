import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";

export interface ISetDate {
    day: number,
    month: number,
    year: number,
}

export interface IDateSlice {
    viewMonth: number,
    viewYear: number,
    pickedDay: number,
    pickedMonth: number,
    pickedYear: number,
};

let currentDate = new Date();
const initialState: IDateSlice = {
    viewMonth: currentDate.getMonth(),
    viewYear: currentDate.getFullYear(),
    pickedDay: currentDate.getDate(),
    pickedMonth: currentDate.getMonth(),
    pickedYear: currentDate.getFullYear(),
};

const DatepickerSlice = createSlice({
    name: "datepickerSlice",
    initialState,
    reducers: {
        setNextViewMonth(state) {
            if (state.viewMonth === 11) {
                state.viewMonth = 0;
                state.viewYear++;
            } else {
                state.viewMonth++;
            }
        },
        setPreviousViewMonth(state) {
            if (state.viewMonth === 0) {
                state.viewMonth = 11;
                state.viewYear--;
            } else {
                state.viewMonth--;
            }
        },
        setDate(state, {payload: {day, month, year}}: PayloadAction<ISetDate>) {
            state.pickedDay = day;
            state.pickedMonth = month;
            state.pickedYear = year;

            if(state.viewMonth !== month) state.viewMonth = month;
            if(state.viewYear !== year) state.viewYear = year;
        },
    }
});

export const { setDate, setNextViewMonth, setPreviousViewMonth } = DatepickerSlice.actions;
export const selectPickedDate = (state: RootState) => state.datepickerSlice;
export default DatepickerSlice.reducer;