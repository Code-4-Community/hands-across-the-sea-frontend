import React, { useEffect, useState } from 'react';
import FormContainer from '../../components/form-style/FormContainer';
import { Col, Form, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import { SchoolSummaryResponse } from './ducks/types';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import FormPiece from '../../components/form-style/FormPiece';
import FormButtons from '../../components/form-style/FormButtons';
import Loading from '../../components/Loading';
import { setPastSubmissionsSchoolId } from './ducks/actions';
import { Routes } from '../../App';
import { useHistory } from 'react-router';
import { SchoolEntry } from '../selectSchool/ducks/types';
import { loadSchools } from '../selectSchool/ducks/thunks';
import { Container } from '../../components';
import BackButton from '../../components/BackButton';

interface SelectPasSubmissionSchoolForm {
  pastSubmissionsSchoolId: number;
}

const PastSubmissionsSchools: React.FC = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const availableSchools: AsyncRequest<SchoolEntry[], any> = useSelector(
    (state: C4CState) => state.selectSchoolState.schools,
  );

  useEffect(() => {
    dispatch(loadSchools());
  }, [dispatch]);

  const renderSchoolOption = (school: SchoolSummaryResponse) => (
    <Select.Option value={school.id}>{school.name}</Select.Option>
  );

  const handleSubmit = (values: SelectPasSubmissionSchoolForm) => {
    dispatch(setPastSubmissionsSchoolId(values.pastSubmissionsSchoolId));
    history.push(Routes.PAST_SUBMISSIONS_REPORTS);
  };

  const [formValues, setFormValues] = useState({} as any);
  const submitDisabled = !formValues.pastSubmissionsSchoolId;

  switch (availableSchools.kind) {
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Failed:
      return <p>An error occurred loading past submissions</p>;
    case AsyncRequestKinds.Loading:
      return <Loading title={'Past Submissions'} />;
    case AsyncRequestKinds.Completed:
      return (
        <Container>
          <BackButton />
          <FormContentContainer>
            <Form
              name="select-school"
              onFinish={handleSubmit}
              onValuesChange={setFormValues}
            >
              <FormContainer title="Select a School">
                <Row gutter={[0, 0]}>
                  <Col flex={24}>
                    <FormPiece note="Which school would you like to see past reports of?">
                      <Form.Item
                        name="pastSubmissionsSchoolId"
                        rules={[{ required: true }]}
                      >
                        <Select
                          placeholder="Select a school"
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option: any) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          filterSort={(optionA, optionB) =>
                            optionA.children
                              .toLowerCase()
                              .localeCompare(optionB.children.toLowerCase())
                          }
                        >
                          {Array.from(availableSchools.result).map(
                            renderSchoolOption,
                          )}
                        </Select>
                      </Form.Item>
                    </FormPiece>
                  </Col>
                </Row>
              </FormContainer>
              <FormButtons>
                <FormButtons.Button
                  text="Next"
                  type="primary"
                  isSubmit
                  disabled={submitDisabled}
                />
              </FormButtons>
            </Form>
          </FormContentContainer>
        </Container>
      );
  }
};

export default PastSubmissionsSchools;
