import { Card, Space, Typography, Popconfirm } from 'antd';
import { MailOutlined, PhoneOutlined, WomanOutlined, ManOutlined, CalendarOutlined, ScheduleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Meta } = Card;
const { Text } = Typography;

const EmployeeCard = ({ employee, handleOnDelete, handleOnEdit }) => {
  return (
    <Card
      hoverable
      style={{ width: 240, margin: '10px' }}
      title={`${employee.first_name} ${employee.last_name}`} 
      actions={[
        <EditOutlined key="edit" onClick={() => handleOnEdit(employee)} />,
        <Popconfirm 
          title="Are you sure to delete?"
          onConfirm={() => handleOnDelete(employee.id)}
        >
          <DeleteOutlined key="delete"  />
        </Popconfirm>,
      ]}
    >
      <Meta 
        description={
            <div className='description'>
                <Space direction="vertical">
                    <Text><MailOutlined /> {employee.email}</Text>
                    <Text><PhoneOutlined /> {employee.phone}</Text>
                    <Text>{employee.gender === "Female" ? <WomanOutlined /> : <ManOutlined />} { employee.gender}</Text>
                    <Text><CalendarOutlined /> {employee.dob}</Text>
                    <Text><ScheduleOutlined /> {employee.joined_date}</Text>
                </Space>
            </div>
        } />
    </Card>
  );
};

export default EmployeeCard;
