import { Col, Form, InputNumber, RadioChangeEvent, Row } from 'antd';
import React, { useState } from 'react';
import FormContainer from '../../components/form-style/FormContainer';
import FormPieceBoolean from '../form-style/FormPieceBoolean';
import { ClarifyText, FormTextArea } from '../index';

const TrainingMentorshipInfo: React.FC = () => {
  const [isStudentLibrary, setIsStudentLibrary] = useState<boolean>();
  const [involvedParents, setInvolvedParents] = useState<boolean>();
  const [
    teachersSeekingSupport,
    setTeacherSeekingSupport,
  ] = useState<boolean>();

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
          >
            {isStudentLibrary && (
              <>
                <ClarifyText>How many student librarians?</ClarifyText>
                <Form.Item
                  name="numberOfStudentLibrarians"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <InputNumber placeholder="#" min={1} />
                </Form.Item>
              </>
            )}
            {isStudentLibrary === false && (
              <>
                <ClarifyText>Why not?</ClarifyText>
                <Form.Item
                  name="reasonNoStudentLibrarians"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <FormTextArea placeholder="Please enter the reason here" />
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
          />
        </Col>
      </Row>

      <Row gutter={[0, 24]}>
        <Col flex={24}>
          <FormPieceBoolean
            value={teachersSeekingSupport}
            onChange={handleChangeTeacherSupport}
            note={'Are the teachers seeking support?'}
          >
            {teachersSeekingSupport && (
              <>
                <ClarifyText>What kind?</ClarifyText>
                <Form.Item
                  name="teacherSupport"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <FormTextArea placeholder="Please enter your answer here" />
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
          >
            {involvedParents && (
              <>
                <ClarifyText>Please share examples:</ClarifyText>
                <Form.Item
                  name="parentSupport"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <FormTextArea placeholder="Please enter your answer here" />
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
