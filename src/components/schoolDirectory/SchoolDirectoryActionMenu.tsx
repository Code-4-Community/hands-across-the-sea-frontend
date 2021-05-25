import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import styled from 'styled-components';

const ActionButton = styled(Button)`
  width: 100%;
`;

export enum SchoolDirectoryAction {
  EDIT = 'edit',
  BOOKS = 'books',
  DELETE = 'delete',
}

interface ActionProps {
  readonly onAction: (key: SchoolDirectoryAction) => void;
}

const SchoolDirectoryActionMenu: React.FC<ActionProps> = ({ onAction }) => {
  const actionOverlay = (
    <Menu onClick={(e) => onAction(e.key as SchoolDirectoryAction)}>
      <Menu.Item key={'edit'}>Edit School</Menu.Item>
      <Menu.Item key={'books'}>Books</Menu.Item>
      <Menu.Item key={'delete'}>Delete School</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={actionOverlay} trigger={['click']}>
      <ActionButton>...</ActionButton>
    </Dropdown>
  );
};

export default SchoolDirectoryActionMenu;
