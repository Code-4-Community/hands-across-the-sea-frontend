import React from 'react';
import { Row, Col, Form, Button } from 'antd';
import { LinkButton } from '../LinkButton';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { ContentContainer } from '..';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface FormFooterProps {
  // used to change text from "Save" to "Submit"
  readonly areAbleToSubmit?: boolean;
  readonly prev?: string;
  readonly next?: string;
  readonly disablePrev?: boolean;
  readonly disableNext?: boolean;
}

const FooterContainer = styled(ContentContainer)`
  max-width: 960px;
  margin: 0 0 0 120px;
`;

const paths: string[] = [
  '/select-school',
  '/school-info',
  '/library-info',
  // library info decides which report form is next
  // '/student-book-information',
  // '/monitoring-information',
  // '/training-and-mentoring-information',
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

  const location = useLocation();
  const page = location.pathname;

  const nextPage = props.next || getPage('next', page);
  const prevPage = props.prev || getPage('prev', page);

  return (
    <FooterContainer>
      <Row>
        <Col flex={8}>
          <Form.Item>
            <LinkButton to={prevPage} disabled={props.disablePrev}>
              Prev Section
              <ArrowLeftOutlined />
            </LinkButton>
          </Form.Item>
        </Col>
        <Col flex={8}>
          <Form.Item>
            <Button type="primary" htmlType="submit" ghost>
              {saveSubmit}
            </Button>
          </Form.Item>
        </Col>
        <Col flex={8}>
          <Form.Item>
            <LinkButton to={nextPage} disabled={props.disableNext}>
              Next Section <ArrowRightOutlined />
            </LinkButton>
          </Form.Item>
        </Col>
      </Row>
    </FooterContainer>
  );
};

export default FormFooter;
