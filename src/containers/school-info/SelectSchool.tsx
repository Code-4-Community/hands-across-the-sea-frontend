import React from 'react'
import {
    Form,
    Select
} from 'antd';
import { 
    ContentContainer, 
    SectionTitle,
    ClarifyText
} from '../../components';
import FormFooter from '../../components/FormFooter';

const { Option } = Select;


const SelectSchool: React.FC = () => {
    return (
        <ContentContainer>
            <SectionTitle level={4}>
                Select the School
            </SectionTitle>
            <Form name="select-school">
                <ClarifyText>
                    Which school will you be monitoring today?
                </ClarifyText>
                <Select>
                    <Option value="1">One option</Option>
                </Select>
                <FormFooter/>
            </Form>
        </ContentContainer>
    )
}

export default SelectSchool;
