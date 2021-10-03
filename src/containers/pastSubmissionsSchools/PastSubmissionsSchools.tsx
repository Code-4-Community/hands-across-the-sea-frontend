import { Col, Form, Row, Select } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import protectedApiClient from '../../api/protectedApiClient';
import { Routes } from '../../App';
import FormButtons from '../../components/form-style/FormButtons';
import FormContainer from '../../components/form-style/FormContainer';
import { SchoolSummaryResponse } from './ducks/types';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import FormPiece from '../../components/form-style/FormPiece';
import { setPastSubmissionsSchoolId } from './ducks/actions';

interface SelectPasSubmissionSchoolForm {
  pastSubmissionsSchoolId: number;
}

const PastSubmissionsSchools: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, error, data } = useQuery(
    'pastSubmissionsSchools',
    protectedApiClient.getPastSubmissionSchools,
  );

  const renderSchoolOption = (school: SchoolSummaryResponse) => (
    <Select.Option value={school.id}>{school.name}</Select.Option>
  );

  const handleSubmit = (values: SelectPasSubmissionSchoolForm) => {
    dispatch(setPastSubmissionsSchoolId(values.pastSubmissionsSchoolId));
    history.push(Routes.PAST_SUBMISSIONS_REPORTS);
  };

  const [formValues, setFormValues] = useState({} as any);
  const submitDisabled = !formValues.pastSubmissionsSchoolId;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>An error occurred loading past submissions</p>}
      {data && (
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
                        {Array.from(data.schools).map(renderSchoolOption)}
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
      )}
    </>
  );
};

export default PastSubmissionsSchools;
