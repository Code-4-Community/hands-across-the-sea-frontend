import React from 'react';
import { Outer, Container } from '../form-style/FormContainer';
import {Button, Table} from 'antd';
import { SchoolEntry } from '../../containers/selectSchool/ducks/types';

interface Columns {
  readonly title: string;
  readonly dataIndex: string;
  readonly key: string;
  readonly render?: React.FC;
}

interface SchoolDirectoryProps {
  readonly schools: SchoolEntry[];
}

const Action: React.FC = () => {
  return <Button>...</Button>;
};

const SchoolDirectory: React.FC<SchoolDirectoryProps> = ({ schools }) => {
  const columns: Columns[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'id',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'id',
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
      <Outer>
        <Table dataSource={schools} columns={columns} />
      </Outer>
    </Container>
  );
};

export default SchoolDirectory;
