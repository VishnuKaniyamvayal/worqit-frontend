// ProfileDropdown.tsx
import avatarImage from "../../../assets/avatar-placeholder.avif";
import { Avatar, Dropdown, Flex } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../../providers/AuthProvider";

const ProfileDropdown = () => {
  const { handleLogout } = useAuth();

  const items = [
    {
      key: "1",
      label: "My Profile",
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];

  const onClick = ({ key }) => {
    if (key === "2") handleLogout();
  };

  return (
    <Flex>
      <Dropdown menu={{ items, onClick }} trigger={["click"]}>
        <Avatar
          size={45}
          style={{ cursor: "pointer" }}
          src={<img draggable={false} src={avatarImage} alt="avatar" />}
        />
      </Dropdown>
    </Flex>
  );
};

export default ProfileDropdown;
