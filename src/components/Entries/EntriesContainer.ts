import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Entries from './Entries';
import { Entry } from '../../types/';
import { getAllEntries, closestToToday } from './selectors';
import { removeEntry, loadMoreEntries, loadOneYear } from '../../redux/entries/creators';

export interface OwnOptionalProps {}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  entries: Entry[];
  user: any;
  view: String;
  closestToToday: any;
  isLoading: any;
  shouldLoadOneYear: boolean;
  datesLoaded: {
    past: any,
    future: any,
  };
}

export interface DispatchProps {
  removeEntry: any;
  loadMoreEntries: any;
  loadOneYear: Function;
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
      shouldLoadOneYear: state.entries.ui.shouldLoadOneYear,
    };
  },
  {
    removeEntry,
    loadMoreEntries,
    loadOneYear,
  },
)(Entries);
