import React from 'react';
import { Descriptions, Tag, Space } from 'antd';

const BasicInfo = () => {
  // Mock data - replace with actual user data from props or context
  const userData = {
    employeeId: 1001,
    employeeName: "John Doe",
    email: "john.doe@company.com",
    bloodGroup: "O+",
    dob: "1990-05-15",
    dateOfJoining: "2020-03-01",
    weekOff: ["Saturday", "Sunday"],
    branch: "Headquarters",
    designation: "Senior Developer",
    role: "Developer",
    timezone: "Asia/Kolkata",
    isActive: true,
    createdAt: "2020-03-01T10:00:00"
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const calculateTenure = (joinDate) => {
    const start = new Date(joinDate);
    const now = new Date();
    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();
    
    const totalMonths = years * 12 + months;
    const displayYears = Math.floor(totalMonths / 12);
    const displayMonths = totalMonths % 12;
    
    if (displayYears > 0 && displayMonths > 0) {
      return `${displayYears} year${displayYears > 1 ? 's' : ''} ${displayMonths} month${displayMonths > 1 ? 's' : ''}`;
    } else if (displayYears > 0) {
      return `${displayYears} year${displayYears > 1 ? 's' : ''}`;
    } else {
      return `${displayMonths} month${displayMonths > 1 ? 's' : ''}`;
    }
  };

  return (
    <Descriptions 
      bordered 
      column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
      size="middle"
      labelStyle={{ fontWeight: 600, backgroundColor: '#fafafa' }}
    >
      <Descriptions.Item label="Employee ID">
        {userData.employeeId}
      </Descriptions.Item>

      <Descriptions.Item label="Employee Name">
        {userData.employeeName}
      </Descriptions.Item>

      <Descriptions.Item label="Email">
        {userData.email}
      </Descriptions.Item>

      <Descriptions.Item label="Role">
        <Tag color="blue">{userData.role}</Tag>
      </Descriptions.Item>

      <Descriptions.Item label="Designation">
        <Tag color="purple">{userData.designation}</Tag>
      </Descriptions.Item>

      <Descriptions.Item label="Branch">
        {userData.branch}
      </Descriptions.Item>

      <Descriptions.Item label="Blood Group">
        <Tag color="red">{userData.bloodGroup}</Tag>
      </Descriptions.Item>

      <Descriptions.Item label="Date of Birth">
        {formatDate(userData.dob)}
      </Descriptions.Item>

      <Descriptions.Item label="Date of Joining">
        {formatDate(userData.dateOfJoining)}
      </Descriptions.Item>

      <Descriptions.Item label="Tenure">
        <Tag color="cyan">{calculateTenure(userData.dateOfJoining)}</Tag>
      </Descriptions.Item>

      <Descriptions.Item label="Week Off">
        <Space>
          {userData.weekOff?.map((day) => (
            <Tag key={day} color="geekblue">{day}</Tag>
          ))}
        </Space>
      </Descriptions.Item>

      <Descriptions.Item label="Timezone">
        {userData.timezone}
      </Descriptions.Item>

      <Descriptions.Item label="Status">
        <Tag color={userData.isActive ? "success" : "error"}>
          {userData.isActive ? "Active" : "Inactive"}
        </Tag>
      </Descriptions.Item>

      <Descriptions.Item label="Account Created">
        {formatDate(userData.createdAt)}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default BasicInfo;