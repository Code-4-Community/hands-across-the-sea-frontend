import { Layout } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { getPrivilegeLevel } from './auth/ducks/selectors';
import { PrivilegeLevel } from './auth/ducks/types';
import NavBar from './components/navbar/NavBar';
import DataVisualization from './containers/dataVisualization';
import ForgotPassword from './containers/forgotPasswordRequest';
import ForgotPasswordReset from './containers/forgotPasswordReset';
import FormSubmission from './containers/formSubmission';
import Home from './containers/home';
import NewLibraryReport from './containers/library-report/NewLibraryReport';
import YesOrNoLibrary from './containers/library-report/YesOrNoLibrary';
import Login from './containers/login';
import NotFound from './containers/notFound';
import EditLibraryReport from './containers/pastSubmissionsReports/EditLibraryReport';
import PastSubmissionReports from './containers/pastSubmissionsReports/PastSubmissionReports';
import PastSubmissionsSchools from './containers/pastSubmissionsSchools/PastSubmissionsSchools';
import SchoolContacts from './containers/schoolContact';
import SchoolDirectory from './containers/schoolDirectory';
import SchoolInformation from './containers/schoolInfo';
import SelectSchool from './containers/selectSchool/SelectSchool';
import Settings from './containers/settings';
import UserDirectory from './containers/userDirectory';
import VerifyEmail from './containers/verifyEmail';
import history from './history';
import { C4CState } from './store';

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
  SCHOOL_DIRECTORY = '/school-directory',
  USER_DIRECTORY = '/user-directory',
  PAST_SUBMISSIONS_SCHOOLS = '/past-submissions-schools',
  PAST_SUBMISSIONS_REPORTS = '/past-submissions-reports',
  EDIT_LIBRARY_REPORT = '/edit-library-report',
  DATA_VISUALIZATION = '/data-visualization',
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

      <Router history={history}>
        <Layout>
          <NavBar />
          <Content>
            <AppInnerContainer>
              {(() => {
                switch (privilegeLevel) {
                  case PrivilegeLevel.ADMIN:
                    return (
                      <Switch>
                        <Route
                          path={Routes.USER_DIRECTORY}
                          exact
                          component={UserDirectory}
                        />
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
                          component={NewLibraryReport}
                        />
                        <Route
                          path={Routes.FORM_SUB_CONFIRMATION}
                          exact
                          component={FormSubmission}
                        />
                        <Route
                          path={Routes.PAST_SUBMISSIONS_SCHOOLS}
                          exact
                          component={PastSubmissionsSchools}
                        />
                        <Route
                          path={Routes.PAST_SUBMISSIONS_REPORTS}
                          exact
                          component={PastSubmissionReports}
                        />
                        <Route
                          path={Routes.EDIT_LIBRARY_REPORT}
                          exact
                          component={EditLibraryReport}
                        />
                        <Route path={Routes.LOGIN} exact component={Login} />
                        <Route
                          path={Routes.SETTINGS}
                          exact
                          component={Settings}
                        />
                        <Route
                          path={Routes.DATA_VISUALIZATION}
                          exact
                          component={DataVisualization}
                        />
                        <Route path="*" exact component={NotFound} />
                      </Switch>
                    );
                  case PrivilegeLevel.VOLUNTEER || PrivilegeLevel.OFFICER:
                    return (
                      <Switch>
                        <Route path={Routes.HOME} exact component={Home} />
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
                          component={NewLibraryReport}
                        />
                        <Route
                          path={Routes.FORM_SUB_CONFIRMATION}
                          exact
                          component={FormSubmission}
                        />
                        <Route
                          path={Routes.PAST_SUBMISSIONS_SCHOOLS}
                          exact
                          component={PastSubmissionsSchools}
                        />
                        <Route
                          path={Routes.PAST_SUBMISSIONS_REPORTS}
                          exact
                          component={PastSubmissionReports}
                        />
                        <Route
                          path={Routes.EDIT_LIBRARY_REPORT}
                          exact
                          component={EditLibraryReport}
                        />
                        <Route path={Routes.LOGIN} exact component={Login} />
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
                  default:
                    return (
                      <div>
                        Error: Unknown Privilege Level: {privilegeLevel}
                      </div>
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
