import registerServiceWorker from './registerServiceWorker';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './theme';
import { Redirect, 
  IndexRedirect, 
  Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './redux/store';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';
import Login from './components/login/';
import Register from './components/register';
import ResetPassword from './components/resetPassword';
import Authentication from './App/Authentication';
import Dashboard from './components/dashboard/dashboard';
import NotFound from './App/notFound';
import Entries from './components/Entries';
import Goals from './components/Goals';
import Entry from './components/Entry/';
import Today from './components/Today/';
import UserProfile from './components/UserProfile';

import './index.css';
injectTapEventPlugin();

export const routeList = {
  index: '/',
  login: '/login',
  register: '/register',
  resetPassword: '/resetPassword',
  dashboard: '/dashboard',
  entries: '/entries',
  entry: '/entries/:entryId',
  goals: '/goals',
  today: '/today',
  notFound: '/notFound',
  userProfile: '/my-profile',
  authentication: '/authentication',
};

const router = (
  <MuiThemeProvider muiTheme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <Route path={routeList.index} component={App}>
          <IndexRedirect to={routeList.authentication} />
          <Route path={routeList.login} component={Login} />
          <Route path={routeList.register} component={Register} />
          <Route path={routeList.resetPassword} component={ResetPassword} />
          <Route component={Authentication} path={routeList.authentication}>
            <Route component={Dashboard}>
              <IndexRedirect to={routeList.entries} />
              <Route path={routeList.entries} component={Entries} />
              <Route path={routeList.entry} component={Entry} />
              <Route path={routeList.today} component={Today} />
              <Route path={routeList.goals} component={Goals} />
              <Route path={routeList.userProfile} component={UserProfile} />
            </Route>
          </Route>
          <Route path={routeList.notFound} component={NotFound} />
          <Redirect from="*" to={routeList.notFound} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(
  router,
  document.getElementById('root')
);
registerServiceWorker();