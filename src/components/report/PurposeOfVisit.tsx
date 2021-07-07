import React from 'react';
import { Form, Select } from 'antd';
import FormPiece from '../form-style/FormPiece';
import { FormTextArea } from '../index';

interface PurposeOfVisitProps {
  setPurposeOfVisitSelection: (purposeOfVisit: string) => void;
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
  purposeOfVisit,
}) => {
  return (
    <FormPiece note="What is the purpose for today's visit?" lastPiece>
      <Form.Item name="visitReason">
        <Select
          placeholder="Select a reason"
          onChange={setPurposeOfVisitSelection}
        >
          {reasons.map((reason, i) => (
            <Select.Option value={reason} key={i}>
              {reason}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {purposeOfVisit === 'Other' && (
        <Form.Item name={'otherVisitReason'}>
          <FormTextArea
            placeholder="Please enter why here"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
      )}
    </FormPiece>
  );
};

export default PurposeOfVisit;
