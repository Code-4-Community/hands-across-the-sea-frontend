import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Radio,
  Col,
  Empty,
  Row,
  Select,
  Typography,
  RadioChangeEvent,
} from 'antd';
import { Countries } from '../../utils/countries';
import { convertEnumToRegularText } from '../../utils/helpers';
import { SchoolEntry } from '../selectSchool/ducks/types';
import { DataManagerOptions } from './types';

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

const StyledRow = styled(Row)`
  margin-bottom: 20px;
`;

const StyledSelect = styled(Select)`
  width: 100%;
`;

const DataVisualization: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState(
    DataManagerOptions.TOTAL,
  );
  const [schools, setSchools] = useState<SchoolEntry[]>([]);
  const [selectedDropDownValue, setSelectedDropDownValue] = useState<
    string | undefined
  >(undefined);

  /*const availableSchools: AsyncRequest<SchoolEntry[], any> = useSelector(
    (state: C4CState) => state.selectSchoolState.schools,
  );

  useEffect(() => {
    if (availableSchools.kind === AsyncRequestKinds.Completed) {
      setSchools(availableSchools.result);
    }
  }, [availableSchools]);*/

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
        {selectedButton !== DataManagerOptions.TOTAL && (
          <StyledRow justify="center">
            <Col span={16}>
              <StyledSelect
                placeholder="Search"
                showSearch
                allowClear
                onChange={(value) =>
                  setSelectedDropDownValue(value?.toString())
                }
                notFoundContent={
                  <Empty
                    description={
                      <span>{`No ${selectedButton.toLocaleLowerCase()} data found`}</span>
                    }
                  />
                }
              >
                {selectedButton === DataManagerOptions.COUNTRY
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
        )}
        {/* Cards will go in row */}
        <Row gutter={[12, 24]} justify="center" wrap></Row>
      </Container>
    </>
  );
};

export default DataVisualization;
