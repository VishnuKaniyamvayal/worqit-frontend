import { Form, Input, Button, Checkbox, Typography, Card } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../providers/AuthProvider";
import IMAGE from "../../assets/9547197.jpg"
import { useNavigate } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";

const { Title, Text } = Typography;

const Login = () => {
  const { handleLogin, isLoading } = useAuth();
  const navigate = useNavigate();
  const onFinish = async (values:{email:string,password:string}) => {
   const success = await handleLogin({ email: values.email, password: values.password });
    if (success) {
      navigate("/"); // only navigate on success
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      {/* Left Side - Image */}
      <div
        style={{
          flex: 1,
          backgroundImage:
            `url('${IMAGE}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Right Side - Form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
        }}
      >
        <Card
          style={{
            width: 400,
            padding: "40px 30px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Title level={2} style={{ textAlign: "center", marginBottom: 10 }}>
            Welcome Back
          </Title>
          <Text style={{ display: "block", textAlign: "center", marginBottom: 30, color: "#888" }}>
            Please login to continue
          </Text>

          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input prefix={<TfiEmail />} placeholder="Enter your Email" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input your Password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                size="large"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 10 }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a style={{ float: "right" }} href="#">
                Forgot password?
              </a>
            </Form.Item>

            <Form.Item>
              <Button loading={isLoading} type="primary" htmlType="submit" size="large" style={{ width: "100%" }}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
