/*
 *
 * EmployeeManager actions
 *
 */

import {
    FETCH_EMPLOYEES,
    FETCH_EMPLOYEES_SUCCESS,
    FETCH_EMPLOYEES_FAILURE,
    RESET_EMPLOYEE_FORM_STATUS,
    ADD_EMPLOYEE_REQUEST,
    EDIT_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_REQUEST

} from './constants';

export function fetchAllEmployees() {
    return { type: FETCH_EMPLOYEES }
}

export function fetchAllEmployeesSuccess(data){
    return { type: FETCH_EMPLOYEES_SUCCESS, data}
}

export function fetchAllEmployeeFailure(err){
    return { type: FETCH_EMPLOYEES_FAILURE, err}
}

export const resetEmployeeFormStatus = () => ({
  type: RESET_EMPLOYEE_FORM_STATUS,
});

export function addEmployee(formData){
    return { type: ADD_EMPLOYEE_REQUEST, formData};
}

export function editEmployee(employeeId, formData){
    return { type: EDIT_EMPLOYEE_REQUEST, payload: { employeeId, formData }}
}

export function deleteEmployee(employeeId) {
    return { type: DELETE_EMPLOYEE_REQUEST, employeeId };
}
