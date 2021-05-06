import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { SchoolEntry } from '../../containers/selectSchool/ducks/types';

const ActionButton = styled(Button)`
  width: 100%;
`;

interface ActionProps {
  readonly onClick: (e: any) => void;
  readonly record: SchoolEntry;
}

const Action: React.FC<ActionProps> = ({ onClick, record }) => {
  const actionOverlay = (
    <Menu onClick={onClick}>
      <Menu.Item key={`edit;${record.id}`}>Edit School</Menu.Item>
      <Menu.Item key={`books;${record.id}`}>Books</Menu.Item>
      <Menu.Item key={`delete;${record.id}`}>Delete School</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={actionOverlay} trigger={['click']}>
      <ActionButton>...</ActionButton>
    </Dropdown>
  );
};

export default Action;
