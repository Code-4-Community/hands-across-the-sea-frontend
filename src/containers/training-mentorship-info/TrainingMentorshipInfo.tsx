import React, { useState } from 'react';
import { Radio, Form, Input, Row, Col } from 'antd';
import { ClarifyText, FormTextArea } from '../../components';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import FormFooter from '../../components/form-style/FormFooter';
import FormPiece from '../../components/form-style/FormPiece';
import FormContainer from '../../components/form-style/FormContainer';

const LibraryInfo: React.FC = () => {
  const [isStudentLibrary, setIsStudentLibrary] = useState<string>('');
  const [teachersSeekingSupport, setTeacherSeekingSupport] = useState<boolean>(
    false,
  );
  const [involvedParents, setInvolvedParents] = useState<boolean>(false);

  const handleChangeStudentLibrarians = (event: any) => {
    setIsStudentLibrary(event.target.value);
  };

  const handleChangeTeacherSupport = (event: any) => {
    setTeacherSeekingSupport(event.target.value === 'yes');
  };

  const handleChangeInvolvedParents = (event: any) => {
    setInvolvedParents(event.target.value === 'yes');
  };

  return (
    <FormContentContainer>
      <Form>
        <FormContainer title="Training and Mentorship Information">
          <Row gutter={[0, 24]}>
            <Col flex={24}>
              <FormPiece note="Is there a student librarian program?">
                <Form.Item name="isThereStudentLibraryProgram">
                  <Radio.Group
                    buttonStyle="solid"
                    onChange={handleChangeStudentLibrarians}
                  >
                    <Radio.Button value="yes">Yes</Radio.Button>
                    <Radio.Button value="no">No</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                {isStudentLibrary === 'yes' && (
                  <div>
                    <ClarifyText>How many student librarians?</ClarifyText>
                    <Form.Item name="howManyStudentLibrarians">
                      <Input placeholder="Please enter student librarians?" />
                    </Form.Item>
                  </div>
                )}
                {isStudentLibrary === 'no' && (
                  <div>
                    <ClarifyText>Why not?</ClarifyText>
                    <Form.Item name="whyNoStudentLibraryProgram">
                      <FormTextArea placeholder="Please enter your answer here" />
                    </Form.Item>
                  </div>
                )}
              </FormPiece>
            </Col>
          </Row>

          <Row gutter={[0, 24]}>
            <Col flex={24}>
              <FormPiece note="Has the library (at least two teacher) had sufficient training with the Library Manual and the Teachers Resource Guide?">
                <Form.Item name="hasLibraryHadTrainingWithManualOrGuide">
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="yes">Yes</Radio.Button>
                    <Radio.Button value="no">No</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </FormPiece>
            </Col>
          </Row>

          <Row gutter={[0, 24]}>
            <Col flex={24}>
              <FormPiece note="Are the teachers seeking support?">
                <Form.Item name="areTeachersSeekingSupport">
                  <Radio.Group
                    buttonStyle="solid"
                    onChange={handleChangeTeacherSupport}
                  >
                    <Radio.Button value="yes">Yes</Radio.Button>
                    <Radio.Button value="no">No</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                {teachersSeekingSupport && (
                  <div>
                    <ClarifyText>What kind?</ClarifyText>
                    <Form.Item name="kindOfTeacherSupport">
                      <FormTextArea placeholder="Please enter your answer here" />
                    </Form.Item>
                  </div>
                )}
              </FormPiece>
            </Col>
          </Row>

          <Row gutter={[0, 24]}>
            <Col flex={24}>
              <FormPiece note="Has the school involved the students parents in the use of the library?">
                <Form.Item name="hasSchoolInvolvedParentsInLibraryUse">
                  <Radio.Group
                    buttonStyle="solid"
                    onChange={handleChangeInvolvedParents}
                  >
                    <Radio.Button value="yes">Yes</Radio.Button>
                    <Radio.Button value="no">No</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                {involvedParents && (
                  <div>
                    <ClarifyText>Please share examples:</ClarifyText>
                    <Form.Item name="exampleOfParentInvolvement">
                      <FormTextArea placeholder="Please enter your answer here" />
                    </Form.Item>
                  </div>
                )}
              </FormPiece>
            </Col>
          </Row>
        </FormContainer>
        <FormFooter submit />
      </Form>
    </FormContentContainer>
  );
};

export default LibraryInfo;
