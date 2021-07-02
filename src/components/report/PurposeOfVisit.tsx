import React, { useState } from 'react';
import { Col, Form, Row, Select } from 'antd';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../form-style/FormPiece';
import { FormTextArea } from '../index';

interface PurposeOfVisitProps {
  setPurposeOfVisitSelection: (purposeOfVisit: string) => void;
  setCustomPurposeOfVisit: (customPurposeOfVisit: string) => void;
  purposeOfVisit: string | null;
}

const reasons = [
  'Read aloud / Reading time',
  'Award ceremony or handover',
  'New school year library set-up',
  'Special event / Book giveaway',
  'End-of-year library clean-up',
  'Apprenticeship training',
  'Principal check-in',
  'General check-in',
  'Emergency / Disaster',
  'Other',
];

const PurposeOfVisit: React.FC<PurposeOfVisitProps> = ({
  setPurposeOfVisitSelection,
  setCustomPurposeOfVisit,
  purposeOfVisit,
}) => {
  const handleChange = (event: any) => {
    setPurposeOfVisitSelection(event.target.value);
  };
  const handleCustomChange = (event: any) => {
    setCustomPurposeOfVisit(event.target.value);
  };

  return (
    <FormContainer title="Reason for Visit">
      <Row>
        <Col flex={24}>
          <FormPiece note="What is the purpose for today's visit?">
            <Form.Item name="visitReason">
              <Select
                placeholder="Select a reason"
                onChange={handleChange}
                labelInValue
              >
                {reasons.map((reason, i) => (
                  <Select.Option value={reason} key={i}>
                    {reason}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {purposeOfVisit === 'Other' && (
              <FormTextArea
                placeholder="Please enter why here"
                onChange={handleCustomChange}
                autoSize={{ minRows: 4 }}
              />
            )}
          </FormPiece>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default PurposeOfVisit;
