import React, { useState } from 'react';
import styled from 'styled-components';
import { Radio, RadioChangeEvent, Typography } from 'antd';
import { convertEnumToRegularText } from '../../utils/helpers';
import { DataManagerOptions } from './types';
import { StyledRow } from '../../components/dataVisualization';
import TotalStat from './statistics/TotalStat';
import CountryStat from './statistics/CountryStat';
import SchoolStat from './statistics/SchoolStat';

const { Title } = Typography;

const Container = styled.div`
  max-width: 800px;
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
          <TotalStat />
        ) : selectedButton === DataManagerOptions.COUNTRY ? (
          <CountryStat />
        ) : (
          <SchoolStat />
        )}
      </Container>
    </>
  );
};

export default DataVisualization;
