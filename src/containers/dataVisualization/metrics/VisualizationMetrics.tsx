import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { Line, Column, Area } from '@ant-design/plots';
import { useQuery } from 'react-query';
import protectedApiClient from '../../../api/protectedApiClient';
import moment from 'moment';
import { StyledRow } from '../../../components/dataVisualization';
import FormItemDropdown from '../../../components/form-style/FormItemDropdown';


enum CHART_TYPES {
  LINE = "Line",
  COLUMN = "Column",
  AREA = "Area"
}

const VisualizationMetrics: React.FC = () => {

  const [selectedChartType, setSelectedChartType] = useState<string>("LINE");

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

  const displayChart = () => {
    const config = {
      width: 750,
      data: data || [],
      xAxis: {
        title: { text: 'Time'}
      },
      yAxis: {
        title: { text: 'Number of Books '}
      },
      xField: "date",
      yField: "count"
    }

    if (selectedChartType === "LINE") {
      return <Line 
          {...config}
          tooltip={{
            formatter: (record) => {
              return { name: 'Number of Books', value: record.count };
            },
          }}
      />
    } else if (selectedChartType === "COLUMN") {
      return <Column 
          {...config}
          tooltip={{
            formatter: (record) => {
              return { name: 'Number of Books', value: record.count };
            },
          }}
      />
    } else if (selectedChartType === "AREA") {
      return <Area 
          {...config}
          tooltip={{
            formatter: (record) => {
              return { name: 'Number of Books', value: record.count };
            },
          }}
      />
    }
  }

  return (
    <>
      <StyledRow justify="center">
        <Col span={16}>
          <FormItemDropdown
            clarifyText={
              'Select Graph Type'
            }
            optionsEnum={CHART_TYPES}
            name={'chartType'}
            text={'Line'}
            disabled={false}
            required={true}
            onChange={(value) => setSelectedChartType(value)}
          />
        </Col>
      </StyledRow>
    
      <Row justify="center">
        {isLoading && <p>Loading visualization...</p>}
        {error && <p>An error occurred loading visualization</p>}
        {data && displayChart()}
      </Row>
    </>
  );
};

export default VisualizationMetrics;
