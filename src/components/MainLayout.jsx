import { Layout, theme } from "antd";
import NavBar from "./NavBar";
import TopHeader from "./TopHeader/TopHeader";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const { token } = theme.useToken();
  const { colorBgContainer, borderRadiusLG } = token;

  return (
    <Layout hasSider>
      <NavBar />
      <Layout>
        <TopHeader />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}