import React from 'react';
import { useQuery } from 'react-query';
import protectedApiClient from '../../../api/protectedApiClient';
import DataCard from '../../../components/dataVisualization/DataCard';
import { MetricMapping } from '../types';
import { Row } from 'antd';

const TotalMetrics: React.FC = () => {
  const { isLoading, error, data } = useQuery(
    'totalMetric',
    protectedApiClient.getTotalMetrics,
  );

  return (
    <Row gutter={[12, 24]} justify="center" wrap>
      {isLoading && <p>Loading metric...</p>}
      {error || data === undefined ? (
        <p>An error occurred loading metric</p>
      ) : (
        Object.entries(data).map(([key, value]) => (
          <DataCard
            key={key}
            data={value}
            title={MetricMapping[key as keyof typeof MetricMapping]}
          />
        ))
      )}
    </Row>
  );
};

export default TotalMetrics;
