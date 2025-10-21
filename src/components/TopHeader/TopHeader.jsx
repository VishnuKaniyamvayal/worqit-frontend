import { Flex, theme, Tooltip } from "antd";
import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { SearchOutlined } from "@ant-design/icons";
import ProfileDropdown from "./components/ProfileDropdown";
import NotificationDropdown from "./components/NotificationDropdown";

const TopHeader = () => {
  const {
    token: { colorBgContainer, boxShadowTertiary },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: "0 24px",
        background: colorBgContainer,
        boxShadow: boxShadowTertiary,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
          Dashboard
        </Title>
        <Flex gap={20} align="center">
          <Tooltip title="Search">
            <SearchOutlined style={{ fontSize: 20, cursor: "pointer", opacity: 0.7 }} />
          </Tooltip>
          <NotificationDropdown />
          <ProfileDropdown />
        </Flex>
      </Flex>
    </Header>
  );
};

export default TopHeader;
