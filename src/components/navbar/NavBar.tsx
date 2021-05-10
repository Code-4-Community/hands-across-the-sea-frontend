import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Routes } from '../../App';
import { Link } from 'react-router-dom';

const NavRow = styled(Row)`
  background-color: #294186;
`;

const HeadTitle = styled.h1`
  font-weight: bold;
  color: white;
  font-size: 32px;
  margin: 0;
  padding: 16px 16px;
  user-select: none;
`;

const Header: React.FC = () => (
  <NavRow>
    <Col>
      <Link to={Routes.HOME}>
        <HeadTitle>Hands Across The Sea</HeadTitle>
      </Link>
    </Col>
  </NavRow>
);
export default Header;
