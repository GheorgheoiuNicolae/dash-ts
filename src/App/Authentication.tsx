import { connect } from 'react-redux';
import * as React from 'react';
import { InjectedRouter, RouterState } from 'react-router';
import { ApplicationState } from '../reducers';
import { fetchUser } from '../actions/firebase_actions';

interface StateProps {
  auth: any;
  fetchUser: () => {};
}

interface RequiredProps {
  router: InjectedRouter;
  children: JSX.Element;
  dispatch: any;
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