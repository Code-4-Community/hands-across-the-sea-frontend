import React, { useState } from 'react';
import { Col, Row, Select } from 'antd';
import { Line, Column, Area } from '@ant-design/plots';
import { useQuery } from 'react-query';
import protectedApiClient from '../../../api/protectedApiClient';
import { StyledRow } from '../../../components/dataVisualization';
import FormItemDropdown from '../../../components/form-style/FormItemDropdown';
import SelectDropDown from '../../../components/dataVisualization/SelectDropDown';
import { xAxis } from '../../../utils/xaxis';
import { yAxis } from '../../../utils/yaxis';
import { convertEnumToRegularText } from '../../../utils/helpers';
import { Countries } from '../../../utils/countries';

enum CHART_TYPES {
  LINE = 'Line',
  COLUMN = 'Column',
  AREA = 'Area',
}

interface DisplayDict {
  [index: string]: string;
}

const DISPLAY_TO_PARAM: DisplayDict = {
  'Number of Books': 'countBooks',
  'Number of Children': 'countStudents',
};

const VisualizationMetrics: React.FC = () => {
  const [selectedxAxis, setSelectedxAxis] = useState<string>(xAxis.COUNTRY);
  const [selectedyAxis, setSelectedyAxis] = useState<string>(
    yAxis.NUMBER_OF_BOOKS,
  );
  const handlexAxisSelect = async (selectedValue: string) => {
    setSelectedxAxis(selectedValue);
    await refetch();
  };
  const handleyAxisSelect = async (selectedValue: string) => {
    setSelectedyAxis(selectedValue);
    await refetch();
  };

  const [selectedChartType, setSelectedChartType] = useState<string>('LINE');

  async function getDataPerCountry() {
    const aggregatedData = [];

    for (const country of Object.keys(Countries)) {
      const metric = await protectedApiClient.getCountryMetrics(country);

      if (selectedyAxis === yAxis.NUMBER_OF_BOOKS) {
        aggregatedData.push({ country, countBooks: metric.countBooks ?? 0 });
      } else if (selectedyAxis === yAxis.NUMBER_OF_CHILDREN) {
        aggregatedData.push({
          country,
          countStudents: metric.countStudents ?? 0,
        });
      }
    }

    return aggregatedData;
  }

  const { isLoading, error, data, refetch } = useQuery(
    'aggregatedData',
    getDataPerCountry,
  );

  const displayChart = () => {
    const config = {
      width: 750,
      data: data || [],
      xAxis: {
        title: { text: selectedxAxis },
        tickCount: 7,
      },
      yAxis: {
        title: { text: selectedyAxis },
      },
      xField: 'country',
      yField: DISPLAY_TO_PARAM[selectedyAxis],
    };

    if (selectedChartType === 'LINE') {
      return (
        <Line
          {...config}
          tooltip={{
            formatter: (record) => {
              return {
                name: DISPLAY_TO_PARAM[selectedyAxis],
                value: record.count,
              };
            },
          }}
        />
      );
    } else if (selectedChartType === 'COLUMN') {
      return (
        <Column
          {...config}
          tooltip={{
            formatter: (record) => {
              return {
                name: DISPLAY_TO_PARAM[selectedyAxis],
                value: record.count,
              };
            },
          }}
        />
      );
    } else if (selectedChartType === 'AREA') {
      return (
        <Area
          {...config}
          tooltip={{
            formatter: (record) => {
              return {
                name: DISPLAY_TO_PARAM[selectedyAxis],
                value: record.count,
              };
            },
          }}
        />
      );
    }
  };

  return (
    <>
      <StyledRow justify="center">
        <Col span={16}>
          <FormItemDropdown
            clarifyText={'Select Graph Type'}
            optionsEnum={CHART_TYPES}
            name={'chartType'}
            text={'Line'}
            disabled={false}
            required={true}
            onChange={(value) => setSelectedChartType(value)}
          />
          <StyledRow justify="start">
            <Col span={16}>Select Data to Display on X-Axis</Col>
          </StyledRow>
          <SelectDropDown
            value={selectedxAxis}
            selectedButton={'x-axis'}
            onChange={handlexAxisSelect}
            placeholder={'Select the x-axis'}
          >
            {Object.values(xAxis).map((key: string) => (
              <Select.Option key={key} value={key}>
                {convertEnumToRegularText(key)}
              </Select.Option>
            ))}
          </SelectDropDown>
        </Col>
      </StyledRow>

      <StyledRow justify="center">
        <Col span={16}>Select Data to Display on Y-Axis</Col>
      </StyledRow>
      <StyledRow justify="center">
        <Col span={16}>
          <SelectDropDown
            value={selectedyAxis}
            selectedButton={'y-axis'}
            onChange={handleyAxisSelect}
            placeholder={'Select the y-axis'}
          >
            {Object.values(yAxis).map((key: string) => (
              <Select.Option key={key} value={key}>
                {convertEnumToRegularText(key)}
              </Select.Option>
            ))}
          </SelectDropDown>
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
