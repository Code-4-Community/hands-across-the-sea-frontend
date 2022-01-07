import React, { useState } from 'react';
import { StyledRow } from '../../../components/dataVisualization';
import { Col, Row, Select } from 'antd';
import SelectDropDown from '../../../components/dataVisualization/SelectDropDown';
import { convertEnumToRegularText, prepareData } from '../../../utils/helpers';
import { useQuery, useQueryClient } from 'react-query';
import protectedApiClient from '../../../api/protectedApiClient';
import { Countries } from '../../../utils/countries';
import DataCard from '../../../components/dataVisualization/DataCard';
import { MetricMapping } from '../types';

const CountryMetrics: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined,
  );

  const { isLoading, error, data } = useQuery(
    ['countryMetrics', selectedCountry],
    () => protectedApiClient.getCountryMetrics(selectedCountry as string),
    {
      enabled: selectedCountry !== undefined,
    },
  );

  const handleCountrySelect = async (selectedValue: string) => {
    setSelectedCountry(selectedValue);
    await queryClient.invalidateQueries('countryMetrics');
  };

  return (
    <>
      <StyledRow justify="center">
        <Col span={16}>
          <SelectDropDown
            value={selectedCountry}
            selectedButton={'country'}
            onChange={handleCountrySelect}
            placeholder={'Select a country'}
          >
            {Object.keys(Countries).map((key: string) => (
              <Select.Option key={key} value={key}>
                {convertEnumToRegularText(key)}
              </Select.Option>
            ))}
          </SelectDropDown>
        </Col>
      </StyledRow>
      <Row gutter={[12, 24]} justify="center" wrap>
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
    </>
  );
};

export default CountryMetrics;
