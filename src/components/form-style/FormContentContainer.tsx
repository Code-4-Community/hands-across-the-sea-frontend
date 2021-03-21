import React from 'react';
import { Row, Col, Typography } from 'antd';
import { ContentContainer } from '..';
import styled from 'styled-components';

interface FormContentContainerProps {
  // used when the NO flow is selected to
  // prevent further form filling out
  readonly disableLastTwo?: boolean;
}

const { Title } = Typography;

const FormTitle = styled(Title)`
  text-align: center;
  margin: 24px 0px 0px 0px;
`;

const ChildrenContainer = styled.div`
  max-width: 960px;
`;

const FormContentContainer: React.FC<FormContentContainerProps> = (props) => {
  return (
    <ContentContainer>
      <Row gutter={[0, 32]}>
        <Col flex={24}>
          <FormTitle level={2}>Library Monitoring Form</FormTitle>
        </Col>
      </Row>
      <Row>
        <Col span={19}>
          <ChildrenContainer>{props.children}</ChildrenContainer>
        </Col>
      </Row>
    </ContentContainer>
  );
};

export default FormContentContainer;
