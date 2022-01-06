import React, { useState } from 'react';
import styled from 'styled-components';
import { Radio, RadioChangeEvent, Typography } from 'antd';
import { convertEnumToRegularText } from '../../utils/helpers';
import { DataManagerOptions } from './types';
import { StyledRow } from '../../components/dataVisualization';
import TotalMetrics from './metrics/TotalMetrics';
import CountryMetrics from './metrics/CountryMetrics';
import SchoolMetrics from './metrics/SchoolMetrics';

const { Title } = Typography;

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
`;

const DataTitle = styled(Title)`
  text-align: center;
  margin: 24px;
  padding: 24px;
`;

const DataVisualization: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState(
    DataManagerOptions.TOTAL,
  );

  return (
    <>
      <Container>
        <DataTitle level={1}>Data Manager</DataTitle>
        <StyledRow justify="center">
          <Radio.Group
            defaultValue={DataManagerOptions.TOTAL}
            buttonStyle={'solid'}
            onChange={(e: RadioChangeEvent) => {
              setSelectedButton(e.target.value);
            }}
          >
            {Object.keys(DataManagerOptions).map((key: string) => (
              <Radio.Button key={key} value={key}>
                {convertEnumToRegularText(key)}
              </Radio.Button>
            ))}
          </Radio.Group>
        </StyledRow>
        {selectedButton === DataManagerOptions.TOTAL ? (
          <TotalMetrics />
        ) : selectedButton === DataManagerOptions.COUNTRY ? (
          <CountryMetrics />
        ) : (
          <SchoolMetrics />
        )}
      </Container>
    </>
  );
};

export default DataVisualization;
