import React, { useState } from 'react';
import { Col, Form, Row, Select } from 'antd';
import FormContainer from '../../components/form-style/FormContainer';
import FormItemDropdown from '../form-style/FormItemDropdown';
import FormItemInput from 'antd/es/form/FormItemInput';
import FormPiece from '../form-style/FormPiece';
import { FormTextArea } from '../index';

interface PurposeOfVisitProps {
  input: keyof typeof reasons;
  onChanged: (input: keyof typeof reasons) => void;
}

const reasons = {
  'read-aloud/read-time': 'Read aloud / Reading time',
  'award-ceremony-or-handover': 'Award ceremony or handover',
  'new-school-year-library-set-up': 'New school year library set-up',
  'special-event/book-giveaway': 'Special event / Book giveaway',
  'end-of-year-library-clean-up': 'End-of-year library clean-up',
  'student-librarian-training': 'Apprenticeship training',
  'principal-check-in': 'Principal check-in',
  'general-check-in': 'General check-in',
  'emergency-disaster': 'Emergency / Disaster',
  other: 'Other',
};

const PurposeOfVisit: React.FC<PurposeOfVisitProps> = ({
  input,
  onChanged,
}) => {
  const handleChange = (event: any) => {
    onChanged(event.target.value);
  };

  return (
    <FormContainer title="Reason for Visit">
      <Row>
        <Col flex={24}>
          <FormPiece note="What is the purpose for today's visit?">
            <Form.Item name="purpose">
              <Select
                placeholder="Select a reason"
                value={input}
                onChange={handleChange}
                labelInValue
              >
                {Object.entries(reasons).map(([key, value]) => (
                  <Select.Option value={key} key={key}>{value}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            {input === 'other' && (
              <Form.Item name="other">
                <FormTextArea
                  placeholder="Please enter why here"
                  autoSize={{ minRows: 4 }}
                />
              </Form.Item>
            )}
          </FormPiece>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default MonitoringInfo;
