import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
const { Title } = Typography;

/*
Template for future page components.

AntD Components:
https://ant.design/components/overview/
*/

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Hands Across The Sea</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        <Title>Oops! We can't find the page you're looking for.</Title>

        <Link to="/">
          <Typography.Link>Take me back home!</Typography.Link>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
