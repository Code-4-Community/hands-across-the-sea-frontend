import React, { useState } from 'react'
import {
    Form,
    Input,
    Row,
    Col,
    Radio,
    Typography
} from 'antd';
import { ClarifyText, FormTextArea } from '../../components';
import { PlusCircleOutlined } from '@ant-design/icons';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';
import AddContact from './AddContact';
import styled from 'styled-components';

const { Title } = Typography;

const AddContactContainer = styled(FormPiece)`
    font-size: 32px;
`;

const MakeRight = styled.div`
    text-align: right;
`;

const PointerChange = styled.div`
    cursor: pointer;

    &:hover {
        font-weight: bold;
        font-size: 15px;
    }

`;


const SchoolInformation: React.FC = () => {

    const [extraContacts, setExtraContacts] = useState<any []>([]);

    const removeExtraContact = (ii: number) => {
        extraContacts.splice(ii - 1, 1);
        setExtraContacts(extraContacts);
    }

    const addExtraContact = () => {
        let ii = extraContacts.length + 1;
        setExtraContacts(extraContacts.concat(<AddContact onDelete={removeExtraContact} index={ii}/>));
    }
    
    return (
        <FormContainer title="School Information">
            <FormPiece firstPiece note="School Address">
                <Form.Item name="schoolStreetAddress">
                    <Input placeholder="Street Address"/>
                </Form.Item>  
                <Form.Item name="schoolTownDistrict">
                    <Input placeholder="Town or District"/>
                </Form.Item>  
                <Form.Item name="schoolInstructions">
                    <FormTextArea minLength={2} placeholder="Any Specific Instructions?"/>
                </Form.Item>  
            </FormPiece>
            <FormPiece note="School Contact Information">
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
                    <FormTextArea minLength={2} placeholder="Anything Else"/>
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
            <FormPiece note="Literacy Coordinator Contact Information">
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
            <FormPiece note="Librarian Contact Information">
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
            {extraContacts}
            <PointerChange>
                <AddContactContainer lastPiece limitPadding onClick={addExtraContact}>
                    <Row>
                        <Col span={12}>
                                <ClarifyText>Any Addition Contacts to Add?</ClarifyText>
                        </Col>
                        <Col span={12}>
                            <MakeRight>
                                <PlusCircleOutlined />
                            </MakeRight>
                        </Col>
                    </Row>
                </AddContactContainer>
            </PointerChange>
        </FormContainer>
    )
}

export default SchoolInformation;
