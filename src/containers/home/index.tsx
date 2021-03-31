import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Outer } from '../../components';
import { Col, Row, Typography } from 'antd';
import { FormOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Routes } from '../../App';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const HeadTitle = styled(Title)`
  font-weight: bold;
  padding: 50px 0 30px 0;
  text-align: center;
`;

const MenuOption = styled(Link)`
  padding: 15px 20px 15px 20px;
  background-color: white;
  border-radius: 5px;
  display: block;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const MenuTitleContainer = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;

const MenuTitle = styled(Title)`
  font-size: 26px !important;
  margin: auto 12px !important;
`;

const MenuDescription = styled(Paragraph)`
  font-size: 16px !important;
  margin: 12px 0 0 0 !important;
`;

const iconStyle = {
  color: 'black',
  fontSize: '36px',
  margin: 'auto 4px',
};

interface MenuButtonProps {
  readonly to: string;
  readonly title: string;
  readonly description: string;
}

const MenuButton: React.FC<MenuButtonProps> = (props) => {
  return (
    <MenuOption to={Routes.SELECT_SCHOOL}>
      <MenuTitleContainer>
        {props.children}
        <MenuTitle>{props.title}</MenuTitle>
      </MenuTitleContainer>
      <MenuDescription>{props.description}</MenuDescription>
    </MenuOption>
  );
};

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Hands Across The Sea</title>
        <meta name="description" content="Description goes here." />
      </Helmet>

      <Container>
        <HeadTitle level={2}>Welcome</HeadTitle>
        <Outer>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <MenuButton
                to={Routes.SELECT_SCHOOL}
                title={'Fill Out a Form'}
                description={'Fill out an active form'}
              >
                <FormOutlined style={iconStyle} />
              </MenuButton>
            </Col>

            <Col span={12}>
              <MenuButton
                to={Routes.TODO}
                title={'Account Settings'}
                description={'View and edit your account'}
              >
                <PoweroffOutlined style={iconStyle} />
              </MenuButton>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col span={12}>
              <MenuButton
                to={Routes.TODO}
                title={'Form History'}
                description={'View past forms'}
              >
                <FormOutlined style={iconStyle} />
              </MenuButton>
            </Col>

            <Col span={12}>
              <MenuButton
                to={Routes.TODO}
                title={'Sign Out'}
                description={'Sign out of your account'}
              >
                <PoweroffOutlined style={iconStyle} />
              </MenuButton>
            </Col>
          </Row>
        </Outer>
      </Container>
    </>
  );
};

export default Home;
