import React from 'react';
import { Radio, Form, Row, Col, Checkbox } from 'antd';
import FormPiece from '../../form-style/FormPiece';
import { FormTextArea } from '../../index';
import FormContainer from '../../form-style/FormContainer';
import { ReadyTimeline } from '../../../containers/library-report/ducks/types';
import FormText from '../../form-style/FormText';

interface ReportWithoutLibraryProps {
  editable?: boolean;
}

const LibraryInfo: React.FC<ReportWithoutLibraryProps> = ({ editable }) => {
  return (
    <FormContainer title="Library Information">
      <Row gutter={[0, 24]}>
        <Col flex={24}>
          <FormPiece note="Why isn't there a library?*">
            <Form.Item
              name="reason"
              rules={[{ required: true, message: 'Required' }]}
            >
              {editable ? (
                <FormTextArea placeholder="Please enter your answer here" />
              ) : (
                <FormText />
              )}
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>

      <Row gutter={[0, 24]}>
        <Col flex={24}>
          <FormPiece note="Is this school working towards a library / do they want a library?*">
            <Form.Item
              name="wantsLibrary"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Radio.Group buttonStyle="solid" disabled={!editable}>
                <Radio.Button value={true}>Yes</Radio.Button>
                <Radio.Button value={false}>No</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>

      <Row gutter={[0, 24]}>
        <Col flex={24}>
          <FormPiece
            addPaddingBottom={21}
            note="Does this school have a designated space for a library?*"
          >
            <Form.Item
              name="hasSpace"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Radio.Group buttonStyle="solid" disabled={!editable}>
                <Radio.Button value={true}>Yes</Radio.Button>
                <Radio.Button value={false}>No</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </FormPiece>
        </Col>
      </Row>
      <Row gutter={[0, 24]}>
        <Col flex={24}>
          <FormPiece note="Where are they in the process? (Check all that apply)*">
            <Form.Item
              name="currentStatus"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Checkbox.Group style={{ width: '100%' }} disabled={!editable}>
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
          <FormPiece note="When would they be ready?*">
            <Form.Item
              name="readyTimeline"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Radio.Group buttonStyle="solid" disabled={!editable}>
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

export default LibraryInfo;
