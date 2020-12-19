import React from 'react'
import {
    Form,
    Input,
    Row,
    Col,
    Radio
} from 'antd';
import { ClarifyText } from '../../components';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';

const { TextArea } = Input;

const SchoolInformation: React.FC = () => {
    
    return (
        <FormContainer title="School Information">
            <FormPiece firstPiece={true} lastPiece={false} note="School Address">
                <Form.Item name="schoolStreetAddress">
                    <Input placeholder="Street Address"/>
                </Form.Item>  
                <Form.Item name="schoolTownDistrict">
                    <Input placeholder="Town or District"/>
                </Form.Item>  
                <Form.Item name="schoolInstructions">
                    <TextArea minLength={2} placeholder="Any Specific Instructions?"/>
                </Form.Item>  
            </FormPiece>
            <FormPiece firstPiece={false} lastPiece={false} note="School Contact Information">
                <Row>
                    <Col span={11}>
                        <Form.Item name="schoolPhone">
                            <Input placeholder="Phone Number" />
                        </Form.Item>
                    </Col>
                    <Col span={2} />
                    <Col span={11}>
                        <Form.Item name="schoolEmail">
                            <Input placeholder="Email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="schoolOtherContactInfo">
                    <TextArea minLength={2} placeholder="Anything Else"/>
                </Form.Item>  
            </FormPiece>
            <FormPiece firstPiece={false} lastPiece={false} note="Principal or Director Contact Information">
                <Row>
                    <Col span={11}>
                        <Form.Item name="pdFirstName">
                            <Input placeholder="First Name" />
                        </Form.Item>
                    </Col>
                    <Col span={2} />
                    <Col span={11}>
                        <Form.Item name="pdLastName">
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <Form.Item name="pdPhoneNumber">
                            <Input placeholder="Phone Number" />
                        </Form.Item>
                    </Col>
                    <Col span={2} />
                    <Col span={11}>
                        <Form.Item name="pdEmail">
                            <Input placeholder="Email" />
                        </Form.Item>
                    </Col>
                </Row>
                <ClarifyText>Is this person a primary or secondary contact?</ClarifyText>
                <Form.Item name="pdContactType">
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="primary">Primary</Radio.Button>
                        <Radio.Button value="secondary">Secondary</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </FormPiece>
            <FormPiece firstPiece={false} lastPiece={false} note="Literacy Coordinator Contact Information">
                <Row>
                    <Col span={11}>
                        <Form.Item name="lcFirstName">
                            <Input placeholder="First Name" />
                        </Form.Item>
                    </Col>
                    <Col span={2} />
                    <Col span={11}>
                        <Form.Item name="lcLastName">
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <Form.Item name="lcPhoneNumber">
                            <Input placeholder="Phone Number" />
                        </Form.Item>
                    </Col>
                    <Col span={2} />
                    <Col span={11}>
                        <Form.Item name="lcEmail">
                            <Input placeholder="Email" />
                        </Form.Item>
                    </Col>
                </Row>
                <ClarifyText>Is this person a primary or secondary contact?</ClarifyText>
                <Form.Item name="lcContactType">
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="primary">Primary</Radio.Button>
                        <Radio.Button value="secondary">Secondary</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </FormPiece>
            <FormPiece firstPiece={false} lastPiece={false} note="Librarian Contact Information">
                <Row>
                    <Col span={11}>
                        <Form.Item name="llFirstName">
                            <Input placeholder="First Name" />
                        </Form.Item>
                    </Col>
                    <Col span={2} />
                    <Col span={11}>
                        <Form.Item name="llLastName">
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <Form.Item name="llPhoneNumber">
                            <Input placeholder="Phone Number" />
                        </Form.Item>
                    </Col>
                    <Col span={2} />
                    <Col span={11}>
                        <Form.Item name="llEmail">
                            <Input placeholder="Email" />
                        </Form.Item>
                    </Col>
                </Row>
                <ClarifyText>Is this person a primary or secondary contact?</ClarifyText>
                <Form.Item name="llContactType">
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="primary">Primary</Radio.Button>
                        <Radio.Button value="secondary">Secondary</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </FormPiece>
        </FormContainer>
    )
}

export default SchoolInformation;
