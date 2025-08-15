import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
    ADD_EMPLOYEE_REQUEST,
    ADD_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_FAILURE,
    EDIT_EMPLOYEE_REQUEST,
    EDIT_EMPLOYEE_SUCCESS,
    EDIT_EMPLOYEE_FAILURE,
    DELETE_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_FAILURE,
    FETCH_EMPLOYEES,
} from './constants';

import {
    fetchAllEmployeesSuccess,
    fetchAllEmployeeFailure
} from './actions';

import axiosInstance from '../../utils/axiosInstance';

const request_endpoint = '/employees';

function* fetchAllEmployeesSaga() {
  try {
    const response = yield call(axiosInstance.get,request_endpoint);
    yield put(fetchAllEmployeesSuccess(response.data));
  } catch (error) {
    yield put(fetchAllEmployeeFailure(error.message));
  }
}

function* addEmployeeSaga(action) {
  try {
    const res = yield call(axiosInstance.post,request_endpoint, action.formData);
    yield put({ type: ADD_EMPLOYEE_SUCCESS, formData: res.data.data });
  } catch (err) {
    console.log(err);
    yield put({ type: ADD_EMPLOYEE_FAILURE, error: err.message });
  }
}


function* editEmployeeSaga(action) {
  try {
    const { employeeId, formData } = action.payload;
    const res = yield call( axiosInstance.put,`${request_endpoint}/${employeeId}`,formData);
    yield put({ type: EDIT_EMPLOYEE_SUCCESS, formData: res.data });
  } catch (err) {
    yield put({ type: EDIT_EMPLOYEE_FAILURE, error: err.message });
  }
}



function* deleteEmployeeSaga(action) {
  const { employeeId } = action;
  try {
     yield call(axiosInstance.delete, `${request_endpoint}/${employeeId}`);
    yield put({ type: DELETE_EMPLOYEE_SUCCESS, employeeId });
  } catch (err) {
    yield put({ type: DELETE_EMPLOYEE_FAILURE, error: err.message });
  }
}







export default function* employeeSaga() {
  yield takeLatest(FETCH_EMPLOYEES, fetchAllEmployeesSaga);
  yield takeLatest(ADD_EMPLOYEE_REQUEST, addEmployeeSaga);
  yield takeLatest(EDIT_EMPLOYEE_REQUEST, editEmployeeSaga);  
  yield takeLatest(DELETE_EMPLOYEE_REQUEST, deleteEmployeeSaga);
}