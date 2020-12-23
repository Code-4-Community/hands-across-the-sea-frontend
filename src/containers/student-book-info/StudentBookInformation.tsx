import React from 'react';
import { Form, Row, Col, Input, Radio } from 'antd';
import FormFooter from '../../components/form-style/FormFooter';
import FormContainer from '../../components/form-style/FormContainer';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import FormPiece from '../../components/form-style/FormPiece';

const SchoolInfo: React.FC = () => {
  const handleSubmit = (event: any) => {
    // console.log(event);
  };

  return (
    <FormContentContainer>
      <Form name="student-book-information" onFinish={handleSubmit}>
        <FormContainer title="Student and Book Information">
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <FormPiece note="How Many Children attended?">
                <Form.Item name="childrenAttended">
                  <Input placeholder="Please enter a number" />
                </Form.Item>
              </FormPiece>
            </Col>
            <Col span={12}>
              <FormPiece note="How Many Books?">
                <Form.Item name="booksAmount">
                  <Input placeholder="Please enter a number" />
                </Form.Item>
              </FormPiece>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col span={12}>
              <FormPiece note="What grades attended?">
                <Form.Item name="gradesAttended">
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="grade1">Grade</Radio.Button>
                    <Radio.Button value="grade2">Grade</Radio.Button>
                    <Radio.Button value="grade3">Grade</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </FormPiece>
            </Col>
            <Col span={12}>
              <FormPiece note="Most recent shipment year?">
                <Form.Item name="shipmentYear">
                  <Input placeholder="Please enter a number" />
                </Form.Item>
              </FormPiece>
            </Col>
          </Row>
        </FormContainer>
        <FormFooter />
      </Form>
    </FormContentContainer>
  );
};

export default SchoolInfo;
