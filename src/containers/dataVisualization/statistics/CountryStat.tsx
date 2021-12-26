import React, { useState } from 'react';
import { StyledRow } from '../../../components/dataVisualization';
import { Col, Row, Select } from 'antd';
import SelectDropDown from '../../../components/dataVisualization/SelectDropDown';
import { Countries } from '../../../utils/countries';
import { convertEnumToRegularText } from '../../../utils/helpers';

const CountryStat: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined,
  );

  return (
    <>
      <StyledRow justify="center">
        <Col span={16}>
          <SelectDropDown
            selectedButton={'country'}
            setSelectedDropDownValue={setSelectedCountry}
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
      <Row gutter={[12, 24]} justify="center" wrap></Row>
    </>
  );
};

export default CountryStat;
