import React from 'react';
import { ContentContainer, SectionTitle } from '..';
import styled from 'styled-components';
import getColorPalette from '../../utils/colors';

interface FormContainerProps {
  // title of form section
  readonly title: string;
}

export const Outer = styled.div`
  background-color: ${getColorPalette().secondary};
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
