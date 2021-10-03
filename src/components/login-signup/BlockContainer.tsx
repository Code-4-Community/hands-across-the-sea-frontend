import React from 'react';
import { Typography } from 'antd';
import { ContentContainer, Outer, Inner } from '..';
import styled from 'styled-components';

const { Title } = Typography;

const LoginTitle = styled(Title)`
  font-weight: bold;
  text-align: center;
`;

const Container = styled(ContentContainer)`
  max-width: 448px;
`;

interface BlockContainer {
  readonly title: string;
}

const BlockContainer: React.FC<BlockContainer> = ({ title, children }) => {
  return (
    <Container>
      <LoginTitle level={2}>{title}</LoginTitle>
      <Outer>
        <Inner>{children}</Inner>
      </Outer>
    </Container>
  );
};

export default BlockContainer;
