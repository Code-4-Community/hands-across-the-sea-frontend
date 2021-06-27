import { Col, Form, Radio, RadioChangeEvent, Row } from 'antd';
import React, { useState } from 'react';
import FormContainer from '../../components/form-style/FormContainer';
import FormItemDropdown from '../../components/form-style/FormItemDropdown';
import FormPiece from '../../components/form-style/FormPiece';
import FormPieceBoolean from '../../components/form-style/FormPieceBoolean';
import {
  ApprenticeshipProgram,
  AssignedPersonRole,
  AssignedPersonTitle,
} from './ducks/types';

const ReportWithLibrary: React.FC = () => {
  const [hasAssignedPerson, setHasAssignedPerson] = useState<boolean>();

  const handleChangeAssignedLibrary = (event: RadioChangeEvent) => {
    const hasPerson =
      event.target.value === AssignedPersonRole.FULL_TIME ||
      event.target.value === AssignedPersonRole.PART_TIME;
    setHasAssignedPerson(hasPerson);
  };

  const bottomGutter = 24;

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
                  'What is the title of this person assigned to the library?'
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
          <FormPiece note="Does this school have a known apprenticeship program in the library? If so, select which program:">
            <FormItemDropdown
              optionsEnum={ApprenticeshipProgram}
              name={'apprenticeshipProgram'}
              text={'Select a program'}
            />
          </FormPiece>
        </Col>
      </Row>

      <Row gutter={[0, 0]}>
        <Col flex={24}>
          <FormPieceBoolean
            name={'trainsAndMentorsApprentices'}
            note={'Do you train and mentor the apprentices in the library?'}
          />
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ReportWithLibrary;
