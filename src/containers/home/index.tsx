import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Outer } from '../../components';
import { Col, Row, Typography } from 'antd';
import {
  FolderOpenOutlined,
  FormOutlined,
  PoweroffOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  BulbOutlined,
  DatabaseOutlined,
  FolderOpenOutlined,
  FormOutlined,
  PoweroffOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Routes } from '../../App';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout } from '../../auth/ducks/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { PrivilegeLevel } from '../../auth/ducks/types';
import { C4CState } from '../../store';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { useHistory } from 'react-router-dom';

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

const MenuOptionDiv = styled.div`
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
    <MenuOption to={props.to}>
      <MenuTitleContainer>
        {props.children}
        <MenuTitle>{props.title}</MenuTitle>
      </MenuTitleContainer>
      <MenuDescription>{props.description}</MenuDescription>
    </MenuOption>
  );
};

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const dispatch = useDispatch();
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) => {
    return getPrivilegeLevel(state.authenticationState.tokens);
  });

  return (
    <>
      <Helmet>
        <title>Hands Across The Sea</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <Container>
        <HeadTitle level={2}>Welcome</HeadTitle>
        <Outer>
          <Row gutter={[32, 24]} wrap>
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
                <UserOutlined style={iconStyle} />
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
                <FolderOpenOutlined style={iconStyle} />
              </MenuButton>
            </Col>

          {privilegeLevel === PrivilegeLevel.ADMIN && (
            <Row gutter={[32, 48]} wrap>
              <Col span={12}>
                <InContain
                  onClick={() => {
                    history.push(Routes.SCHOOL_DIRECTORY);
                  }}
                >
                  <Row>
                    <Col span={8}>
                      <DatabaseOutlined
                        style={{
                          fontSize: '50px',
                          marginTop: '14px',
                          marginLeft: '5px',
                        }}
                      />
                    </Col>
                    <Col span={16}>
                      <Row>
                        <Col>
                          <ButtonDescription level={3}>
                            School Directory
                          </ButtonDescription>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Paragraph>View and registered schools</Paragraph>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </InContain>
              </Col>
              <Col span={12}>
                <InContain
                  onClick={() => {
                    history.push(Routes.SETTINGS);
                  }}
                >
                  <Row>
                    <Col span={8}>
                      <TeamOutlined
                        style={{
                          fontSize: '50px',
                          marginTop: '14px',
                          marginLeft: '5px',
                        }}
                      />
                    </Col>
                    <Col span={16}>
                      <Row>
                        <Col>
                          <ButtonDescription level={3}>
                            User Directory
                          </ButtonDescription>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Paragraph>View and registered users</Paragraph>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </InContain>
              </Col>
            </Row>
          )}
          <Row gutter={[32, 0]} wrap>
            {privilegeLevel === PrivilegeLevel.ADMIN ? (
              <Col span={12}>
                <InContain
                  onClick={() => {
                    history.push(Routes.SETTINGS);
                  }}
                >
                  <Row>
                    <Col span={8}>
                      <BulbOutlined
                        style={{
                          fontSize: '50px',
                          marginTop: '14px',
                          marginLeft: '5px',
                        }}
                      />
                    </Col>
                    <Col span={16}>
                      <Row>
                        <Col>
                          <ButtonDescription level={3}>
                            Data Insights
                          </ButtonDescription>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Paragraph>View past forms</Paragraph>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </InContain>
              </Col>
            ) : (
              <Col span={12}>
                <InContain
                  onClick={() => {
                    history.push(Routes.SETTINGS);
                  }}
                >
                  <Row>
                    <Col span={8}>
                      <FolderOpenOutlined
                        style={{
                          fontSize: '50px',
                          marginTop: '14px',
                          marginLeft: '5px',
                        }}
                      />
                    </Col>
                    <Col span={16}>
                      <Row>
                        <Col>
                          <ButtonDescription level={3}>
                            Form History
                          </ButtonDescription>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Paragraph>View past forms</Paragraph>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </InContain>
              </Col>
            )}
            <Col span={12}>
              <MenuOptionDiv onClick={() => dispatch(logout())}>
                <MenuTitleContainer>
                  <MenuTitle>Sign Out</MenuTitle>
                </MenuTitleContainer>
                <MenuDescription>Sign out of your account</MenuDescription>
              </MenuOptionDiv>
            </Col>
          </Row>
        </Outer>
      </Container>
    </>
  );
};

export default Home;
