import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Entries from './Entries';
import { getEntries } from '../../actions/firebase_actions';
import { Any, Entry } from '../../types/';
import { getAllEntries } from './selectors';

export interface OwnOptionalProps {}

export interface OwnProps extends Partial<OwnOptionalProps> {
  
}

export interface StateProps {
  user: Any;
  entries: Entry[];
}

export interface DispatchProps {
  getEntries: Any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      user: state.auth.user,
      entries: getAllEntries(state),
    };
  },
  {
    getEntries,
  },
)(Entries);
