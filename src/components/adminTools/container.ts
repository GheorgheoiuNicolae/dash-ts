import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import { Any } from '../../types/';
import AdminTools from './adminTools';
import { saveEntry } from '../../actions/firebase_actions';

export interface OwnOptionalProps {}

export interface OwnProps extends Partial<OwnOptionalProps> {

}

export interface StateProps {
  user: Any;
}

export interface DispatchProps {
  saveEntry: Any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      user: state.auth.user,
    };
  },
  {
   saveEntry, 
  },
)(AdminTools);
