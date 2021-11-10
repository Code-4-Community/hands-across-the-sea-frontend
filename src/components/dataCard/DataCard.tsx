import React from 'react';
import { Card, Statistic, Typography } from 'antd';
import { StyledDataCard } from '..';
const { Title } = Typography;

interface DataCardProps {
    data: number;
    title: string;
}

const DataCard: React.FC<DataCardProps> = ({data, title}) => {
    return (
        <div>
        <StyledDataCard>
            <Statistic value={data} valueStyle={{fontSize: '50px' }}/>
        </StyledDataCard> 
        <Card style={{ width: 261, height: 70, borderRadius: 38, textAlign: 'center' }}>
            <Title level={4}>{title}</Title>
        </Card>
        </div>
    )
}

export default DataCard;