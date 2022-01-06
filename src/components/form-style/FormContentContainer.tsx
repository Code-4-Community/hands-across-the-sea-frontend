import React from 'react';
import { Col, Row, Typography } from 'antd';
import { ContentContainer } from '..';
import styled from 'styled-components';

interface FormContentContainerProps {
  // used when the NO flow is selected to
  // prevent further form filling out
  readonly disableLastTwo?: boolean;
  readonly title?: string;
}

const { Title } = Typography;

export const FormTitle = styled(Title)`
  text-align: center;
  margin: 24px 0 0 0;
`;

const ChildrenContainer = styled.div`
  max-width: 960px;
  margin: auto;
`;

const FormContentContainer: React.FC<FormContentContainerProps> = (props) => {
  return (
    <ContentContainer>
      <Row gutter={[0, 32]}>
        <Col flex={24}>
          <FormTitle level={2}>
            {props.title || 'Library Monitoring Form'}
          </FormTitle>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ChildrenContainer>{props.children}</ChildrenContainer>
        </Col>
      </Row>
    </ContentContainer>
  );
};

export default FormContentContainer;
