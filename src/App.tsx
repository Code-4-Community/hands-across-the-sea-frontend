import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './App.less';
import Home from './containers/home/Home';
import Signup from './containers/signup/Signup';
import Login from './containers/login/Login';
import Settings from './containers/settings/Settings';
import SchoolInfo from './containers/school-info/SchoolInfo';
import ReasonForVisit from './containers/reason-for-visit/ReasonForVisit';
import StudentBookInformation from './containers/student-book-info/StudentBookInformation';
import LibraryInfo from './containers/library-info/LibraryInfo';

import NotFound from './containers/not-found/NotFound';
import NavBar from './components/navbar/NavBar';
import Footer from './components/Footer';
import { Layout } from 'antd';
import styled from 'styled-components';
const { Content } = Layout;

const AppInnerContainer = styled.div`
  min-height: 100vh;
`;

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta
          name="keywords"
          content="HATS, Hands for the Sea"
        />
      </Helmet>

      <Router>
        <Layout className="app-flex-container">
          <NavBar />
          <Content className="content-padding">
            <AppInnerContainer>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/reason-for-visit" exact component={ReasonForVisit} />
                <Route path="/student-book-information" exact component={StudentBookInformation} />
                <Route path="/library-info" exact component={LibraryInfo} />
                <Route path="/monitoring-information" exact component={ReasonForVisit} />
                <Route path="/training-and-mentoring-information" exact component={ReasonForVisit} />
                <Route path="/form-sub-confirmation" exact component={ReasonForVisit} />
                <Route path="/school-info" exact component={SchoolInfo} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/settings" exact component={Settings} />
                <Route path="*" exact component={NotFound} />
              </Switch>
            </AppInnerContainer>
          </Content>
        </Layout>
      </Router>
    </>
  );
};

export default App;
