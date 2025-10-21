import { Tabs } from 'antd';
import React from 'react'
import BasicInfo from '../BasicInfo/BasicInfo';
import ContactInfo from '../ContactInfo/ContactInfo';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';
import IdentityInfo from '../IdentityInfo/IdentityInfo';

const ProfileTabs = () => {

  const items = [
    {
      key: '1',
      label: 'Basic Info',
      children: <BasicInfo />,
    },
    {
      key: '2',
      label: 'Contact Info',
      children: <ContactInfo />,
    },
    {
      key: '3',
      label: 'Identity Info',
      children: <IdentityInfo />,
    },
    {
      key: '4',
      label: 'Additonal Info',
      children: <AdditionalInfo />,
    },
  ];

  return (
    <div>
        <Tabs type='card' size='middle' defaultActiveKey="1" items={items}/>
    </div>
  )
}

export default ProfileTabs