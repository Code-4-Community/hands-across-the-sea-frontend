import React from 'react';
import { Helmet } from 'react-helmet';
import { ContentContainer } from '../../components';
import { LinkButton } from '../../components/LinkButton';
import styled from 'styled-components';

const HomeButton = styled(LinkButton)`
  color: black;
  margin: 5em 0;
  font-size: 48px;
  min-height: 65px;
  text-align: center;
`;

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Hands Across The Sea</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <ContentContainer>
        <HomeButton to="/select-school" block>
          Start Form
        </HomeButton>
      </ContentContainer>
    </>
  );
};

export default Home;
