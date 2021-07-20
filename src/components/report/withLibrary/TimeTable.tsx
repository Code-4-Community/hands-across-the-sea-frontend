import { DatePicker, InputNumber, Table } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Timetable,
  TIMETABLE_COLUMNS,
} from '../../../containers/library-report/ducks/types';
import { daysInMonth } from '../../../utils/helpers';
import moment, { Moment } from 'moment';

interface TimeTableProps {
  setTimeTable: (tt: Timetable) => void;
  timeTable: Timetable | null;
}

const SmallInputNumber = styled(InputNumber)`
  width: 4rem;
`;

interface TimeTableDataType {
  key: string;
  grade: string;
}

const TimeTable: React.FC<TimeTableProps> = ({ setTimeTable, timeTable }) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  const onChangeDate = (dateMoment: Moment | null) => {
    if (!dateMoment) {
      return;
    }

    setYear(dateMoment.year());
    setMonth(dateMoment.month() + 1);
  };

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

  const handleTimeTableOnChange = (
    grade: string,
    day: number,
    students: number,
  ) => {
    const newTimeTable = timeTable || ({} as Timetable);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    newTimeTable[grade] = (timeTable && timeTable[grade]) || {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    newTimeTable[grade][day] = students;
    newTimeTable.year = year;
    newTimeTable.month = month;
    setTimeTable(newTimeTable);
  };

  for (let i = 0; i < days; i++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    columns.push({
      dataIndex: '',
      fixed: '',
      title: `${month}/${i + 1}`,
      key: `day-${i}`,
      width: 100,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      render(record: TimeTableDataType) {
        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <SmallInputNumber
            placeholder={0}
            defaultValue={
              timeTable &&
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              timeTable[record.grade] &&
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              timeTable[record.grade][i]
            }
            // value={
            //   timeTable &&
            //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //   // @ts-ignore
            //   timeTable[record.grade] &&
            //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //   // @ts-ignore
            //   timeTable[record.grade][i]
            // }
            min={0}
            onChange={(students: number) =>
              handleTimeTableOnChange(record.grade, i, students)
            }
          />
        );
      },
    });
  }

  const data: TimeTableDataType[] = TIMETABLE_COLUMNS.map((grade) => ({
    key: grade,
    grade,
  }));

  return (
    <>
      <DatePicker
        defaultValue={moment(new Date())}
        onChange={onChangeDate}
        picker="month"
        size="large"
      />
      <Table
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        columns={columns}
        dataSource={data}
        scroll={{ x: 1300 }}
        pagination={false}
      />
    </>
  );
};

export default TimeTable;
