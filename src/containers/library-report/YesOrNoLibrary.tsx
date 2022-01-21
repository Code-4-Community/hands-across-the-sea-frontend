import React from 'react';
import { Col, Form, Radio, RadioChangeEvent, Row } from 'antd';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import FormPiece from '../../components/form-style/FormPiece';
import FormContainer from '../../components/form-style/FormContainer';
import { Routes } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { setIsYesReport } from './ducks/actions';
import { LinkButton } from '../../components/LinkButton';
import { ArrowRightOutlined } from '@ant-design/icons';
import { C4CState } from '../../store';


const YesOrNoLibrary: React.FC = () => {
  const dispatch = useDispatch();
  const isYesReport = useSelector(
    (state: C4CState) => state.libraryReportState.isYesReport,
  );

  const handleLibraryStatus = (event: RadioChangeEvent) => {
    dispatch(
      setIsYesReport(
        event.target.value === true || event.target.value === 'IP',
      ),
    );
  };

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
                    defaultValue={isYesReport}
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
          <Row gutter={[0, 24]}>
            <LinkButton
              to={Routes.LIBRARY_REPORT}
              disabled={isYesReport === undefined}
            >
              Next <ArrowRightOutlined />
            </LinkButton>
          </Row>
        </FormContainer>
      </Form>
    </FormContentContainer>
  );
};

export default YesOrNoLibrary;
