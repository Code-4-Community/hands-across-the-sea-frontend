import React from 'react';
import { Helmet } from 'react-helmet';
import { ContentContainer } from '../../components';
import { LinkButton } from '../../components/LinkButton';
import styled from 'styled-components';

const HomeButton = styled(LinkButton)`
  color: black;
  margin: 5em 0;
  font-size: 48px;
`;

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Title goes here</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <ContentContainer>
        <HomeButton to="/reason-for-visit" block>Start Form</HomeButton>
      </ContentContainer>
    </>
  );
};

export default Home;
