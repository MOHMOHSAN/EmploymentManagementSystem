import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../../src/containers/EmployeeManager/reducer';
import EmployeeForm from '../../src/containers/EmployeeManager/EmployeeForm';
import { describe, test, expect } from 'vitest';

// Store is needed since original component is using redux reducer and nested in provider store
const store = configureStore({
    reducer: {
        employeeManager: employeeReducer,
    },
});

const renderEmployeeFormWithLocationState = (ui, { state } = {}) => {
  return render(
    <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/employee/add', state }]}>
        <Routes>
            <Route path="/employee/add" element={ui} />
        </Routes>
        </MemoryRouter>
    </Provider>
  );
}

describe('EditEmployeeForm', () => {

    test('renders pre-filled employee data from location.state', () => {
        const employeeData = {
            "id": "2",
            "first_name": "Daniella",
            "last_name": "Mackenzie",
            "email": "Daniella@example.com",
            "phone": "97243421",
            "gender": "Male",
            "dob": "1992-04-24",
            "joined_date": "2025-04-21"
        };
        renderEmployeeFormWithLocationState(<EmployeeForm />, { state: { employee: employeeData } });

        // Text fields
        expect(screen.getByLabelText(/First Name/i)).toHaveValue(employeeData.first_name);
        expect(screen.getByLabelText(/Last Name/i)).toHaveValue(employeeData.last_name);
        expect(screen.getByLabelText(/Email/i)).toHaveValue(employeeData.email);
        expect(screen.getByLabelText(/Phone/i)).toHaveValue(employeeData.phone);

        // Radio buttons
        const selected = screen.getByRole('radio', { checked: true });
        expect(selected.value).toBe(employeeData.gender);

        // DatePicker input
        const dobInput = screen.getByRole('textbox', { name: /Date of Birth/i });
        expect(dobInput).toHaveValue(employeeData.dob);

        const joinedDateInput = screen.getByRole('textbox', { name: /Joined Date/i });
        expect(joinedDateInput).toHaveValue(employeeData.joined_date);
    });
});
