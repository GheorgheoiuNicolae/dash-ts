import registerServiceWorker from './registerServiceWorker';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Redirect, 
  IndexRedirect, 
  Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store/store';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';
import Login from './components/login/';
import Register from './components/register';
import ResetPassword from './components/resetPassword';
import Authentication from './App/Authentication';
import Dashboard from './components/dashboard/dashboard';
import NotFound from './App/notFound';
import Entries from './components/Entries';
import Labels from './components/Labels';
import IconsGrid from './App/IconsGrid';

import './index.css';
injectTapEventPlugin();

export const routeList = {
  index: '/',
  login: '/login',
  register: '/register',
  resetPassword: '/resetPassword',
  dashboard: '/dashboard',
  entries: '/entries',
  labels: '/labels',
  notFound: '/notFound',
  authentication: '/authentication',
  icons: '/icons',
};

const router = (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        <Route path={routeList.index} component={App}>
          <IndexRedirect to={routeList.authentication} />
          <Route path={routeList.login} component={Login} />
          <Route path={routeList.icons} component={IconsGrid} />
          <Route path={routeList.register} component={Register} />
          <Route path={routeList.resetPassword} component={ResetPassword} />
          <Route component={Authentication} path={routeList.authentication}>
            <Route component={Dashboard}>
              <IndexRedirect to={routeList.entries} />
              <Route path={routeList.entries} component={Entries} />
              <Route path={routeList.labels} component={Labels} />
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