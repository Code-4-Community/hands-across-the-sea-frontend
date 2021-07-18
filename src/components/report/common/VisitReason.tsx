import React, { useState } from 'react';
import FormPiece from '../../form-style/FormPiece';
import { Col, Input, Row, Select } from 'antd';
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
            <Select
              placeholder="Select a reason"
              onChange={onSelected}
              disabled={!editable}
              defaultValue={otherSelected ? 'Other' : visitReason || undefined}
            >
              {reasons.map((reason, i) => (
                <Select.Option value={reason} key={i}>
                  {reason}
                </Select.Option>
              ))}
            </Select>
            {otherSelected && (
              <Input
                disabled={!editable}
                value={visitReason || ''}
                onChange={(e) => setVisitReason(e.target.value)}
              />
            )}
          </FormPiece>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default VisitReason;
