import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import UserCard from './UserCard';
import { logoutUser } from '../../../actions/firebase_actions';

export interface OwnOptionalProps {
  
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  auth: any;
}

export interface DispatchProps {
  logoutUser: (user: any) => {};
}

export interface OwnProps {}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      auth: state.auth
    };
  },
  {
    logoutUser,
  },
)(UserCard);
