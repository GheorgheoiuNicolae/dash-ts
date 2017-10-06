import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import AdminTools from './adminTools';
import { createEntry } from '../../actions/firebase_actions';

export interface OwnOptionalProps {}

export interface OwnProps extends Partial<OwnOptionalProps> {

}

export interface StateProps {
  user: any;
}

export interface DispatchProps {
  createEntry: any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      user: state.auth.user,
    };
  },
  {
   createEntry, 
  },
)(AdminTools);
