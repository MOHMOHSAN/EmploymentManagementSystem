
import { Layout, Typography } from 'antd';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import EmployeeLists from './containers/EmployeeManager/EmployeeLists';
import EmployeeForm from './containers/EmployeeManager/EmployeeForm';
const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const location = useLocation();
  const isListingPage = location.pathname === '/';
  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title level={3} style={{ margin: 0 }}>Employee Directory</Title>
          {
            !isListingPage ? (<Link to="/">Back to list</Link>) : (<Link to="/employee/add">Add Employee</Link>)
          }
        </Header>
        <Content style={{ padding: '24px' }}>
          <Routes>
            <Route path="/" element={<EmployeeLists />}></Route>
            <Route path="/employee/add" element={<EmployeeForm />}></Route>
          </Routes>
        </Content>
    </Layout>
  )
}

export default App
