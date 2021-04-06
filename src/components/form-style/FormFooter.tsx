import React from 'react';
import { Row, Col, Form, Button } from 'antd';
import { LinkButton } from '../LinkButton';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { ContentContainer } from '..';
import styled from 'styled-components';
import { Routes } from '../../App';

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
  display: flex;
`;

const FooterInner = styled.div`
  width: 100%;
`;

const FormFooter: React.FC<FormFooterProps> = (props) => {
  const disablePrevious = props.disablePrev || props.prev == null;
  const disableNext =
    props.areAbleToSubmit || props.disableNext || props.next == null;

  return (
    <FooterContainer>
      <FooterInner>
        <Row justify={'space-around'}>
          <Col>
            <Form.Item>
              <LinkButton
                to={props.prev || Routes.HOME}
                disabled={disablePrevious}
              >
                Prev Section
                <ArrowLeftOutlined />
              </LinkButton>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              {props.areAbleToSubmit ? (
                <Button type="primary" htmlType="submit" ghost>
                  Submit
                </Button>
              ) : (
                <LinkButton
                  to={props.next || Routes.HOME}
                  disabled={disableNext}
                >
                  Next Section <ArrowRightOutlined />
                </LinkButton>
              )}
            </Form.Item>
          </Col>
        </Row>
      </FooterInner>
    </FooterContainer>
  );
};

export default FormFooter;
