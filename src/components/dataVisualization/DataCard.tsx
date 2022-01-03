import React from 'react';
import { Card, Statistic, Typography } from 'antd';
import { StyledDataCard, DisplayCard } from '..';
import styled from 'styled-components';
const { Title } = Typography;

interface DataCardProps {
  readonly data: number | string;
  readonly title: string;
}

const DataCardWrapper = styled.div`
  border-style: solid; 
`;

const DataCard: React.FC<DataCardProps> = ({ data, title }) => {
  return (
    <DataCardWrapper> 
      <StyledDataCard>
        <Statistic value={data} valueStyle={{ fontSize: '50px' }} />
      </StyledDataCard>
      <DisplayCard>
        <Title level={4}>{title}</Title>
      </DisplayCard>
    </DataCardWrapper>
  );
};

export default DataCard;
