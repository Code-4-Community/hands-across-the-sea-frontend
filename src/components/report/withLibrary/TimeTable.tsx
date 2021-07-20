import React from 'react';
import { Timetable } from '../../../containers/library-report/ducks/types';

interface TimeTableProps {
  setTimeTable: (tt: Timetable) => void;
}

const TimeTable: React.FC<TimeTableProps> = ({ setTimeTable }) => {
  return (
    <table style={{ width: '100%' }}>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Age</th>
      </tr>
      <tr>
        <td>Jill</td>
        <td>Smith</td>
        <td>50</td>
      </tr>
      <tr>
        <td>Eve</td>
        <td>Jackson</td>
        <td>94</td>
      </tr>
    </table>
  );
};

export default TimeTable;
