import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { LinkButton } from './LinkButton';
import { Routes } from '../App';

interface BackButtonProps {
  readonly path?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ path }) => {
  return (
    <LinkButton
      icon={<ArrowLeftOutlined />}
      type="text"
      to={path ? path : Routes.HOME}
    >
      Back
    </LinkButton>
  );
};

export default BackButton;
