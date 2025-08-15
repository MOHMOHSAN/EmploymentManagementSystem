import { render, screen, waitFor } from '@testing-library/react';
import { test, expect, describe} from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import employeeReducer from '../../src/containers/EmployeeManager/reducer';
import employeeSaga from '../../src/containers/EmployeeManager/saga';

import EmployeeLists from '../../src/containers/EmployeeManager/EmployeeLists';

describe('EmployeeList Component', () => {

    test('renders employee list with saga and mocked API', async () => {
        const sagaMiddleware = createSagaMiddleware();

        const store = configureStore({
            reducer: { employeeManager: employeeReducer },
            middleware: (getDefault) => getDefault({ thunk: false }).concat(sagaMiddleware),
        });

        sagaMiddleware.run(employeeSaga);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <EmployeeLists />
                </MemoryRouter>
            </Provider>
        );


        // Initially, loading shows
        expect(screen.getByText(/Loading Employee List/i)).toBeInTheDocument();

        // Wait for the saga to resolve and update state
        await waitFor(() => {
            expect(screen.getByText('AliceLim Charlotte')).toBeInTheDocument();
            expect(screen.getByText('Daniella Mackenzie')).toBeInTheDocument();
        });

    });
});
