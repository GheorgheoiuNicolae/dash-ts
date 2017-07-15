import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Entries from './Entries';
import { Entry } from '../../types/';
import { getAllEntries } from './selectors';
import {Any} from '../../types';
import { removeEntry } from '../../actions/firebase_actions';

export interface OwnOptionalProps {}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  entries: Entry[];
  user: Any;
}

export interface DispatchProps {
  removeEntry: Any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      entries: getAllEntries(state),
      user: state.auth.user,
    };
  },
  {
    removeEntry,
  },
)(Entries);
