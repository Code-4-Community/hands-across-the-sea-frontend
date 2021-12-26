import React, { useState } from 'react';
import { StyledRow } from '../../../components/dataVisualization';
import { Col, Row, Select } from 'antd';
import SelectDropDown from '../../../components/dataVisualization/SelectDropDown';
import { Countries } from '../../../utils/countries';
import { convertEnumToRegularText } from '../../../utils/helpers';
import { useQuery, useQueryClient } from 'react-query';
import protectedApiClient from '../../../api/protectedApiClient';
import { SchoolEntry } from '../../selectSchool/ducks/types';
import DataCard from '../../../components/dataVisualization/DataCard';
import { MetricMapping } from '../types';

const SchoolStat: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined,
  );
  const [selectedSchool, setSelectedSchool] = useState<number | undefined>(
    undefined,
  );

  const getAllSchoolsQuery = useQuery(
    'getAllSchools',
    protectedApiClient.getAllSchools,
  );

  const schoolMetricsQuery = useQuery(
    ['schoolMetrics', selectedSchool],
    () => protectedApiClient.getSchoolStat(selectedSchool as number),
    {
      enabled: selectedSchool !== undefined,
    },
  );

  const handleCountrySelect = async (selectedValue: string) => {
    setSelectedCountry(selectedValue);
    await queryClient.invalidateQueries('getAllSchools');
  };

  const handleSchoolSelect = async (selectedValue: number) => {
    setSelectedSchool(selectedValue);
    await queryClient.invalidateQueries('schoolMetrics');
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
      <StyledRow justify="center">
        <Col span={16}>
          <SelectDropDown
            selectedButton={'school'}
            setSelectedDropDownValue={handleSchoolSelect}
            placeholder={'Select a school'}
            noDataText={
              selectedCountry === undefined || getAllSchoolsQuery.error
                ? 'Please select a country to search for a school'
                : undefined
            }
            loading={getAllSchoolsQuery.isLoading}
          >
            {getAllSchoolsQuery.data &&
              getAllSchoolsQuery.data.map((school: SchoolEntry) => (
                <Select.Option key={school.id} value={school.id}>
                  {school.name}
                </Select.Option>
              ))}
          </SelectDropDown>
        </Col>
      </StyledRow>
      <Row gutter={[12, 24]} justify="center" wrap>
        {schoolMetricsQuery.isLoading && <p>Loading metric...</p>}
        {schoolMetricsQuery.error || schoolMetricsQuery.data === undefined ? (
          <p>An error occurred loading metric</p>
        ) : (
          Object.entries(schoolMetricsQuery.data).map(([key, value]) => (
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

export default SchoolStat;
