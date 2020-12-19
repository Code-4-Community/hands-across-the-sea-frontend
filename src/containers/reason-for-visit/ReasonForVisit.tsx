import React, { useState } from 'react';
import { 
    Form, 
    Input, 
    Select,
    Button
} from 'antd';
import { 
    ContentContainer,
    SectionTitle,
    ClarifyText
} from '../../components';
import FormContainer from '../../components/form-style/FormContainer';
import FormFooter from '../../components/form-style/FormFooter';

const { Option } = Select;
const { TextArea } = Input;

const ReasonForVisit: React.FC = () => {

    const [selected, setSelected] = useState('');
    const [currSelect, setCurrSelected] = useState('');

    const handleChange = (value: any) => {
        setCurrSelected(value.value);
        setSelected(value.label);
    }

    const handleSubmit = (event: any) => {
        console.log(event);
    }

  return (
    <>
      <ContentContainer>
          <Form 
            name="reason-to-visit"
            onFinish={handleSubmit}>
              <FormContainer title="Reason For Visit">
              <ClarifyText>
                      What is the purpose for today's visit?
              </ClarifyText>
              <Form.Item name="purpose">
                  <Select 
                    onChange={handleChange}
                    labelInValue>
                      <Option value="read-aloud/read-time">Read aloud / Reading time</Option>
                      <Option value="award-ceremony-or-handover">Award ceremony or handover</Option>
                      <Option value="new-school-year-library-set-up">New school year library set-up</Option>
                      <Option value="special-event/book-giveaway">Special event / Book giveaway</Option>
                      <Option value="end-of-year-library-clean-up">End-of-year library clean-up</Option>
                      <Option value="student-librarian-training">Student librarian training</Option>
                      <Option value="apprenticeship-training">Apprenticeship training</Option>
                      <Option value="principal-check-in">Principal check-in</Option>
                      <Option value="general-check-in">General check-in</Option>
                      <Option value="emergency/disaster">Emergency / Disaster</Option>
                      <Option value="other">Other</Option>
                  </Select>
              </Form.Item>
              {currSelect === 'other' && 
                <Form.Item name="other">
                    <TextArea 
                        placeholder="Please enter why here"
                        autoSize={{ minRows: 4 }}/>
                </Form.Item>}
                </FormContainer>
            <FormFooter />
          </Form>
      </ContentContainer>
    </>
  );
};

export default ReasonForVisit;
