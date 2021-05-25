import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Home from './containers/home';
import Signup from './containers/signup';
import Login from './containers/login';
import ForgotPassword from './containers/forgotPasswordRequest';
import ForgotPasswordReset from './containers/forgotPasswordReset';
import Settings from './containers/settings';
import VerifyEmail from './containers/verifyEmail';
import NotFound from './containers/notFound';
import NavBar from './components/navbar/NavBar';
import { Layout } from 'antd';
import styled from 'styled-components';
import { PrivilegeLevel } from './auth/ducks/types';
import { C4CState } from './store';
import { getPrivilegeLevel } from './auth/ducks/selectors';
import { useSelector } from 'react-redux';
import YesOrNoLibrary from './containers/library-report/YesOrNoLibrary';
import SelectSchool from './containers/selectSchool/SelectSchool';
import SchoolDirectory from './containers/schoolDirectory';
import SchoolInformation from './containers/schoolInfo';
import LibraryReport from './containers/library-report/LibraryReport';
import SchoolContacts from './containers/schoolContact';

const { Content } = Layout;

const AppInnerContainer = styled.div`
  min-height: 100vh;
`;

export enum Routes {
  HOME = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  SETTINGS = '/settings',
  SELECT_SCHOOL = '/select-school',
  LIBRARY_INFO = '/library-info',
  SCHOOL_CONTACTS = '/school-contacts',
  FORM_SUB_CONFIRMATION = '/form-sub-confirmation',
  SCHOOL_INFO = '/school-info',
  LIBRARY_REPORT = '/library-report',
  FORGOT_PASSWORD_REQUEST = '/forgot-password',
  FORGOT_PASSWORD_RESET = '/forgot-password-reset/:key',
  VERIFY_EMAIL = '/verify/:key',
  TODO = '/TODO',
  SCHOOL_DIRECTORY = '/school-directory',
}

const App: React.FC = () => {
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) => {
    return getPrivilegeLevel(state.authenticationState.tokens);
  });

  return (
    <>
      <Helmet>
        <meta
          name="keywords"
          content="child literacy,
        Caribbean, books, libraries, reading, Linskey,
        Antigua, St. Kitts and Nevis, Dominica, St. Lucia,
        St. Vincent and the Grenadines, Grenada, HATS, hats,
        hand across the sea"
        />
      </Helmet>

      <Router>
        <Layout>
          <NavBar />
          <Content>
            <AppInnerContainer>
              {(() => {
                switch (privilegeLevel) {
                  case PrivilegeLevel.ADMIN:
                  case PrivilegeLevel.STANDARD:
                    return (
                      <Switch>
                        <Route path={Routes.HOME} exact component={Home} />
                        <Route
                          path={Routes.SCHOOL_DIRECTORY}
                          exact
                          component={SchoolDirectory}
                        />
                        <Route
                          path={Routes.SELECT_SCHOOL}
                          exact
                          component={SelectSchool}
                        />
                        <Route
                          path={Routes.LIBRARY_INFO}
                          exact
                          component={YesOrNoLibrary}
                        />
                        <Route
                          path={Routes.SCHOOL_INFO}
                          exact
                          component={SchoolInformation}
                        />
                        <Route
                          path={Routes.SCHOOL_CONTACTS}
                          exact
                          component={SchoolContacts}
                        />
                        <Route
                          path={Routes.LIBRARY_REPORT}
                          exact
                          component={LibraryReport}
                        />
                        <Route path={Routes.LOGIN} exact component={Login} />
                        <Route path={Routes.SIGNUP} exact component={Signup} />
                        <Route
                          path={Routes.SETTINGS}
                          exact
                          component={Settings}
                        />
                        <Route path="*" exact component={NotFound} />
                      </Switch>
                    );
                  case PrivilegeLevel.NONE:
                    return (
                      <Switch>
                        <Route path={Routes.SIGNUP} exact component={Signup} />
                        <Route path={Routes.LOGIN} exact component={Login} />
                        <Route
                          path={Routes.FORGOT_PASSWORD_REQUEST}
                          exact
                          component={ForgotPassword}
                        />
                        <Route
                          path={Routes.FORGOT_PASSWORD_RESET}
                          exact
                          component={ForgotPasswordReset}
                        />
                        <Route
                          path={Routes.VERIFY_EMAIL}
                          exact
                          component={VerifyEmail}
                        />
                        <Route path="*">
                          <Redirect to={Routes.LOGIN} />
                        </Route>
                      </Switch>
                    );
                }
              })()}
            </AppInnerContainer>
          </Content>
        </Layout>
      </Router>
    </>
  );
};

export default App;
