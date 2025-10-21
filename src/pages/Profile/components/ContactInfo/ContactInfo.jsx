import React from 'react';
import { Descriptions, Tag } from 'antd';

const ContactInfo = () => {
  // Mock data - replace with actual contact data from props or context
  const contactData = {
    mobileNumber: "+91 9876543210",
    houseNumber: "42",
    streetName: "MG Road",
    landmark: "Near City Mall",
    district: "Tiruppur",
    state: "Tamil Nadu",
    country: "India",
    pincode: "641601",
    emergencyPhone: "+91 9876543211",
    familyDetails: "Spouse: Jane Doe, Children: 2",
    createdAt: "2020-03-01T10:00:00",
    updatedAt: "2024-10-15T14:30:00"
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

  const formatAddress = () => {
    const parts = [
      contactData.houseNumber,
      contactData.streetName,
      contactData.landmark,
      contactData.district,
      contactData.state,
      contactData.country,
      contactData.pincode
    ].filter(Boolean);
    
    return parts.join(', ');
  };

  return (
    <Descriptions 
      bordered 
      column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
      size="middle"
      labelStyle={{ fontWeight: 600, backgroundColor: '#fafafa' }}
    >
      <Descriptions.Item label="Mobile Number">
        <Tag color="blue">{contactData.mobileNumber}</Tag>
      </Descriptions.Item>

      <Descriptions.Item label="Emergency Phone">
        {contactData.emergencyPhone ? (
          <Tag color="red">{contactData.emergencyPhone}</Tag>
        ) : (
          '-'
        )}
      </Descriptions.Item>

      <Descriptions.Item label="House Number">
        {contactData.houseNumber}
      </Descriptions.Item>

      <Descriptions.Item label="Street Name">
        {contactData.streetName}
      </Descriptions.Item>

      <Descriptions.Item label="Landmark" span={2}>
        {contactData.landmark || '-'}
      </Descriptions.Item>

      <Descriptions.Item label="District">
        {contactData.district}
      </Descriptions.Item>

      <Descriptions.Item label="State">
        {contactData.state}
      </Descriptions.Item>

      <Descriptions.Item label="Country">
        {contactData.country}
      </Descriptions.Item>

      <Descriptions.Item label="Pincode">
        <Tag color="green">{contactData.pincode}</Tag>
      </Descriptions.Item>

      <Descriptions.Item label="Full Address" span={2}>
        {formatAddress()}
      </Descriptions.Item>

      <Descriptions.Item label="Family Details" span={2}>
        {contactData.familyDetails || '-'}
      </Descriptions.Item>

      <Descriptions.Item label="Created At">
        {formatDate(contactData.createdAt)}
      </Descriptions.Item>

      <Descriptions.Item label="Last Updated">
        {formatDate(contactData.updatedAt)}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ContactInfo;