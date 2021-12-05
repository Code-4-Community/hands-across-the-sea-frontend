import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { LinkButton } from './LinkButton';
import { Routes } from '../App';

const BackButton: React.FC = () => {
  return (
    <LinkButton icon={<ArrowLeftOutlined />} type="text" to={Routes.HOME}>
      Back
    </LinkButton>
  );
};

export default BackButton;
