import React from 'react';
import { Descriptions, Tag, Empty, Button } from 'antd';
import { FileOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const IdentityInfo = () => {
  // Mock API data - replace with actual data from props or API
  const identityDetailsData = [
    {
      id: 1,
      idName: "Aadhaar Card",
      country: "India",
      isRequired: true,
      isAttachmentRequired: true,
      value: "1234 5678 9012",
      attachmentUrl: "https://example.com/aadhaar.pdf"
    },
    {
      id: 2,
      idName: "PAN Card",
      country: "India",
      isRequired: true,
      isAttachmentRequired: true,
      value: "ABCDE1234F",
      attachmentUrl: "https://example.com/pan.pdf"
    },
    {
      id: 3,
      idName: "Passport",
      country: "India",
      isRequired: false,
      isAttachmentRequired: true,
      value: "Z1234567",
      attachmentUrl: null
    },
    {
      id: 4,
      idName: "Driving License",
      country: "India",
      isRequired: false,
      isAttachmentRequired: false,
      value: "TN0120230012345",
      attachmentUrl: null
    }
  ];

  const getRequiredBadge = (isRequired) => {
    return isRequired ? (
      <p className='text-red-500'>*</p>
    ) : (
        ""
    );
  };

  const renderValue = (detail) => {
    if (!detail.value) {
      return <span className="text-gray-400">Not provided</span>;
    }

    return (
      <div className="flex items-center flex-col gap-2">
        <span>{detail.value}</span>
        {detail.isAttachmentRequired && (
          detail.attachmentUrl ? (
            <Button 
              type="link" 
              size="small" 
              icon={<FileOutlined />}
              onClick={() => window.open(detail.attachmentUrl, '_blank')}
            >
              View Document
            </Button>
          ) : (
            ""
          )
        )}
      </div>
    );
  };

  if (!identityDetailsData || identityDetailsData.length === 0) {
    return (
      <div className="p-4">
        <Empty description="No identity details available" />
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
      {identityDetailsData.map((detail) => (
        <Descriptions.Item 
          key={detail.id} 
          label={
            <div className="flex items-center gap-2">
              <span>{detail.idName}</span>
              {getRequiredBadge(detail.isRequired)}
            </div>
          }
          span={1}
        >
          <div className="flex flex-col gap-1">
            {renderValue(detail)}
          </div>
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

export default IdentityInfo;