import React from 'react';
import { useQuery } from 'react-query';
import protectedApiClient from '../../../api/protectedApiClient';
import DataCard from '../../../components/dataVisualization/DataCard';
import { MetricMapping } from '../types';
import { Row } from 'antd';
import { prepareData } from '../../../utils/helpers';

const TotalMetrics: React.FC = () => {
  const { isLoading, error, data } = useQuery(
    'totalMetric',
    protectedApiClient.getTotalMetrics,
  );

  return (
    <Row justify="center" wrap>
      {isLoading && <p>Loading metric...</p>}
      {error && <p>An error occurred loading metric</p>}
      {data &&
        Object.entries(data).map(([key, value]) => (
          <DataCard
            key={key}
            data={prepareData(key, value)}
            title={MetricMapping[key as keyof typeof MetricMapping]}
          />
        ))}
    </Row>
  );
};

export default TotalMetrics;
