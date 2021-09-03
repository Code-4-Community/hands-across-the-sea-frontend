import { Col, DatePicker, InputNumber, Row, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
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
  name: string;
}

const { Title } = Typography;

const Container = styled.div`
  margin-bottom: 24px;
`;

const TitleRow = styled(Row)`
  background: white;
  margin-bottom: 24px;
  padding-top: 24px;
`;

const TableTitle = styled(Title)`
  text-align: center;
`;

const SmallInputNumber = styled(InputNumber)`
  width: 4rem;
`;

interface TimeTableDataType {
  key: string;
  grade: string;
}

const TimeTable: React.FC<TimeTableProps> = ({
  setTimeTable,
  timeTable,
  name,
}) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [days, setDays] = useState<number>(daysInMonth(year, month));

  useEffect(() => {
    setDays(daysInMonth(year, month));
  }, [year, month]);

  const onChangeDate = (dateMoment: Moment | null) => {
    if (!dateMoment) {
      return;
    }

    setYear(dateMoment.year());
    setMonth(dateMoment.month() + 1);
  };

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
    <Container>
      <TitleRow gutter={[0, 24]} justify="center">
        <Col span={8}>
          <DatePicker
            defaultValue={moment(new Date())}
            onChange={onChangeDate}
            picker="month"
            size="large"
          />
        </Col>
        <Col span={16}>
          <TableTitle level={1}>{name}</TableTitle>
        </Col>
      </TitleRow>
      <Row gutter={[0, 24]}>
        <Table
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          columns={columns}
          dataSource={data}
          scroll={{ x: 1300 }}
          pagination={false}
        />
      </Row>
    </Container>
  );
};

export default TimeTable;
