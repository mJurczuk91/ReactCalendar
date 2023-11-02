import { screen } from '@testing-library/react';
import { renderDatepicker } from './datepicker-test-utils';
import { getMonthNameInPolish, getLastDayOfMonth } from '../../calendar/utils/date-utils';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe("DATEPICKER_TESTS", () => {
    test('it renders current month name in polish', () => {
        renderDatepicker();
        const month = getMonthNameInPolish(new Date().getMonth());
        expect(screen.queryByText(month)).toBeInTheDocument();
    });

    test('it renders all the days of the month', () => {
        renderDatepicker();
        const day = getLastDayOfMonth(new Date().getMonth(), new Date().getFullYear());
        for(let i = 1; i <= day; i++){
            let elements = screen.getAllByText(i.toString());
            expect(elements.length).toBeGreaterThan(0);
        };
    });

    test("it renders currently viewed year", () => {
        renderDatepicker();
        const year = new Date().getFullYear();
        expect(screen.getByText(year.toString())).toBeInTheDocument();
    });

    test("it renders select previous and select next month buttons", () => {
        renderDatepicker();
        const buttons = ['<', '>'];
        buttons.map((button) => {
            expect(screen.getByRole('button', {name: button})).toBeInTheDocument();
        });
    });

    test('clicking < button displays previous month', () => {
        renderDatepicker();
        const button = screen.getByRole("button", {name: '<'});
        const currentMonth = new Date();
        const previousMonth = new Date();
        previousMonth.setMonth(currentMonth.getMonth() - 1)

        act(() => {
            userEvent.click(button);
        });

        expect(screen.queryByText(getMonthNameInPolish(currentMonth.getMonth()))).not.toBeInTheDocument();
        expect(screen.getByText(getMonthNameInPolish(previousMonth.getMonth()))).toBeInTheDocument();
    });

    test('clicking > button displays next month', () => {
        renderDatepicker();
        const button = screen.getByRole("button", {name: '>'});
        const currentMonth = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(currentMonth.getMonth() + 1)

        act(() => {
            userEvent.click(button);
        });

        expect(screen.queryByText(getMonthNameInPolish(currentMonth.getMonth()))).not.toBeInTheDocument();
        expect(screen.getByText(getMonthNameInPolish(nextMonth.getMonth()))).toBeInTheDocument();
    });
})