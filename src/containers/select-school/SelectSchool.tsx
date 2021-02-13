import React from 'react';
import { Form, Select, Row, Col } from 'antd';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import FormFooter from '../../components/form-style/FormFooter';

const { Option } = Select;

const SelectSchool: React.FC = () => {
  const handleSubmit = (event: any) => {
    // console.log(event);
  };

  return (
    <FormContentContainer>
      <Form name="select-school" onFinish={handleSubmit}>
        <FormContainer title="Select the School">
          <Row gutter={[0, 0]}>
            <Col flex={24}>
              <FormPiece note="Which school will you be monitoring today?">
                <Form.Item name="school">
                  <Select placeholder="Select a school">
                    <Option value="1">One option</Option>
                  </Select>
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

export default SelectSchool;
