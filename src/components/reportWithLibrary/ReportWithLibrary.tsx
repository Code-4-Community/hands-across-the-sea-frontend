import {
  ApprenticeshipProgram,
  AssignedPersonRole,
  AssignedPersonTitle,
  ReportWithLibraryRequest,
  ReportWithLibraryResponse,
} from '../../containers/reportWithLibrary/ducks/types';
import React, { useState } from 'react';
import { Col, Form, Radio, RadioChangeEvent, Row } from 'antd';
import FormPiece from '../form-style/FormPiece';
import FormContainer from '../form-style/FormContainer';
import FormContentContainer from '../form-style/FormContentContainer';
import FormFooter from '../form-style/FormFooter';
import FormPieceBoolean from '../form-style/FormPieceBoolean';
import FormItemDropdown from '../form-style/FormItemDropdown';
import MonitoringInfo from '../report/MonitoringInfo';
import TrainingMentorshipInfo from '../report/TrainingMentorshipInfo';
import StudentBookInformation from '../report/StudentBookInformation';
import { Routes } from '../../App';

interface ReportWithLibraryProps {
  defaultReportWithLibrary?: ReportWithLibraryResponse | null;
  readonly onSubmit: (r: ReportWithLibraryRequest) => void;
}

const ReportWithLibrary: React.FC<ReportWithLibraryProps> = (props) => {
  const initialState =
    props.defaultReportWithLibrary ||
    ({
      numberOfChildren: null,
      numberOfBooks: null,
      mostRecentShipmentYear: null,
      isSharedSpace: null,
      hasInvitingSpace: null,
      assignedPersonRole: null,
      assignedPersonTitle: null,
      apprenticeshipProgram: null,
      trainsAndMentorsApprentices: null,
      hasCheckInTimetables: null,
      hasBookCheckoutSystem: null,
      numberOfStudentLibrarians: null,
      reasonNoStudentLibrarians: null,
      hasSufficientTraining: null,
      teacherSupport: null,
      parentSupport: null,
      visitReason: null,
    } as ReportWithLibraryRequest);

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
    <FormContentContainer>
      <Form initialValues={initialState} onFinish={props.onSubmit}>
        <StudentBookInformation />

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
                    <Radio.Button value={AssignedPersonRole.NONE}>
                      No
                    </Radio.Button>
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
                name={'haveApprenticeProgram'}
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
                  note={
                    'Do you train and mentor the apprentices in the library'
                  }
                />
              </Col>
            </Row>
          )}
        </FormContainer>

        <MonitoringInfo />
        <TrainingMentorshipInfo />

        <FormFooter
          areAbleToSubmit={true}
          prev={Routes.LIBRARY_INFO}
          disableNext={true}
        />
      </Form>
    </FormContentContainer>
  );
};

export default ReportWithLibrary;
