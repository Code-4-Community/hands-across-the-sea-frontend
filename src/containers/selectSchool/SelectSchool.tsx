import React, { useEffect } from 'react';
import { Col, Form, Row, Select } from 'antd';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import FormFooter from '../../components/form-style/FormFooter';
import { useDispatch, useSelector } from 'react-redux';
import { selectSchools } from './ducks/selectors';
import { loadSchools } from './ducks/thunks';
import { SchoolEntry } from './ducks/types';
import { selectSchoolId } from './ducks/actions';
import { useHistory } from 'react-router';
import { Routes } from '../../App';

interface SelectSchoolForm {
  schoolId: number;
}

const SelectSchool: React.FC = () => {
  const dispatch = useDispatch();
  const availableSchools = useSelector(selectSchools);
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

  return (
    <FormContentContainer>
      <Form name="select-school" onFinish={handleSubmit}>
        <FormContainer title="Select a School">
          <Row gutter={[0, 0]}>
            <Col flex={24}>
              <FormPiece note="Which school will you be monitoring today?">
                <Form.Item name="schoolId" rules={[{ required: true }]}>
                  {availableSchools && (
                    <Select placeholder="Select a school">
                      {availableSchools.map(renderSchoolOption)}
                    </Select>
                  )}
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
