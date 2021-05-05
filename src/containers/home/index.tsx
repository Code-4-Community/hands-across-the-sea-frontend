import React from 'react';
import { Helmet } from 'react-helmet';
import { ContentContainer, Outer } from '../../components';
import { Col, Row, Typography } from 'antd';
import {
  FolderOpenOutlined,
  FormOutlined,
  PoweroffOutlined,
  UserOutlined,
  DatabaseOutlined,
  TeamOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { Routes } from '../../App';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../auth/ducks/thunks';
import { PrivilegeLevel } from '../../auth/ducks/types';
import { C4CState } from '../../store';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';

const { Title, Paragraph } = Typography;

const ButtonDescription = styled(Title)`
  font-weight: bold;
`;

const Container = styled(ContentContainer)`
  max-width: 800px;
`;

const HeadTitle = styled(Title)`
  font-weight: bold;
  padding: 50px 0px 30px 0px;
  text-align: center;
`;

const InContain = styled.div`
  padding: 15px 20px 15px 20px;
  background-color: white;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const Home: React.FC = () => {
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
              <InContain
                onClick={() => {
                  history.push(Routes.SELECT_SCHOOL);
                }}
              >
                <Row>
                  <Col span={8}>
                    <FormOutlined
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
                          Fill Out A Form
                        </ButtonDescription>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Paragraph>Fill out an active form</Paragraph>
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
                    <UserOutlined
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
                          Your Profile
                        </ButtonDescription>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Paragraph>View and edit your profile</Paragraph>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </InContain>
            </Col>
          </Row>
          {privilegeLevel === PrivilegeLevel.ADMIN && (
            <Row gutter={[32, 48]} wrap>
              <Col span={12}>
                <InContain
                  onClick={() => {
                    history.push(Routes.SETTINGS);
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
              <InContain
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <Row>
                  <Col span={8}>
                    <PoweroffOutlined
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
                          Sign Out
                        </ButtonDescription>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Paragraph>Sign out of your account</Paragraph>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </InContain>
            </Col>
          </Row>
        </Outer>
      </Container>
    </>
  );
};

export default Home;
