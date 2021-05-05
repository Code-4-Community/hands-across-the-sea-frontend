import React from 'react';
import { Outer, Container } from '../form-style/FormContainer';
import { Button, Dropdown, Menu, Table } from 'antd';
import { SchoolEntry } from '../../containers/selectSchool/ducks/types';
import styled from 'styled-components';
import { ColumnType } from 'antd/lib/table';
import { DirectoryTitle } from '../index';

const ActionButton = styled(Button)`
  width: 100%;
`;

interface SchoolDirectoryProps {
  readonly schools: SchoolEntry[];
}

const handleActionButtonOnClick = ({ key }: any) => {
  if (key === 'edit') {
    return;
  } else if (key === 'books') {
    return;
  } else {
    return;
  }
};

const actionOverlay = (
  <Menu onClick={handleActionButtonOnClick}>
    <Menu.Item key={'edit'}>Edit School</Menu.Item>
    <Menu.Item key={'books'}>Books</Menu.Item>
    <Menu.Item key={'delete'}>Delete School</Menu.Item>
  </Menu>
);

const Action: React.FC = () => {
  return (
    <Dropdown overlay={actionOverlay} trigger={['click']}>
      <ActionButton>...</ActionButton>
    </Dropdown>
  );
};

const sortStrings = (a: string, b: string): number => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

const SchoolDirectory: React.FC<SchoolDirectoryProps> = ({ schools }) => {
  const dataSource: SchoolEntry[] = [
    {
      id: 1,
      name: 'D SCHOOL',
      country: 'UNITED_STATES',
    },
    {
      id: 2,
      name: 'B SCHOOL',
      country: 'UNITED_STATES',
    },
    {
      id: 3,
      name: 'A SCHOOL',
      country: 'GRENADA',
    },
    {
      id: 4,
      name: 'C SCHOOL',
      country: 'DOMINICA',
    },
  ];
  const columns: ColumnType<SchoolEntry>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'id',
      sorter: {
        compare: (a, b) => sortStrings(a.name, b.name),
        multiple: 1,
      },
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'id',
      sorter: {
        compare: (a, b) => sortStrings(a.country, b.country),
        multiple: 1,
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: Action,
    },
  ];

  return (
    <Container>
      <DirectoryTitle level={2}>School Directory</DirectoryTitle>
      <Outer>
        <Table dataSource={dataSource} columns={columns} />
      </Outer>
    </Container>
  );
};

export default SchoolDirectory;
