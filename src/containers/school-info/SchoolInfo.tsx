import React from 'react';
import { Form, Row, Col } from 'antd';
import FormFooter from '../../components/form-style/FormFooter';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import ReasonForVisit from './ReasonForVisit';
import SchoolInformation from './SchoolInformation';
import { Routes } from '../../App';

const SchoolInfo: React.FC = () => {
  const handleSubmit = (event: any): void => {
    // console.log(event);
  };

  return (
    <FormContentContainer>
      <Row>
        <Col>
          <Form name="school-info" onFinish={handleSubmit}>
            <ReasonForVisit />
            <SchoolInformation />
            <FormFooter next={Routes.LIBRARY_INFO} />
          </Form>
        </Col>
      </Row>
    </FormContentContainer>
  );
};

export default SchoolInfo;
