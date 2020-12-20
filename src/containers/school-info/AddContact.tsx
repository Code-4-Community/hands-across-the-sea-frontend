import React, { useState } from 'react'
import {
    Form,
    Input,
    Row,
    Col,
    Radio,
} from 'antd';
import { ClarifyText } from '../../components';
import FormPiece from '../../components/form-style/FormPiece';
import styled from 'styled-components';

interface AddContactProps {
    index: number;
    onDelete: (ii: number) => void;
}

const AddContact: React.FC<AddContactProps> = (props) => {

    const note = 'Other Contact ' + props.index;
    const firstName = 'otherFirstName' + props.index;
    const lastName = 'otherLastName' + props.index;
    const phoneNumber = 'otherPhoneNumber' + props.index;
    const email = 'otherEmail' + props.index;
    const contactType = 'otherContactType' + props.index;

    const handleDelete = () => {
        props.onDelete(props.index);
    }

    return (
        <FormPiece additionalPiece removeAdditionPiece={handleDelete} note={note}>
            <Row>
                <Col span={11}>
                    <Form.Item name={firstName}>
                        <Input placeholder="First Name" />
                    </Form.Item>
                </Col>
                <Col span={2} />
                <Col span={11}>
                    <Form.Item name={lastName}>
                        <Input placeholder="Last Name" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={11}>
                    <Form.Item name={phoneNumber}>
                        <Input placeholder="Phone Number" />
                    </Form.Item>
                </Col>
                <Col span={2} />
                <Col span={11}>
                    <Form.Item name={email}>
                        <Input placeholder="Email" />
                    </Form.Item>
                </Col>
            </Row>
            <ClarifyText>Is this person a primary or secondary contact?</ClarifyText>
            <Form.Item name={contactType}>
                <Radio.Group buttonStyle="solid">
                    <Radio.Button value="primary">Primary</Radio.Button>
                    <Radio.Button value="secondary">Secondary</Radio.Button>
                </Radio.Group>
            </Form.Item>
        </FormPiece>
    )
}

export default AddContact;
