import React from 'react';
import { Row } from 'antd';
import { Line } from '@ant-design/plots';
import { useQuery } from 'react-query';
import protectedApiClient from '../../../api/protectedApiClient';
import moment from 'moment';

const VisualizationMetrics: React.FC = () => {
  function formatDate(date: string) {
    return moment(date).format('MM/DD/YYYY');
  }

  async function getAggregatedData() {
    const allSchoolIds = (await protectedApiClient.getAllSchools()).map(
      (school) => school.id,
    );

    let aggregatedData: { date: string; count: number }[] = [];
    for (const id of allSchoolIds) {
      const bookLogs = (await protectedApiClient.getBookLogs(id)).map((log) => {
        return { date: formatDate(log.date.toString()), count: log.count };
      });
      aggregatedData = aggregatedData.concat(bookLogs);
    }
    aggregatedData.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    let totalBooks = 0;
    for (const log of aggregatedData) {
      totalBooks += log.count;
      log.count = totalBooks;
    }
    return aggregatedData;
  }

  const { isLoading, error, data } = useQuery(
    'aggregatedData',
    getAggregatedData,
  );

  return (
    <Row justify="center">
      {isLoading && <p>Loading visualization...</p>}
      {error && <p>An error occurred loading visualization</p>}
      {data && (
        <Line
          width={750}
          data={data}
          padding="auto"
          xField="date"
          yField="count"
          xAxis={{
            title: { text: 'Time' },
          }}
          yAxis={{
            title: { text: 'Number of Books' },
          }}
          tooltip={{
            formatter: (record) => {
              return { name: 'Number of Books', value: record.count };
            },
          }}
        />
      )}
    </Row>
  );
};

export default VisualizationMetrics;
