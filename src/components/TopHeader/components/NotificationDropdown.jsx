import { Badge, Dropdown, List, Typography } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useState } from "react";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New leave request from Rahul", time: "2m ago", read: false },
    { id: 2, message: "Salary processed for January", time: "1h ago", read: true },
    { id: 3, message: "New employee added: Priya", time: "Yesterday", read: false },
    { id: 4, message: "Performance review pending", time: "3 days ago", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const menuItems = (
    <div style={{ width: 300, maxHeight: 350, overflowY: "auto", backgroundColor: "white", padding: "20px", borderRadius: "3%", boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)" }}>
      <div style={{ padding: "10px 12px", borderBottom: "1px solid #f0f0f0", fontWeight: 600 }}>
        Notifications ({unreadCount} unread)
        <span onClick={markAllAsRead} style={{ float: "right", fontSize: 12, cursor: "pointer", color: "#1677ff" }}>
          Mark all read
        </span>
      </div>
      <List
        dataSource={notifications}
        renderItem={item => (
          <List.Item
            style={{
              background: item.read ? "white" : "#e6f4ff",
              padding: "10px 12px",
              cursor: "pointer",
              borderBottom: "1px solid #f5f5f5",
            }}
            onClick={() => setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n))}
          >
            <div>
              <Typography.Text strong={!item.read}>{item.message}</Typography.Text>
              <br />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {item.time}
              </Typography.Text>
            </div>
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <Dropdown overlay={menuItems} trigger={["click"]} placement="bottomRight">
      <Badge dot={unreadCount > 0} offset={[-2, 2]}>
        <BellOutlined style={{ fontSize: 20, cursor: "pointer", opacity: 0.85 }} />
      </Badge>
    </Dropdown>
  );
};

export default NotificationDropdown;
