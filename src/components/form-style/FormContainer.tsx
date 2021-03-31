import React from 'react';
import { Container, ContentContainer, Outer, SectionTitle } from '..';
import styled from 'styled-components';

interface FormContainerProps {
  // title of form section
  readonly title: string;
}

const FormContainer: React.FC<FormContainerProps> = (props) => {
  return (
    <Container>
      <SectionTitle level={4}>{props.title}</SectionTitle>
      <Outer>{props.children}</Outer>
    </Container>
  );
};

export default FormContainer;
