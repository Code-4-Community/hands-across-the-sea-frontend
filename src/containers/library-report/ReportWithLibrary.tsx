import {
  ApprenticeshipProgram,
  AssignedPersonRole,
  AssignedPersonTitle,
} from './ducks/types';
import React, { useState } from 'react';
import { Col, Form, Radio, RadioChangeEvent, Row } from 'antd';
import FormPiece from '../../components/form-style/FormPiece';
import FormContainer from '../../components/form-style/FormContainer';
import FormPieceBoolean from '../../components/form-style/FormPieceBoolean';
import FormItemDropdown from '../../components/form-style/FormItemDropdown';

const ReportWithLibrary: React.FC = () => {
  const [hasAssignedPerson, setHasAssignedPerson] = useState<boolean>();
  const [hasApprenticeship, setHasApprenticeship] = useState<boolean>();

  const handleChangeAssignedLibrary = (event: RadioChangeEvent) => {
    const hasPerson =
      event.target.value === AssignedPersonRole.FULL_TIME ||
      event.target.value === AssignedPersonRole.PART_TIME;
    setHasAssignedPerson(hasPerson);
  };

  const handleChangeApprenticeship = (event: RadioChangeEvent) => {
    setHasApprenticeship(event.target.value);
  };

  const bottomGutter = !hasApprenticeship ? 0 : 24;

  return (
    <FormContainer title="Library Information">
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <FormPieceBoolean
            addPaddingBottom={22}
            name={'isSharedSpace'}
            textTrue={'Shared space'}
            textFalse={'Only library'}
            note={'Is the library only a library, or shared space?'}
          />
        </Col>
        <Col span={12}>
          <FormPieceBoolean
            name={'hasInvitingSpace'}
            textTrue={'Yes'}
            textFalse={'No'}
            note={
              'Does the library have inviting places for ' +
              'children and teacher to sit and read?'
            }
          />
        </Col>
      </Row>

      <Row>
        <Col flex={24}>
          <FormPiece note="Is someone assigned to this school's library?">
            <Form.Item name="assignedPersonRole">
              <Radio.Group
                buttonStyle="solid"
                onChange={handleChangeAssignedLibrary}
              >
                <Radio.Button value={AssignedPersonRole.FULL_TIME}>
                  Yes, full time
                </Radio.Button>
                <Radio.Button value={AssignedPersonRole.PART_TIME}>
                  Yes, part time
                </Radio.Button>
                <Radio.Button value={AssignedPersonRole.NONE}>No</Radio.Button>
              </Radio.Group>
            </Form.Item>

            {hasAssignedPerson && (
              <FormItemDropdown
                clarifyText={
                  'What is the title of this peron assigned to the library?'
                }
                optionsEnum={AssignedPersonTitle}
                name={'assignedPersonTitle'}
                text={'Select the title'}
              />
            )}
          </FormPiece>
        </Col>
      </Row>

      <Row gutter={[0, bottomGutter]}>
        <Col flex={24}>
          <FormPieceBoolean
            onChange={handleChangeApprenticeship}
            note={
              'Does this school have a known apprenticeship program in the library?'
            }
          >
            {hasApprenticeship && (
              <FormItemDropdown
                optionsEnum={ApprenticeshipProgram}
                name={'apprenticeshipProgram'}
                text={'Select the program'}
              />
            )}
          </FormPieceBoolean>
        </Col>
      </Row>

      {hasApprenticeship && (
        <Row gutter={[0, 0]}>
          <Col flex={24}>
            <FormPieceBoolean
              name={'trainsAndMentorsApprentices'}
              note={'Do you train and mentor the apprentices in the library?'}
            />
          </Col>
        </Row>
      )}
    </FormContainer>
  );
};

export default ReportWithLibrary;
