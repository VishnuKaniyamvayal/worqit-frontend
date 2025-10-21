import AddEmployeeForm from "./AddEmployeeForm";
import { Typography } from "antd";

const { Title } = Typography;

const Index = () => {
  return (
    <div>
      <div style={{ textAlign: "left", marginBottom: "30px", marginLeft: "50px" }}>
        <Title level={3}>Add Employee</Title>
      </div>
      <AddEmployeeForm />
    </div>
  );
};

export default Index;