import React from 'react';
import { ContentContainer, SectionTitle } from '..';
import styled from 'styled-components';

interface FormContainerProps {
  title: String;
}

const Outer = styled.div`
  background-color: #d4d9e7;
  padding: 32px 32px 32px 32px;
  border-radius: 5px;
`;

const FormContainer: React.FC<FormContainerProps> = (props) => {
  return (
    <ContentContainer>
      <SectionTitle level={4}>{props.title}</SectionTitle>
      <Outer>
        {props.children}
      </Outer>
    </ContentContainer>
  );
};

export default FormContainer;
