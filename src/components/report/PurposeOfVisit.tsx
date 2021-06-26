import { Col, Form, Row, Select } from 'antd';
import React from 'react';
import FormContainer from '../../components/form-style/FormContainer';
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
            <Form.Item
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
              name="purpose"
            >
              <Select
                placeholder="Select a reason"
                value={input}
                onChange={handleChange}
                labelInValue
              >
                {Object.entries(reasons).map(([key, value]) => (
                  <Select.Option value={key} key={key}>
                    {value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {input === 'other' && (
              <Form.Item
                name="other"
                rules={[{ required: true, message: 'This field is required' }]}
              >
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

export default PurposeOfVisit;
