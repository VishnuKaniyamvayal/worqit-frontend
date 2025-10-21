import { Flex, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState, useContext } from "react";
import LOGO from "../assets/worqit-logo.png";
import {
  EyeOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  PieChartOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
};

const UserContext = React.createContext({ role: "admin" }); // Replace later

const MENU_CONFIG = [
  {
    key: "/",
    label: "Dashboard",
    icon: <PieChartOutlined />,
    roles: ["admin", "recruiter", "employee"],
  },
  {
    key: "recruiting",
    label: "Recruiting",
    icon: <HiMagnifyingGlassPlus />,
    roles: ["admin", "recruiter"],
    children: [
      { key: "/jobpostings", label: "Job Postings", icon: <FileTextOutlined />, roles: ["admin", "recruiter"] },
      { key: "/applications", label: "Applications", icon: <FileDoneOutlined />, roles: ["admin", "recruiter"] },
    ],
  },
  {
    key: "employees",
    label: "Employees",
    icon: <FiUsers />,
    roles: ["admin", "hr"],
    children: [
      { key: "/add-employee", label: "Add Employee", icon: <UserAddOutlined />, roles: ["admin", "hr"] },
      { key: "/view-employees", label: "View Employees", icon: <EyeOutlined />, roles: ["admin", "hr", "recruiter"] },
    ],
  },
  {
    key: "/profile",
    label: "Profile",
    icon: <CgProfile />,
    roles: ["admin", "employee", "hr", "recruiter"],
  },
  {
    key: "/settings",
    label: "Settings",
    icon: <SettingOutlined />,
    roles: ["admin"],
  },
];

const filterMenuByRole = (items, role) => {
  return items
    .filter((item) => item.roles.includes(role))
    .map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      return {
        key: item.key,
        icon: item.icon,
        label: hasChildren ? item.label : <Link to={item.key}>{item.label}</Link>,
        children: hasChildren ? filterMenuByRole(item.children, role) : undefined,
      };
    });
};

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { role } = useContext(UserContext);

  const filteredMenu = filterMenuByRole(MENU_CONFIG, role);

  return (
    <Sider
      style={siderStyle}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Flex align="center" justify="center" style={{ padding: "16px 0" }}>
        <img style={{ width: "60px" }} src={LOGO} alt="LOGO" />
      </Flex>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={["recruiting", "employees"]}
        items={filteredMenu}
      />
    </Sider>
  );
};

export default NavBar;
