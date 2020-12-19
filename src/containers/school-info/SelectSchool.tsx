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
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';

const { Option } = Select;


const SelectSchool: React.FC = () => {
    
    return (
        <FormContainer title="Select the School">
            <FormPiece firstPiece lastPiece note="Which school will you be monitoring today?">
                <Form.Item>
                    <Select>
                       <Option value="1">One option</Option>
                    </Select>
                </Form.Item>
            </FormPiece>
        </FormContainer>
    )
}

export default SelectSchool;
