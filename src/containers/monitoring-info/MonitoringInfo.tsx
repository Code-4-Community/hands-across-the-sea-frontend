import React from 'react';
import { Radio, Form, Row, Col } from 'antd';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import FormFooter from '../../components/form-style/FormFooter';
import FormPiece from '../../components/form-style/FormPiece';
import FormContainer from '../../components/form-style/FormContainer';

const MonitoringInfo: React.FC = () => {
  return (
    <FormContentContainer>
      <Form>
        <FormContainer title="Monitoring Information">
          <Row gutter={[0, 0]}>
            <Col flex={24}>
              <Row gutter={[24, 0]}>
                <Col span={12}>
                  <FormPiece note="Does this library keep classroom check-in timetables?">
                    <Form.Item name="doesLibraryKeepCheckInTimetable">
                      <Radio.Group buttonStyle="solid">
                        <Radio.Button value="yes">Yes</Radio.Button>
                        <Radio.Button value="no">No</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                  </FormPiece>
                </Col>
                <Col span={12}>
                  <FormPiece note="Does the library have a system for book checkouts?">
                    <Form.Item name="doesLibraryBookCheckOutSystem">
                      <Radio.Group buttonStyle="solid">
                        <Radio.Button value="yes">Yes</Radio.Button>
                        <Radio.Button value="no">No</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                  </FormPiece>
                </Col>
              </Row>
            </Col>
          </Row>
        </FormContainer>
        <FormFooter />
      </Form>
    </FormContentContainer>
  );
};

export default MonitoringInfo;
