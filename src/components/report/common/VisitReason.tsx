import React, { useState } from 'react';
import FormPiece from '../../form-style/FormPiece';
import { Col, Input, Row, Select, Form } from 'antd';
import FormContainer from '../../form-style/FormContainer';

interface VisitReasonProps {
  setVisitReason: (purposeOfVisit: string) => void;
  visitReason?: string | null;
  editable?: boolean;
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

const VisitReason: React.FC<VisitReasonProps> = ({
  setVisitReason,
  visitReason,
  editable,
}) => {
  const [otherSelected, setOtherSelected] = useState(
    visitReason && !reasons.includes(visitReason),
  );

  const onSelected = (value: string) => {
    if (value === 'Other') {
      setOtherSelected(true);
    } else {
      setOtherSelected(false);
      setVisitReason(value);
    }
  };

  return (
    <FormContainer title="Reason for Visit">
      <Row>
        <Col flex={24}>
          <FormPiece note="What is the purpose for today's visit?" lastPiece>
            <Form.Item name="visitReason">
              <Select
                placeholder="Select a reason*"
                onChange={onSelected}
                disabled={!editable}
                defaultValue={
                  otherSelected ? 'Other' : visitReason || undefined
                }
                style={{ width: '300px' }}
              >
                {reasons.map((reason, i) => (
                  <Select.Option value={reason} key={i}>
                    {reason}
                  </Select.Option>
                ))}
              </Select>
              {otherSelected && (
                <>
                  <br />
                  <Input
                    disabled={!editable}
                    value={visitReason || ''}
                    placeholder="Briefly explain..."
                    onChange={(e) => setVisitReason(e.target.value)}
                  />
                </>
              )}
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default VisitReason;
