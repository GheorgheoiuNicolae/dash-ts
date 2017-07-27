import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Entries from './Entries';
import { Entry } from '../../types/';
import { getAllEntries } from './selectors';
import { removeEntry } from '../../actions/firebase_actions';

export interface OwnOptionalProps {}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  entries: Entry[];
  user: any;
  view: String;
}

export interface DispatchProps {
  removeEntry: any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      entries: getAllEntries(state),
      user: state.auth.user,
      view: state.entries.ui.view,
    };
  },
  {
    removeEntry,
  },
)(Entries);
