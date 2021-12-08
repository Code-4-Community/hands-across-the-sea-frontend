import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Empty, Row, Select } from 'antd';
import { Countries } from '../../utils/countries';
import { convertEnumToRegularText } from '../../utils/helpers';
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';
import { SchoolEntry } from '../selectSchool/ducks/types';
import { Options, Rounded } from './types';

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding-top: 10%;
`;

const StyledRow = styled(Row)`
  margin-bottom: 20px;
`;

const StyledSelect = styled(Select)`
  width: 100%;
`;

const StyledButton = styled(Button)<{
  borderradius: string;
  selected: boolean;
}>`
  border-radius: ${(props) => props.borderradius};
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
  const [selectedButton, setSelectedButton] = useState(Options.COUNTRY);
  const [schools, setSchools] = useState<SchoolEntry[]>([]);
  const [selectedDropDownValue, setSelectedDropDownValue] = useState<
    string | undefined
  >(undefined);

  const availableSchools: AsyncRequest<SchoolEntry[], any> = useSelector(
    (state: C4CState) => state.selectSchoolState.schools,
  );

  useEffect(() => {
    if (availableSchools.kind === AsyncRequestKinds.Completed) {
      setSchools(availableSchools.result);
    }
  }, [availableSchools]);

  return (
    <>
      <Container>
        <StyledRow justify="center">
          <Col xs={{ span: 8 }} sm={{ span: 4 }}>
            <StyledButton
              selected={selectedButton === Options.COUNTRY}
              borderradius={Rounded.LEFT}
              onClick={() => setSelectedButton(Options.COUNTRY)}
            >
              Country
            </StyledButton>
          </Col>
          <Col xs={{ span: 8 }} sm={{ span: 4 }}>
            <StyledButton
              selected={selectedButton === Options.SCHOOL}
              borderradius={Rounded.RIGHT}
              onClick={() => setSelectedButton(Options.SCHOOL)}
            >
              School
            </StyledButton>
          </Col>
        </StyledRow>
        <StyledRow justify="center">
          <Col span={16}>
            <StyledSelect
              placeholder="Search"
              showSearch
              allowClear
              onChange={(value) => setSelectedDropDownValue(value?.toString())}
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
        </StyledRow>
        {/* Cards will go in row */}
        <Row gutter={[12, 24]} justify="center" wrap></Row>
      </Container>
    </>
  );
};

export default DataVisualization;
