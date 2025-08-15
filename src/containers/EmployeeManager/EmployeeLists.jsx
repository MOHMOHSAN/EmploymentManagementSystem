/**
 *
 * EmployeeManager
 *
 */
import {useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spin, Alert, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { injectReducer, injectSaga } from '../../configuration/store';
import  employeesReducer  from './reducer';
import  employeesSaga from './saga';
import { makeSelectEmployeeLists } from './selectors';
import { deleteEmployee, fetchAllEmployees } from './actions';
import EmployeeCard from './components/EmployeeCard';

const key = 'employeeManager';

function EmployeeLists({ employeesList, fetchAllEmployees, deleteEmployee }){
    const navigate = useNavigate();
    useEffect(() => {
        injectReducer(key, employeesReducer);
        injectSaga(key, employeesSaga);
    }, []);


    useEffect(() => {
        fetchAllEmployees();
    }, [fetchAllEmployees]);

    const { isLoading, isError, data } = employeesList;
    if (isLoading) return <Spin>Loading Employee List</Spin>
    if (isError) return <Alert message="Employee Listing is having error" description={isError} type="error" showIcon />;

    const handleOnDelete = (id) => {
        deleteEmployee(id);
    }


    const handleOnEdit = (employee) => {
        navigate('/employee/add', { state: { employee } });
    };

    return (
        <div>
            <Row gutter={[16, 16]}>
            {
                data.map((employee) => 
                    <Col key={employee.id}>
                        <EmployeeCard employee={employee} handleOnDelete={handleOnDelete} handleOnEdit={handleOnEdit} />
                    </Col>
                )
            }
            </Row>
        </div>
    );
}

// Map state from Redux to props
const mapStateToProps = createStructuredSelector({
    employeesList: makeSelectEmployeeLists()
});

// Map dispatch functions to props
const mapDispatchToProps = (dispatch) => ({
  fetchAllEmployees: () => dispatch(fetchAllEmployees()),
  deleteEmployee: (id) => dispatch(deleteEmployee(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeLists);