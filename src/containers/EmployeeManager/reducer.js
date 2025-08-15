/*
 *
 * EmployeeManager reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
    FETCH_EMPLOYEES,
    FETCH_EMPLOYEES_SUCCESS,
    FETCH_EMPLOYEES_FAILURE,
    RESET_EMPLOYEE_FORM_STATUS,
    ADD_EMPLOYEE_REQUEST,
    ADD_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_FAILURE,
    EDIT_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_SUCCESS,
} from './constants';

export const initialState = fromJS({
    employeeLists: {
        isLoading: true,
        isError: false,
        data: [],
        employeeFormStatus: "",
    }
});

function employeesReducer(state=initialState, action){
    switch (action.type){
        case FETCH_EMPLOYEES:
            return state
                .setIn(['employeeLists', 'isLoading'], true)
                .setIn(['employeeLists', 'isError'], false)
                .setIn(['employeeLists', 'data'], action.formData);
        case FETCH_EMPLOYEES_SUCCESS: {
            return state
                .setIn(['employeeLists', 'isLoading'], false)
                .setIn(['employeeLists', 'isError'], false)
                .setIn(['employeeLists', 'data'], fromJS(action.data));
        }
        case FETCH_EMPLOYEES_FAILURE:
            return state
                .setIn(['employeeLists', 'isLoading'], false)
                .setIn(['employeeLists', 'isError'], true)
                .setIn(['employeeLists', 'data'], action.data);
        case RESET_EMPLOYEE_FORM_STATUS:
            return state.setIn(['employeeLists', 'employeeFormStatus'], "");

        case ADD_EMPLOYEE_REQUEST: {
            return state
                .setIn(['employeeLists', 'employeeFormStatus'], "loading");
        }

        case ADD_EMPLOYEE_SUCCESS: {
            return state
                .updateIn(['employeeLists', 'data'], (list) =>
                    list.push(Map(action.formData))
                )
                .setIn(['employeeLists', 'employeeFormStatus'], "success")
        }

        case ADD_EMPLOYEE_FAILURE: 
            return state
                .setIn(['employeeLists', 'employeeFormStatus'], "fail")
                .setIn(['employeeLists', 'data'], []);
        


        case EDIT_EMPLOYEE_SUCCESS:
        //console.log("Update success", action);
        const updatedEmployee = fromJS(action.formData);
        const index = state
            .getIn(['employeeLists', 'data'])
            .findIndex((emp) => emp.get('id') === updatedEmployee.get('id'));
        return state
            .updateIn(['employeeLists', 'data'], (list) =>
            list.set(index, updatedEmployee)
            )
            .setIn(['employeeLists', 'employeeFormStatus'], 'success');


        case DELETE_EMPLOYEE_SUCCESS: {
            const currEmployeeArr = state.getIn(['employeeLists', 'data']);
            const updatedEmployeeArr = currEmployeeArr.filter(emp => emp.get('id') !== action.employeeId);
            return state.setIn(['employeeLists', 'data'], updatedEmployeeArr);
        }

        default:
            return state;

    }
}

export default employeesReducer;