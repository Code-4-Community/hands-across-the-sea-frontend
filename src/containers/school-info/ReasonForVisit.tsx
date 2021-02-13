import React, { useState } from 'react';
import { Form, Select } from 'antd';
import { FormTextArea } from '../../components';
import FormContainer from '../../components/form-style/FormContainer';
import FormPiece from '../../components/form-style/FormPiece';

const { Option } = Select;

const ReasonForVisit: React.FC = () => {
  const [currSelect, setCurrSelected] = useState('');

  const handleChange = (value: any) => {
    setCurrSelected(value.value);
  };

  return (
    <>
      <FormContainer title="Reason For Visit">
        <FormPiece note="What is the purpose for today's visit?">
          <Form.Item name="purpose">
            <Select
              placeholder="Select a reason"
              onChange={handleChange}
              labelInValue
            >
              <Option value="read-aloud/read-time">
                Read aloud / Reading time
              </Option>
              <Option value="award-ceremony-or-handover">
                Award ceremony or handover
              </Option>
              <Option value="new-school-year-library-set-up">
                New school year library set-up
              </Option>
              <Option value="special-event/book-giveaway">
                Special event / Book giveaway
              </Option>
              <Option value="end-of-year-library-clean-up">
                End-of-year library clean-up
              </Option>
              <Option value="student-librarian-training">
                Student librarian training
              </Option>
              <Option value="apprenticeship-training">
                Apprenticeship training
              </Option>
              <Option value="principal-check-in">Principal check-in</Option>
              <Option value="general-check-in">General check-in</Option>
              <Option value="emergency/disaster">Emergency / Disaster</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          {currSelect === 'other' && (
            <Form.Item name="other">
              <FormTextArea
                placeholder="Please enter why here"
                autoSize={{ minRows: 4 }}
              />
            </Form.Item>
          )}
        </FormPiece>
      </FormContainer>
    </>
  );
};

export default ReasonForVisit;
