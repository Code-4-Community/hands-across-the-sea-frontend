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

const Foot = styled(Row)`
  margin: 0 0 0 145px;
`;


const FormFooter: React.FC = () => {
  return (
    <>
      <ContentContainer>
        <Row>
        <Col span={8}>
            <Form.Item>
              <Button
                size="large"
                type="text"
                icon={<ArrowLeftOutlined />}
                ghost
              >
                Prev Section
              </Button>
            </Form.Item>
          </Col>
          <Col push={3} span={8}>
            <Form.Item>
              <Button 
                type="primary" 
                ghost>
                Save Progress
              </Button>
            </Form.Item>
          </Col>
          <Col push={4} span={8}>
            <Form.Item>
              <Button
                size="large"
                type="text"
                ghost
              >
                Next Section <ArrowRightOutlined />
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </ContentContainer>
    </>
  );
};

export default FormFooter;
