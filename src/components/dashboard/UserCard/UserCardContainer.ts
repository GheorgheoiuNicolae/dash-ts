import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import UserCard from './UserCard';
import { logoutUser } from '../../../actions/firebase_actions';
import { Any } from '../../../types';

export interface OwnOptionalProps {
  
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  auth: Any;
}

export interface DispatchProps {
  logoutUser: (user: Any) => {};
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
