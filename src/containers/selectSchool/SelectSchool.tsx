import { Col, Form, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  default as protectedApiClient,
  default as ProtectedApiClient,
} from '../../api/protectedApiClient';
import { Routes } from '../../App';
import { getPrivilegeLevel, getUserID } from '../../auth/ducks/selectors';
import { PrivilegeLevel } from '../../auth/ducks/types';
import FormButtons from '../../components/form-style/FormButtons';
import FormContainer from '../../components/form-style/FormContainer';
import FormContentContainer from '../../components/form-style/FormContentContainer';
import FormPiece from '../../components/form-style/FormPiece';
import { C4CState } from '../../store';
import { GetUserResponse } from '../settings/ducks/types';
import { selectSchoolId } from './ducks/actions';
import { SchoolEntry } from './ducks/types';

interface SelectSchoolForm {
  schoolId: number;
}

const SelectSchool: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error, data } = useQuery(
    'schools',
    protectedApiClient.getAllSchools,
  );

  const history = useHistory();
  const [formValues, setFormValues] = useState({} as any);
  const [userInfo, setUserInfo] = useState<GetUserResponse>(
    {} as GetUserResponse,
  );
  const userId = useSelector((state: C4CState) => {
    return getUserID(state.authenticationState.tokens);
  });

  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) => {
    return getPrivilegeLevel(state.authenticationState.tokens);
  });

  useEffect(() => {
    ProtectedApiClient.getUser()
      .then(setUserInfo)
      .catch((err) => err);
  }, [userId]);

  const submitDisabled = !formValues.schoolId;

  const handleSubmit = (values: SelectSchoolForm) => {
    dispatch(selectSchoolId(values.schoolId));
    history.push(Routes.SCHOOL_INFO);
  };

  const renderSchoolOption = (school: SchoolEntry) => (
    <Select.Option value={school.id}>{school.name}</Select.Option>
  );

  return (
    <>
      {(isLoading || Object.keys(userInfo).length === 0) && (
        <p>Loading schools...</p>
      )}
      {error && <p>An error occurred loading schools</p>}
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
                  <FormPiece note="Which school will you be monitoring today?">
                    <Form.Item name="schoolId" rules={[{ required: true }]}>
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
                        {data
                          .filter(
                            (school) =>
                              privilegeLevel === PrivilegeLevel.ADMIN ||
                              school.country === userInfo.country,
                          )
                          .map(renderSchoolOption)}
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

export default SelectSchool;
