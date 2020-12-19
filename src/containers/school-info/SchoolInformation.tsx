import React from 'react'
import {
    Form,
    Input,
    Row,
    Col
} from 'antd';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';

const { TextArea } = Input;

const SchoolInformation: React.FC = () => {
    
    return (
        <FormContainer title="School Information">
            <FormPiece firstPiece={true} lastPiece={false} note="School Address">
                <Form.Item name="streetAddress">
                    <Input placeholder="Street Address"/>
                </Form.Item>  
                <Form.Item name="townDistrict">
                    <Input placeholder="Town or District"/>
                </Form.Item>  
                <Form.Item name="instructions">
                    <TextArea minLength={2} placeholder="Any Specific Instructions?"/>
                </Form.Item>  
            </FormPiece>
            <FormPiece firstPiece={false} lastPiece={true} note="School Contact Information">
                <Row>
                    <Col span={11}>
                        <Form.Item name="phoneNumber">
                            <Input placeholder="Phone Number" />
                        </Form.Item>
                    </Col>
                    <Col span={2} />
                    <Col span={11}>
                        <Form.Item name="email">
                            <Input placeholder="Email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="otherContactInfo">
                    <TextArea minLength={2} placeholder="Anything Else"/>
                </Form.Item>  
            </FormPiece>
        </FormContainer>
    )
}

export default SchoolInformation;
