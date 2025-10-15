import { Button, Card, Divider, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { FaUserEdit } from "react-icons/fa";
import BGIMAGE from "../../../assets/9547197.jpg"

const { Text } = Typography;

const ProfileCard = () => {
  return (
    <Card
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
      }}
      bodyStyle={{ padding: 0 }}
    >
      {/* Cover Image */}
      <div
        style={{
          height: "100px",
          backgroundImage:
            `url('${BGIMAGE}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Profile Image */}
        <img
          style={{
            height: "120px",
            width: "120px",
            objectFit: "cover",
            borderRadius: "50%",
            border: "4px solid white",
            position: "absolute",
            bottom: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
          alt="profile"
        />
      </div>

      {/* Name and Edit */}
      <div style={{ padding: "70px 24px 16px", textAlign: "center" }}>
        <Title level={4} style={{ marginBottom: 4 }}>
          Amal Benny
        </Title>
        <Text type="secondary">#EMP001</Text>
        <div style={{ marginTop: 8 }}>
          <Button
            icon={<FaUserEdit />}
            style={{ borderRadius: "20px" }}
          >
            Edit
          </Button>
        </div>
      </div>

      {/* Other Details */}
      <Card bodyStyle={{ padding: "12px 24px" }} style={{ margin: "0 16px 16px" }}>
        <div style={{ marginBottom: 8 }}>
          <Text type="secondary">Designation</Text>
          <div>
            <Text>Senior Developer</Text>
          </div>
        </div>
        <Divider style={{ margin: "8px 0" }} />
        <div style={{ marginBottom: 8 }}>
          <Text type="secondary">Email</Text>
          <div>
            <Text>sample@company.com</Text>
          </div>
        </div>
        <Divider style={{ margin: "8px 0" }} />
        <div>
          <Text type="secondary">Phone</Text>
          <div>
            <Text>+91 9876543210</Text>
          </div>
        </div>
      </Card>
    </Card>
  );
};

export default ProfileCard;
