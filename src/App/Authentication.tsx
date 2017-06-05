import { connect } from 'react-redux';
import * as React from 'react';
import { InjectedRouter, RouterState } from 'react-router';
import { firebaseAuth } from '../config/constants';
// import { ReduxComponent } from '@cemex/types';
// import api from '@lib/api';
import { ApplicationState } from '../reducers';
import { checkAuthState } from '../components/login/actions';
// import { Auth as AuthInterface } from '@product/types/Auth';

interface StateProps {
  auth: any;
  
}

interface RequiredProps {
  router: InjectedRouter;
  children: JSX.Element;
}

interface OptionalProps {
  noAuthRedirectTo: string;
  redirectQueryParam: boolean;
}

type Props = RouterState & StateProps & RequiredProps & Partial<OptionalProps>;

class Authentication extends React.Component<Props, {}> {
  static defaultProps = {
    noAuthRedirectTo: '/login',
    redirectQueryParam: true,
  };
  checkAuth(props: Props) {
    // const {
    //   auth,
    //   router,
    // } = props;

    let observer = (user:any) => {
      checkAuthState(user);
      unsubscribe();
    }
    var unsubscribe = firebaseAuth().onAuthStateChanged(observer);
    
    // if(!auth.uid && auth.isLoading) {
    //   console.log('no user but finished loading')
    //   return router.replace('/login');
    // } else if(auth.uid){
    //   return router.replace('/dashboard');
    // }
  }
  componentWillMount() {
    this.checkAuth(this.props);
  }
  componentWillReceiveProps(nextProps: Props) {
    // In case was authorized but not anymore
    //this.checkAuth(nextProps);
  }
  render() {
    const { auth, children } = this.props as Props;

    return auth.user ? children : null;
  }
}

export default connect<StateProps, {}, RequiredProps & Partial<OptionalProps>>(
  (state: ApplicationState) => ({
    auth: state.auth,
  }),
)(Authentication);
