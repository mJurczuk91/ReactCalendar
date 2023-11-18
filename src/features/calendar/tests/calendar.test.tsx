import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getMonthNameInPolish } from '../utils/date-utils';
import datepickerSlice from '../../datepicker/store/datepicker.slice';
import Calendar from '..';
import { createIntervalTimestamps } from "../utils/date-utils";

describe('CALENDAR TESTS', () => {
    test("it renders a 15min interval hour list", () => { 
        renderCalendar();
        expect(screen.queryAllByText("00:00").length).toEqual(2);
        expect(screen.getByText("23:45")).toBeInTheDocument();
    });

    test("by default it renders current year, day of the month and month name", () => {
        renderCalendar();
        const date = new Date();
        expect(screen.getByText(date.getDate().toString())).toBeInTheDocument();
        expect(screen.getByText(getMonthNameInPolish(date.getMonth()).slice(0,3))).toBeInTheDocument();
        expect(screen.getByText(date.getFullYear().toString())).toBeInTheDocument();
    });
});

const renderCalendar = () => {
    const store = configureStore({
        reducer: {
            datepickerSlice,
        }
    });
    
    render(<Provider store={store}>
        <Calendar />
    </Provider>);
}