import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Entries from './Entries';
import { Entry } from '../../types/';
import { getAllEntries, closestToToday } from './selectors';
import { removeEntry, loadMoreEntries } from '../../actions/firebase_actions';

export interface OwnOptionalProps {}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  entries: Entry[];
  user: any;
  view: String;
  closestToToday: any;
  isLoading: boolean;
  datesLoaded: {
    past: any,
    future: any,
  };
}

export interface DispatchProps {
  removeEntry: any;
  loadMoreEntries: any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      entries: getAllEntries(state),
      user: state.auth.user,
      view: state.entries.ui.view,
      closestToToday: closestToToday(state),
      datesLoaded: state.entries.ui.datesLoaded,
      isLoading: state.entries.ui.isLoading,
    };
  },
  {
    removeEntry,
    loadMoreEntries,
  },
)(Entries);
