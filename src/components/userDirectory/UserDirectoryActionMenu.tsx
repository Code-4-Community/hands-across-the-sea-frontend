import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import styled from 'styled-components';

const ActionButton = styled(Button)`
  width: 100%;
`;

export enum UserDirectoryAction {
  EDIT = 'edit',
  DELETE = 'delete',
}

interface ActionProps {
  readonly onAction: (key: UserDirectoryAction) => void;
}

const UserDirectoryActionMenu: React.FC<ActionProps> = ({ onAction }) => {
  const actionOverlay = (
    <Menu onClick={(e) => onAction(e.key as UserDirectoryAction)}>
      <Menu.Item key={'edit'}>Edit User</Menu.Item>
      <Menu.Item key={'delete'}>Delete User</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={actionOverlay} trigger={['click']}>
      <ActionButton>...</ActionButton>
    </Dropdown>
  );
};

export default UserDirectoryActionMenu;
