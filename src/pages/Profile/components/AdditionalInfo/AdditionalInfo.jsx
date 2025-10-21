import React from 'react';
import { Descriptions, Tag, Empty } from 'antd';

const AdditionalInfo = () => {
  // Mock API data - replace with actual data from props or API
  const additionalDetailsData = [
    {
      id: 1,
      admName: "PAN Number",
      admType: "TEXT",
      isRequired: true,
      value: "ABCDE1234F"
    },
    {
      id: 2,
      admName: "Years of Experience",
      admType: "NUMBER",
      isRequired: true,
      value: "5"
    },
    {
      id: 3,
      admName: "Certification Date",
      admType: "DATE",
      isRequired: false,
      value: "2023-06-15"
    },
    {
      id: 4,
      admName: "Employment Type",
      admType: "SELECT",
      isRequired: true,
      value: "Full-time"
    },
    {
      id: 5,
      admName: "Skills",
      admType: "TEXT",
      isRequired: false,
      value: "React, Node.js, TypeScript"
    },
    {
      id: 6,
      admName: "Salary Range",
      admType: "SELECT",
      isRequired: false,
      value: "50K-70K"
    }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatValue = (value, type) => {
    if (!value) return '-';
    
    switch (type) {
      case 'DATE':
        return formatDate(value);
      case 'NUMBER':
        return <Tag color="blue">{value}</Tag>;
      case 'SELECT':
        return <Tag color="purple">{value}</Tag>;
      case 'TEXT':
      default:
        return value;
    }
  };

  const getTypeIcon = (type, isRequired) => {
    const text = isRequired ? '*' : '';
    return <span className='text-red-500'>{text}</span>;
  };

  if (!additionalDetailsData || additionalDetailsData.length === 0) {
    return (
      <div className="p-4">
        <Empty description="No additional details available" />
      </div>
    );
  }

  return (
    <Descriptions 
      bordered 
      column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
      size="middle"
      labelStyle={{ fontWeight: 600, backgroundColor: '#fafafa' }}
    >
      {additionalDetailsData.map((detail) => (
        <Descriptions.Item 
          key={detail.id} 
          label={
            <span>
              {detail.admName} {getTypeIcon(detail.admType, detail.isRequired)}
            </span>
          }
        >
          {formatValue(detail.value, detail.admType)}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

export default AdditionalInfo;