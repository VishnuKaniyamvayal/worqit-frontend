import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function PermissionDenied() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #f9f9f9 0%, #e6f7ff 100%)",
      }}
    >
      <Result
        status="403"
        title="Permission Denied"
        subTitle="Sorry, you are not authorized to access this page."
        extra={[
          <Button type="primary" key="back" onClick={() => navigate("/")}>
            Go Home
          </Button>,
          <Button key="login" onClick={() => navigate("/login")}>
            Login Again
          </Button>,
        ]}
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
}
