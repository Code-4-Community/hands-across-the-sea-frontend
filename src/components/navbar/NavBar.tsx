import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const NavRow = styled(Row)`
  background-color: #294186;
`;

const HeadTitle = styled.h1`
  font-weight: bold;
  color: white;
  font-size: 32px;
  margin: 0;
  padding: 16px 16px;
`;

const Header: React.FC = () => (
  <NavRow>
    <Col>
      <HeadTitle>Hands Across The Sea</HeadTitle>
    </Col>
  </NavRow>
);
export default Header;
