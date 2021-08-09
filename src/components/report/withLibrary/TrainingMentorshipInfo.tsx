import { Col, Form, InputNumber, RadioChangeEvent, Row } from 'antd';
import React, { useState } from 'react';
import FormContainer from '../../form-style/FormContainer';
import FormPieceBoolean from '../../form-style/FormPieceBoolean';
import { ClarifyText, FormTextArea } from '../../index';
import FormText from '../../form-style/FormText';
import { LibraryReportResponse } from '../../../containers/library-report/ducks/types';

interface TrainingMentorshipInfoProps {
  editable?: boolean;
  report?: LibraryReportResponse;
}

const TrainingMentorshipInfo: React.FC<TrainingMentorshipInfoProps> = ({
  editable,
  report,
}) => {
  const numStudentLibrarians =
    report?.libraryStatus === 'EXISTS' && report?.numberOfStudentLibrarians;
  const [isStudentLibrary, setIsStudentLibrary] = useState<boolean | undefined>(
    report ? !!numStudentLibrarians : undefined,
  );
  const [involvedParents, setInvolvedParents] = useState<boolean | undefined>(
    report
      ? report?.libraryStatus === 'EXISTS' && !!report?.parentSupport
      : undefined,
  );
  const [teachersSeekingSupport, setTeacherSeekingSupport] = useState<
    boolean | undefined
  >(
    report
      ? report?.libraryStatus === 'EXISTS' && !!report?.teacherSupport
      : undefined,
  );

  const handleChangeStudentLibrarians = (event: RadioChangeEvent) => {
    setIsStudentLibrary(event.target.value);
  };

  const handleChangeTeacherSupport = (event: RadioChangeEvent) => {
    setTeacherSeekingSupport(event.target.value);
  };

  const handleChangeInvolvedParents = (event: RadioChangeEvent) => {
    setInvolvedParents(event.target.value);
  };

  return (
    <FormContainer title="Training and Mentorship Information">
      <Row gutter={[0, 24]}>
        <Col flex={24}>
          <FormPieceBoolean
            value={isStudentLibrary}
            note={'Is there a student librarian program?'}
            onChange={handleChangeStudentLibrarians}
            disabled={!editable}
          >
            {isStudentLibrary && (
              <>
                <ClarifyText>How many student librarians?</ClarifyText>
                <Form.Item name="numberOfStudentLibrarians">
                  {editable ? (
                    <InputNumber placeholder="#" min={1} />
                  ) : (
                    <FormText />
                  )}
                </Form.Item>
              </>
            )}
            {isStudentLibrary === false && (
              <>
                <ClarifyText>Why not?</ClarifyText>
                <Form.Item name="reasonNoStudentLibrarians">
                  {editable ? (
                    <FormTextArea placeholder="Please enter the reason here" />
                  ) : (
                    <FormText />
                  )}
                </Form.Item>
              </>
            )}
          </FormPieceBoolean>
        </Col>
      </Row>

      <Row gutter={[0, 24]}>
        <Col flex={24}>
          <FormPieceBoolean
            name={'hasSufficientTraining'}
            note={
              'Has the library (at least two teacher) had sufficient training with the Library Manual and the Teachers Resource Guide?'
            }
            disabled={!editable}
          />
        </Col>
      </Row>

      <Row gutter={[0, 24]}>
        <Col flex={24}>
          <FormPieceBoolean
            value={teachersSeekingSupport}
            onChange={handleChangeTeacherSupport}
            note={'Are the teachers seeking support?'}
            disabled={!editable}
          >
            {teachersSeekingSupport && (
              <>
                <ClarifyText>What kind?</ClarifyText>
                <Form.Item name="teacherSupport">
                  {editable ? (
                    <FormTextArea placeholder="Please enter your answer here" />
                  ) : (
                    <FormText />
                  )}
                </Form.Item>
              </>
            )}
          </FormPieceBoolean>
        </Col>
      </Row>

      <Row gutter={[0, 24]}>
        <Col flex={24}>
          <FormPieceBoolean
            value={involvedParents}
            onChange={handleChangeInvolvedParents}
            note={
              'Has the school involved the students parents in the use of the library?'
            }
            disabled={!editable}
          >
            {involvedParents && (
              <>
                <ClarifyText>Please share examples:</ClarifyText>
                <Form.Item name="parentSupport">
                  {editable ? (
                    <FormTextArea placeholder="Please enter your answer here" />
                  ) : (
                    <FormText />
                  )}
                </Form.Item>
              </>
            )}
          </FormPieceBoolean>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default TrainingMentorshipInfo;
