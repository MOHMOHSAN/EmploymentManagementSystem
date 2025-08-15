import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the employeeManager state domain
*/

export const selectEmployeeManagerDataDomain = (state) => state.employeeManager || initialState;

/**
 * Other specific selectors
**/

const makeSelectEmployeeLists = () =>
  createSelector(
    selectEmployeeManagerDataDomain,
    substate => substate?.get('employeeLists')?.toJS() || { data: [], isLoading: false, error: null }
  );


const makeSelectEmployeeFormStatus = () =>
  createSelector(selectEmployeeManagerDataDomain, (substate) =>
    substate.getIn(['employeeLists', 'employeeFormStatus'])
  );

export {
  makeSelectEmployeeLists,
  makeSelectEmployeeFormStatus
}