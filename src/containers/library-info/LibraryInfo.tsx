import React, { useState } from 'react';
import { Radio, Form, Row, Col, RadioChangeEvent } from 'antd';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import FormFooter from '../../components/form-style/FormFooter';
import FormPiece from '../../components/form-style/FormPiece';
import FormContainer from '../../components/form-style/FormContainer';
import { Routes } from '../../App';

const LibraryInfo: React.FC = () => {
  const [hasLibrary, setHasLibrary] = useState<boolean>();

  const handleLibraryStatus = (event: RadioChangeEvent) => {
    setHasLibrary(event.target.value === true || event.target.value === 'IP');
  };

  const routeNext = hasLibrary
    ? Routes.REPORT_WITH_LIBRARY
    : Routes.REPORT_WITHOUT_LIBRARY;

  return (
    <FormContentContainer>
      <Form>
        <FormContainer title="Library Information">
          <Row gutter={[0, 24]}>
            <Col flex={24}>
              <FormPiece note="Is there a library?">
                <Form.Item name="isThereLibrary">
                  <Radio.Group
                    buttonStyle="solid"
                    onChange={handleLibraryStatus}
                  >
                    <Radio.Button value={true}>Yes</Radio.Button>
                    <Radio.Button value={false}>No</Radio.Button>
                    <Radio.Button value={'IP'}>In Progress</Radio.Button>
                    {/* For our purposes, "Yes" === "In Progress" */}
                  </Radio.Group>
                </Form.Item>
              </FormPiece>
            </Col>
          </Row>
        </FormContainer>
        <FormFooter next={routeNext} disableNext={hasLibrary == null} />
      </Form>
    </FormContentContainer>
  );
};

export default LibraryInfo;
