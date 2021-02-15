import React from 'react';
import { Typography } from 'antd';
import { ContentContainer, Outer, Inner } from '..';
import styled from 'styled-components';

const { Title } = Typography;

/*
const FormTitle = styled(Title)`
  text-align: center;
  margin: 24px 0px 0px 0px;
`;

const ChildrenContainer = styled.div`
  max-width: 960px;
`;*/

const LoginTitle = styled(Title)`
  font-weight: bold;
  text-align: center;
`;

const Container = styled(ContentContainer)`
  max-width: 448px;
`;

const LoginContainer: React.FC = (props) => {
  return (
    <Container>
      <LoginTitle level={2}>Log In</LoginTitle>
      <Outer>
        <Inner>{props.children}</Inner>
      </Outer>
    </Container>
  );
};

export default LoginContainer;
