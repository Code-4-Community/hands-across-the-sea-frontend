import React, { useState } from 'react';
import { StyledRow } from '../../../components/dataVisualization';
import { Col, Row, Select } from 'antd';
import SelectDropDown from '../../../components/dataVisualization/SelectDropDown';
import { convertEnumToRegularText } from '../../../utils/helpers';
import { useQuery, useQueryClient } from 'react-query';
import protectedApiClient from '../../../api/protectedApiClient';
import { Countries } from '../../../utils/countries';
import DataCard from '../../../components/dataVisualization/DataCard';
import { MetricMapping } from '../types';

const CountryStat: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined,
  );

  const { isLoading, error, data } = useQuery(
    ['countryMetrics', selectedCountry],
    () => {
      protectedApiClient
        .getCountryStat(selectedCountry as string)
        .then((r) => r);
    },
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
            selectedButton={'country'}
            setSelectedDropDownValue={handleCountrySelect}
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
    </>
  );
};

export default CountryStat;
