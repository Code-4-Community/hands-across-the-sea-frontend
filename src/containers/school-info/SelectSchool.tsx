import React from 'react'
import {
    Form,
    Select,
    Row,
    Col
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
            <Row gutter={[0,0]}>
                <Col flex={24}>
                    <FormPiece note="Which school will you be monitoring today?">
                        <Form.Item name="school">
                            <Select>
                            <Option value="1">One option</Option>
                            </Select>
                        </Form.Item>
                    </FormPiece>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default SelectSchool;
