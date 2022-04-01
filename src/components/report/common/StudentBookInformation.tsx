import { Checkbox, Col, Form, InputNumber, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import FormContainer from '../../form-style/FormContainer';
import FormPiece from '../../form-style/FormPiece';
import { Grade } from '../../../containers/library-report/ducks/types';
import { toTitleCase } from '../../../utils/helpers';
import FormText from '../../form-style/FormText';
import { useQuery } from 'react-query';
import protectedApiClient from '../../../api/protectedApiClient';
import { useSelector } from 'react-redux';
import { C4CState } from '../../../store';

const InputNumberNoArrows = styled(InputNumber)`
  .ant-input-number-handler-wrap {
    display: none;
  }
`;

interface StudentBookInformationProps {
  editable?: boolean;
}

const StudentBookInformation: React.FC<StudentBookInformationProps> = ({
  editable,
}) => {
  const gradeOptions = Object.entries(Grade).map(([key, value]) => ({
    label: toTitleCase(key.replace('_', ' ')),
    value,
  }));
  const schoolId: number | undefined = useSelector(
    (state: C4CState) => state.selectSchoolState.selectedSchoolId,
  );

  const { isLoading, data, error } = useQuery(
    ['getAllSchools'],
    () => protectedApiClient.getSchool(schoolId as number),
    {
      enabled: schoolId !== undefined,
    },
  );

  return (
    <>
      {isLoading && <p>Section is loading...</p>}
      {(data || error) && (
        <FormContainer title="Student and Book Information">
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <FormPiece note="How Many Children attended?*">
                <Form.Item
                  name="numberOfChildren"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  {editable ? (
                    <InputNumberNoArrows
                      defaultValue={data ? data.totalStudents : undefined}
                      placeholder="#"
                      min={0}
                    />
                  ) : (
                    <FormText />
                  )}
                </Form.Item>
              </FormPiece>
            </Col>
            <Col span={12}>
              <FormPiece note="How Many Books?">
                <Form.Item name="numberOfBooks">
                  {editable ? (
                    <InputNumberNoArrows placeholder="#" min={0} disabled />
                  ) : (
                    <FormText />
                  )}
                </Form.Item>
              </FormPiece>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col span={12}>
              <FormPiece note="What grades attended?*">
                <Form.Item
                  name="gradesAttended"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Checkbox.Group disabled={!editable} options={gradeOptions} />
                </Form.Item>
              </FormPiece>
            </Col>
            <Col span={12}>
              <FormPiece note="Most recent shipment year?">
                <Form.Item name="mostRecentShipmentYear">
                  {editable ? (
                    <InputNumberNoArrows placeholder="#" min={0} disabled />
                  ) : (
                    <FormText />
                  )}
                </Form.Item>
              </FormPiece>
            </Col>
          </Row>
        </FormContainer>
      )}
    </>
  );
};

export default StudentBookInformation;
