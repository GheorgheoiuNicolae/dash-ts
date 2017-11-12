import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import Entries from './Entries';
import { Entry } from '../../types/';
import { getAllEntries, closestToToday } from './selectors';
import { removeEntry, loadMoreEntries, loadOneYear } from '../../redux/entries/creators';
import { onListScroll } from '../../redux/ui/creators';

export interface OwnOptionalProps {}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  entries: Entry[];
  user: any;
  numberOfEntries: number | null;
  view: String;
  closestToToday: any;
  isLoading: any;
  shouldLoadOneYear: boolean;
  labelsById: any;
  uiState: any;
  datesLoaded: {
    past: any,
    future: any,
  };
}

export interface DispatchProps {
  removeEntry: any;
  loadMoreEntries: any;
  loadOneYear: Function;
  onListScroll: Function;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      entries: getAllEntries(state),
      numberOfEntries: state.entries.ui.numberOfEntries,
      user: state.auth.user,
      view: state.entries.ui.view,
      closestToToday: closestToToday(state),
      datesLoaded: state.entries.ui.datesLoaded,
      isLoading: state.entries.ui.isLoading,
      shouldLoadOneYear: state.entries.ui.shouldLoadOneYear,
      labelsById: state.labels.byId,
      uiState: state.ui
    };
  },
  {
    removeEntry,
    loadMoreEntries,
    loadOneYear,
    onListScroll,
  },
)(Entries);
