import React from 'react';
import { Radio, Form, Row, Col, Checkbox } from 'antd';
import FormPiece from '../../components/form-style/FormPiece';
import { FormTextArea } from '../../components';
import FormContainer from '../../components/form-style/FormContainer';
import { ReadyTimeline } from './ducks/types';

const ReportWithoutLibrary: React.FC = () => {
  return (
    <FormContainer title="Library Information">
      <Row gutter={[0, 24]}>
        <Col flex={24}>
          <FormPiece note="Why isn't there a library?">
            <Form.Item name="reasonWhyNot" required>
              <FormTextArea placeholder="Please enter your answer here" />
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>

      <Row gutter={[0, 24]}>
        <Col flex={24}>
          <FormPiece note="Is this school working towards a library / do they want a library?">
            <Form.Item name="wantsLibrary">
              <Radio.Group buttonStyle="solid">
                <Radio.Button value={true}>Yes</Radio.Button>
                <Radio.Button value={false}>No</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>

      <Row gutter={[0, 24]}>
        <Col flex={24}>
          <Row gutter={[24, 0]}>
            <FormPiece
              addPaddingBottom={21}
              note="Does this school have a designated space for a library?"
            >
              <Form.Item name="hasSpace">
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value={true}>Yes</Radio.Button>
                  <Radio.Button value={false}>No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </FormPiece>
          </Row>
        </Col>
      </Row>
      <Row gutter={[0, 24]}>
        <Col flex={24}>
          <FormPiece note="Where are they in the process? (Check all that apply)">
            <Form.Item name="currentStatus">
              <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="found-a-space">Found a space</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="looking-for-a-space">
                      Looking for a space
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="have-a-space-but-no-books">
                      Have a space, but no books
                    </Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Checkbox value="working-on-convincing-principal">
                      Working on convincing principal
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="need-furniture">Need furniture</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="starting-the-conversation">
                      Starting the conversation
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>

      <Row gutter={[0, 0]}>
        <Col flex={24}>
          <FormPiece note="When would they be ready?">
            <Form.Item name="readyTimeline">
              <Radio.Group buttonStyle="solid">
                <Radio.Button value={ReadyTimeline.UPCOMING_SCHOOL_YEAR}>
                  Upcoming School Year
                </Radio.Button>
                <Radio.Button value={ReadyTimeline.YEAR_AFTER_NEXT}>
                  Year After Next
                </Radio.Button>
                <Radio.Button value={ReadyTimeline.MORE_THAN_TWO_YEARS}>
                  More Than 2 Years Out
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ReportWithoutLibrary;
