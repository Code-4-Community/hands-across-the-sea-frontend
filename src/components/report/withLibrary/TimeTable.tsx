import { InputNumber, Table } from 'antd';
import React from 'react';
import styled from 'styled-components';
import {
  Timetable,
  TIMETABLE_COLUMNS,
} from '../../../containers/library-report/ducks/types';
import { daysInMonth } from '../../../utils/helpers';
interface TimeTableProps {
  setTimeTable: (tt: Timetable) => void;
}

const TimeTableWrapper = styled.div`
  overflow-x: auto; //allows the div to scroll horizontally only when the div overflows.
  overflow-y: hidden; //does not allow for the div to scroll vertically
`;

const SmallInputNumber = styled(InputNumber)`
  width: 4rem;
`;

const year = 2021;
const month = 1;
const days = daysInMonth(year, month);
const columns = [
  {
    title: 'Grade',
    width: 150,
    dataIndex: 'grade',
    key: 'grade',
    fixed: 'left',
  },
];

for (let i = 0; i < days; i++) {
  columns.push({
    title: `${month}/${i+1}`,
    key: `day-${i}`,
    width: 100,
    render: () => <SmallInputNumber placeholder={0} defualtValue={0} min={0} />,
  });
}

const data = TIMETABLE_COLUMNS.map((grade) => ({
  key: grade,
  grade: grade,
}));

const TimeTable: React.FC<TimeTableProps> = ({ setTimeTable }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: 1300 }}
      pagination={false}
    />
  );
};

export default TimeTable;
