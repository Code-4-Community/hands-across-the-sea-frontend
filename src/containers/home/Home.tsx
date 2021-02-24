import React from 'react';
import { Helmet } from 'react-helmet';
import { ContentContainer, Outer } from '../../components';
import { Row, Col, Typography } from 'antd';
import {
  FormOutlined,
  UserOutlined,
  FolderOpenOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { PrivilegeLevel } from '../../auth/ducks/types';
import { C4CState } from '../../store';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

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

  const link = (to: string) => {
    history.push(to);
  };

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
          <Row gutter={[32, 24]}>
            <Col span={12}>
              <InContain
                onClick={() => {
                  link('/select-school');
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
                  link('/not-found');
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
          <Row gutter={[32, 0]}>
            <Col span={12}>
              <InContain
                onClick={() => {
                  link('/not-found');
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
            <Col span={12}>
              <InContain
                onClick={() => {
                  link('/not-found');
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
