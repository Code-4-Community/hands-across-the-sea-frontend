import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Routes } from '../../App';
import { Link } from 'react-router-dom';

const HeadTitle = styled.h1`
  font-weight: bold;
  color: white;
  font-size: 32px;
  margin: 0;
  padding: 16px 16px;
  user-select: none;
`;
// 50bcbe- aqua, rgb(80, 188, 190, 0.75)
// 43619a- darker blue, rgb(67, 97, 154, 0.75)

// ed8235- orange, rgb(237, 130, 53)
// 578de1- blue, rgb(87, 141, 225)
// f8dc61- yellow, rgb(248, 220, 97)

// 9856a2- darker purple, rgb(152, 86, 162)
// cfa7f2- lighter purple, rgb(207, 167, 242)

// 4d7aa1- blue, rgb(77, 122, 161)
// 69dfc3- greenish, rgb(105, 223, 195)

// f092df- darker pink, rgb(240, 146, 223)
// f4bfeb- ligher pink, rgb(244, 191, 235)

// 69dfc3- aqua green, rgb(105, 223, 195)
// 7797bb- lighter blue, rgb(119, 151, 187)
const Header: React.FC = () => {
  let number = '50bcbe';
  const NavRow = styled(Row)`
    background-color: #${number};
  `;
  return (
  <NavRow>
      <Col>
        <Link to={Routes.HOME}>
          <HeadTitle>Hands Across The Sea</HeadTitle>
        </Link>
      </Col>
    </NavRow>
  );
}
export default Header;
