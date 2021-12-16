import React from 'react';
import { Card, Statistic, Typography } from 'antd';
import { StyledDataCard, DisplayCard } from '..';
const { Title } = Typography;

interface DataCardProps {
    readonly data: number;
    readonly title: string;
}

const DataCard: React.FC<DataCardProps> = ({data, title}) => {
    return (
        <>
        <StyledDataCard>
            <Statistic value={data} valueStyle={{fontSize: '50px' }}/>
        </StyledDataCard> 
        <DisplayCard>
            <Title level={4}>{title}</Title>
        </DisplayCard>
        </>
    )
}

export default DataCard;