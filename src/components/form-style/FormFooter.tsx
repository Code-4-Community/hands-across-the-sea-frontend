import React from 'react';
import { Row, Col, Form } from 'antd';
import { LinkButton } from '../LinkButton';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { ContentContainer } from '..';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface FormFooterProps {
  // used to change text from "Save" to
  // "Submit"
  readonly areAbleToSubmit?: boolean;
}

const FooterContainer = styled(ContentContainer)`
  max-width: 960px;
  margin: 0px 0px 0px 120px;
`;

const paths: string[] = [
  '/select-school',
  '/school-info',
  '/student-book-information',
  '/library-info',
  '/monitoring-information',
  '/training-and-mentoring-information',
];

function getPage(type: string, currPage: string): string {
  if (type === 'next' || type === 'prev') {
    const edge = type === 'next' ? paths.length - 1 : 0;
    let inc;
    for (let ii = 0; ii < paths.length; ii++) {
      inc = type === 'next' ? ii + 1 : ii - 1;
      if (paths[ii] === currPage) {
        if (ii === edge) {
          return paths[ii];
        } else {
          return paths[inc];
        }
      }
    }
    return 'error';
  } else {
    return 'error';
  }
}

const FormFooter: React.FC<FormFooterProps> = (props) => {
  const saveSubmit = props.areAbleToSubmit ? 'Submit' : 'Save Progress';

  let location = useLocation();
  const page = location.pathname;

  const nextPage = getPage('next', page);
  const prevPage = getPage('prev', page);

  return (
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
              to={prevPage}
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
              to={nextPage}
            >
              Next Section <ArrowRightOutlined />
            </LinkButton>
          </Form.Item>
        </Col>
      </Row>
    </FooterContainer>
  );
};

export default FormFooter;
