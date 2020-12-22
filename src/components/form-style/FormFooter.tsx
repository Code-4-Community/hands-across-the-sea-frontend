import React from 'react';
import { 
    Button, 
    Row, 
    Col, 
    Form
} from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { ContentContainer } from '..';
import styled from 'styled-components';

interface FormFooterProps {
  readonly submit?: boolean;
}

const FooterContainer = styled(ContentContainer)`
    max-width: 960px;
    margin: 0px 0px 0px 120px;
`;


const FormFooter: React.FC<FormFooterProps> = (props) => {

  const saveSubmit = props.submit ? 'Submit' : 'Save Progress';

  return (
    <>
      <FooterContainer>
        <Row>
        <Col flex={8}>
            <Form.Item>
              <Button
                size="large"
                type="text"
                htmlType="submit"
                icon={<ArrowLeftOutlined />}
                ghost
              >
                Prev Section
              </Button>
            </Form.Item>
          </Col>
          <Col flex={8}>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit"
                ghost>
                {saveSubmit}
              </Button>
            </Form.Item>
          </Col>
          <Col flex={8}>
            <Form.Item>
              <Button
                size="large"
                type="text"
                htmlType="submit"
                ghost
              >
                Next Section <ArrowRightOutlined />
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </FooterContainer>
    </>
  );
};

export default FormFooter;
