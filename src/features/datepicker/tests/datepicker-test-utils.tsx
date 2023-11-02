import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import datepickerSlice from '../store/datepicker.slice';
import Datepicker from '..';

export const renderDatepicker = () => {
    const store = configureStore({
        reducer: {
            datepickerSlice,
        }
    });
    
    render(<Provider store={store}>
        <Datepicker />
    </Provider>);
}