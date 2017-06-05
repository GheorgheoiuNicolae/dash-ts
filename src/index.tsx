import registerServiceWorker from './registerServiceWorker';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Redirect, IndexRedirect, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store/store';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';
import Login from './components/login/';
import Register from './components/register';
import Authentication from './App/Authentication';
import Dashboard from './components/dashboard/dashboard';
import NotFound from './App/notFound';
import Entries from './components/Entries';
import Labels from './components/Labels'

import './index.css';

injectTapEventPlugin();

export const routeList = {
  index: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  entries: '/entries',
  labels: '/labels',
  notFound: '/notFound',
};


const router = (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        <Route path={routeList.index} component={App}>
          <IndexRedirect to={routeList.dashboard} />
          <Route path={routeList.login} component={Login} />
          <Route path={routeList.register} component={Register} />
          <Route component={Authentication}>
            <Route path={routeList.dashboard} component={Dashboard}>
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
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();