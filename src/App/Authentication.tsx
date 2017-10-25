import { connect } from 'react-redux';
import * as React from 'react';
import { InjectedRouter, RouterState } from 'react-router';
import { ApplicationState } from '../redux/reducers';
import { fetchUser } from '../redux/auth/creators';
import { AuthState } from '../reducers/auth';
import { browserHistory } from 'react-router';

interface StateProps {
  auth: AuthState;
  fetchUser: Function;
}

interface RequiredProps {
  router: InjectedRouter;
  children: JSX.Element;
  dispatch: Function;
}

interface OptionalProps {
  noAuthRedirectTo: string;
  redirectQueryParam: boolean;
}

type Props = RouterState & StateProps & RequiredProps & OptionalProps;

class Authentication extends React.Component<Props, {}> {
  static defaultProps = {
    noAuthRedirectTo: '/login',
    redirectQueryParam: true,
  };
  componentWillMount() {
    const { dispatch, fetchUser} = this.props;
    dispatch(fetchUser());
  }
  componentWillReceiveProps(nextProps: any) {
    if(!nextProps.auth.user) {
      browserHistory.push('/login');
    } 
  }

  render() {
    const { auth, children } = this.props;
    return auth.user && auth.user.uid ? children : null;
  }
}

export default connect<StateProps, {}, RequiredProps & OptionalProps>(
  (state: ApplicationState) => ({
    auth: state.auth,
    fetchUser: fetchUser,
  }),
)(Authentication);