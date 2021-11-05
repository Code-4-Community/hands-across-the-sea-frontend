import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Empty, Row, Select } from 'antd';
import { Countries } from '../../utils/countries';
import { convertEnumToRegularText } from '../../utils/helpers';
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';
import { SchoolEntry } from '../selectSchool/ducks/types';

enum Options {
  COUNTRY = 'COUNTRY',
  SCHOOL = 'SCHOOL',
}

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding-top: 10%;
`;

const StyledSelect = styled(Select)`
  width: 100%;
`;

const StyledButton = styled(Button)<{
  border: string;
  selected: boolean;
}>`
  border-radius: ${(props) => props.border};
  background-color: ${(props) => (props.selected ? '#54679E' : '#D4D9E7')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  width: 100%;

  &:hover,
  &:focus {
    background-color: ${(props) => (props.selected ? '#54679E' : '#D4D9E7')};
    color: ${(props) => (props.selected ? 'white' : 'black')};
  }
`;

const DataVisualization: React.FC = () => {
  const [selectedButton, updateSelectedButton] = useState(Options.COUNTRY);
  const [schools, updateSchools] = useState<SchoolEntry[]>([]);
  const [selectedDropDownValue, updateSelectedDropDownValue] = useState<
    string | undefined
  >(undefined);

  const availableSchools: AsyncRequest<SchoolEntry[], any> = useSelector(
    (state: C4CState) => state.selectSchoolState.schools,
  );

  useEffect(() => {
    if (availableSchools.kind === AsyncRequestKinds.Completed) {
      updateSchools(availableSchools.result);
    }
  }, [availableSchools]);

  return (
    <>
      <Container>
        <Row style={{ marginBottom: '20px' }} justify="center">
          <Col xs={{ span: 8 }} sm={{ span: 4 }}>
            <StyledButton
              selected={selectedButton === Options.COUNTRY}
              border="10px 0 0 10px"
              onClick={() => updateSelectedButton(Options.COUNTRY)}
            >
              Country
            </StyledButton>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 4 }}>
            <StyledButton
              selected={selectedButton === Options.SCHOOL}
              border="0 10px 10px 0"
              onClick={() => updateSelectedButton(Options.SCHOOL)}
            >
              School
            </StyledButton>
          </Col>
        </Row>
        <Row style={{ marginBottom: '20px' }} justify="center">
          <Col span={16}>
            <StyledSelect
              placeholder="Search"
              showSearch
              allowClear
              onChange={(value) =>
                updateSelectedDropDownValue(value.toString())
              }
              notFoundContent={
                <Empty
                  description={
                    <span>{`No ${selectedButton.toLocaleLowerCase()} data found`}</span>
                  }
                />
              }
            >
              {selectedButton === Options.COUNTRY
                ? Object.keys(Countries).map((key: string) => (
                    <Select.Option key={key} value={key}>
                      {convertEnumToRegularText(key)}
                    </Select.Option>
                  ))
                : schools.map((school: SchoolEntry) => (
                    <Select.Option key={school.id} value={school.name}>
                      {school.name}
                    </Select.Option>
                  ))}
            </StyledSelect>
          </Col>
        </Row>
        {/* Cards will go in row */}
        <Row gutter={[12, 24]} justify="center" wrap></Row>
      </Container>
    </>
  );
};

export default DataVisualization;
