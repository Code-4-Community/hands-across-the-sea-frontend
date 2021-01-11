import React, { useState } from 'react';
import { Row, Col, Form } from 'antd';
import { LinkButton } from '../LinkButton';
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

const paths: string[] = ['/reason-for-visit', 
'/school-info', '/student-book-information', 
'/library-info', '/monitoring-information',
'/training-and-mentoring-information'];

const FormFooter: React.FC<FormFooterProps> = (props) => {
  const saveSubmit = props.submit ? 'Submit' : 'Save Progress';

  const [nextPage, setNextPage] = useState(1);
  const [prevPage, setPrevPage] = useState(-1);

  const handleClickNext = () => {
    setNextPage(nextPage+1);
  }

  const handleClickPrev = () => {
    setPrevPage(nextPage);
  }
  

  return (
    <>
      <FooterContainer>
        <Row>
          <Col flex={8}>
            <Form.Item>
              <LinkButton
                size="large"
                type="text"
                htmlType="submit"
                icon={<ArrowLeftOutlined />}
                ghost
                to={paths[prevPage]}
                onClick={handleClickPrev}
              >
                Prev Section
              </LinkButton>
            </Form.Item>
          </Col>
          <Col flex={8}>
            <Form.Item>
              <LinkButton type="primary" htmlType="submit" ghost>
                {saveSubmit}
              </LinkButton>
            </Form.Item>
          </Col>
          <Col flex={8}>
            <Form.Item>
              <LinkButton 
                size="large" 
                type="text" 
                htmlType="submit" 
                ghost
                to={paths[nextPage]}
                onClick={handleClickNext}>
                Next Section <ArrowRightOutlined />
              </LinkButton>
            </Form.Item>
          </Col>
        </Row>
      </FooterContainer>
    </>
  );
};

export default FormFooter;
