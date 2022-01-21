import React from 'react';
import { ContentContainer, SectionTitle } from '..';
import styled from 'styled-components';

interface FormContainerProps {
  // title of form section
  readonly title: string;
}

export const Outer = styled.div`
  background-color: rgb(80, 188, 190, 0.75);
  padding: 32px 32px 32px 32px;
  border-radius: 5px;
`;

export const Container = styled(ContentContainer)`
  max-width: 960px;
`;

const FormContainer: React.FC<FormContainerProps> = (props) => {
  return (
    <Container>
      <SectionTitle level={4}>{props.title}</SectionTitle>
      <Outer>{props.children}</Outer>
    </Container>
  );
};

export default FormContainer;
