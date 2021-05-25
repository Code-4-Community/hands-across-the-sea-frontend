import React, { useEffect } from 'react';
import { Button, Col, Form, Row, Select } from 'antd';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import { useDispatch, useSelector } from 'react-redux';
import { loadSchools } from './ducks/thunks';
import { SchoolEntry } from './ducks/types';
import { selectSchoolId } from './ducks/actions';
import { useHistory } from 'react-router';
import { Routes } from '../../App';
import { C4CState } from '../../store';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';

interface SelectSchoolForm {
  schoolId: number;
}

const SelectSchool: React.FC = () => {
  const dispatch = useDispatch();
  const availableSchools: AsyncRequest<SchoolEntry[], any> = useSelector(
    (state: C4CState) => state.selectSchoolState.schools,
  );
  const history = useHistory();

  useEffect(() => {
    dispatch(loadSchools());
  }, [dispatch]);

  const handleSubmit = (values: SelectSchoolForm) => {
    dispatch(selectSchoolId(values.schoolId));
    history.push(Routes.SCHOOL_INFO);
  };

  const renderSchoolOption = (school: SchoolEntry) => (
    <Select.Option value={school.id}>{school.name}</Select.Option>
  );

  switch (availableSchools.kind) {
    case AsyncRequestKinds.NotStarted:
    case AsyncRequestKinds.Loading:
      return <p>Loading schools...</p>;
    case AsyncRequestKinds.Failed:
      return <p>An error occurred loading schools</p>;
    case AsyncRequestKinds.Completed:
      return (
        <FormContentContainer>
          <Form name="select-school" onFinish={handleSubmit}>
            <FormContainer title="Select a School">
              <Row gutter={[0, 0]}>
                <Col flex={24}>
                  <FormPiece note="Which school will you be monitoring today?">
                    <Form.Item name="schoolId" rules={[{ required: true }]}>
                      <Select placeholder="Select a school"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option: any) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                      }>
                        {availableSchools.result.map(renderSchoolOption)}
                      </Select>
                    </Form.Item>
                  </FormPiece>
                </Col>
              </Row>
              <Row>
                <Col flex={8}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" ghost>
                      Next
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </FormContainer>
          </Form>
        </FormContentContainer>
      );
  }
};

export default SelectSchool;
