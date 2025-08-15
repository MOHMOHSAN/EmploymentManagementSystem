import { useEffect, useState } from 'react';
import { Form, Input, Button, Spin, Radio, DatePicker, Alert } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
// import { BlockerFunction, useBlocker } from "react-router";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import dayjs from 'dayjs';
import { makeSelectEmployeeFormStatus } from './selectors';
import { addEmployee, editEmployee ,resetEmployeeFormStatus } from './actions';
import useCustomBlocker from './components/Blocker';


const formItemLayout = {
  labelCol: {
    xs: { span: 10 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 14 },
  },
}; 

//accept at least 1 letter apart from space and @ for firstpart before @
//same logic applied before dot and after dot
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//accept first digit only 6,8,9 then any random 7 number behind
const sgPhoneRegex = /^(6|8|9)\d{7}$/;

const EmployeeForm = ({ addEmployee, editEmployee, formStatus, resetFormStatus}) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    

    // For existing Employee
    const [isDirty, setIsDirty] = useState(false);
    const location = useLocation();
    const employee = location.state?.employee;

    //https://codesandbox.io/p/sandbox/8qsxq5?file=%2Fdemo.tsx
    //Custom Validations
    const validateName = (_, value) =>
        value && value.length >= 6 && value.length <= 10 ? Promise.resolve() : Promise.reject(new Error('must be between 6 and 10 characters'));

    const validateEmail = (_, value) =>
        emailRegex.test(value) ? Promise.resolve() : Promise.reject(new Error("must be valid email format"));

    const validateSingaporePhone = (_, value) =>
        sgPhoneRegex.test(value) ? Promise.resolve() : Promise.reject(new Error("must be valid singapore phone number"));
    
    const validateJoinedDate = (form) => (_, value) => {
        const dob = form.getFieldValue('dob');
        if (!dob || !value) return Promise.resolve();
        if (value.isAfter(dob)) return Promise.resolve();
        return Promise.reject(new Error('Joined date must be after date of birth'));
    }

    const handleSubmit = (fieldValues) => {
        const formData = {
            ...fieldValues,
            dob: fieldValues.dob.format('YYYY-MM-DD'),
            joined_date: fieldValues.joined_date.format('YYYY-MM-DD'),
        };

        if (employee) {
            setIsDirty(false);
            editEmployee(employee.id, formData);
        } else {
            addEmployee(formData);  
        }
        
    }


    useEffect(() => {
        if(employee) {
            form.setFieldsValue({
                ...employee,
                dob: employee.dob ? dayjs(employee.dob) : null,
                joined_date: employee.joined_date
                        ? dayjs(employee.joined_date)
                        : null,
            });
        }

        if(formStatus === "success") {
            navigate('/');
            resetFormStatus();
        }


    }, [employee, form, formStatus, navigate, resetFormStatus]);

   
    
    // Update dirty state whenever form values change only in Edit form scenarios
    const formValues = Form.useWatch([], form);
    useEffect(() => {
        if (!formValues || !employee) return;
        const formattedFormValues = {
            ...formValues,
            dob: formValues.dob?.format('YYYY-MM-DD') || null,
            joined_date: formValues.joined_date?.format('YYYY-MM-DD') || null,
        };

        const dirty = Object.keys(formValues).some(
            (key) => formattedFormValues[key] !== employee[key]
        );
        setIsDirty(dirty);
    }, [employee, formValues]);
    // console.log("isDirty", isDirty);
    useCustomBlocker(isDirty);

    return (
        <Form
            form={form}
            layout="vertical"
            {...formItemLayout}
            onFinish={handleSubmit}
        >

            {formStatus === 'loading' && (
                <Alert
                    message={
                        <span>
                            <Spin size="small" style={{ marginRight: 8 }} />Saving employee...
                        </span>
                    }
                    type="error"
                    showIcon
                    style={{ marginBottom: '16px' }}
                />
            )}

            {formStatus === 'fail' && (
                <Alert
                    message="Failed to add employee. Please try again."
                    type="error"
                    showIcon
                    style={{ marginBottom: '16px' }}
                />
            )}

            <Form.Item label="First Name" name="first_name" 
                rules={[
                    { required: true, message: 'Please enter first name' },
                    { validator: validateName }
                ]}>
                <Input placeholder='Enter your first name'/>
            </Form.Item>

            <Form.Item label="Last Name" name="last_name" 
                rules={[
                    { required: true, message: 'Please enter last name' },
                    { validator: validateName }]}>
                <Input placeholder='Enter your last name'/>
            </Form.Item>

            <Form.Item label="Email" name="email" 
                rules={[
                    { required: true, message: 'Please enter email' },
                    { validator: validateEmail }]}>
                <Input placeholder='Enter your email' />
            </Form.Item>

            <Form.Item label="Phone" name="phone" 
                rules={[
                    { required: true, message: 'Please enter phone' },
                    { validator: validateSingaporePhone }]}>
                <Input prefix="+65" placeholder='Enter your phone number' />
            </Form.Item>

            <Form.Item label="Gender" name="gender"
                rules={[{ required: true, message: 'Please select a gender' }]}
            >
                <Radio.Group>
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                </Radio.Group>
            </Form.Item>


            <Form.Item label="Date of Birth" name="dob"
                rules={[{ required: true, message: 'Please select birth date' }]}
            >
                <DatePicker format="YYYY-MM-DD"/>
            </Form.Item>

            
            <Form.Item label="Joined Date" name="joined_date"
                rules={[
                    { required: true, message: 'Please select joined date' },
                    { validator: validateJoinedDate(form) }
                ]}
            >
                <DatePicker />
            </Form.Item>


            <Form.Item>
            <Button type="primary" htmlType="submit">
                {employee ? 'Update' : 'Add'} Employee
            </Button>
            </Form.Item>
        </Form>
    );
};

// Map state from Redux to props
const mapStateToProps = createStructuredSelector({
    formStatus: makeSelectEmployeeFormStatus(),
});

const mapDispatchToProps = (dispatch) => ({
    resetFormStatus: () => dispatch(resetEmployeeFormStatus()),
    addEmployee: (data) => dispatch(addEmployee(data)),
    editEmployee: (employeeId, formData) => dispatch(editEmployee(employeeId, formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
