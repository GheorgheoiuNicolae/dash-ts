import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import Entries from './Entries';
import { Entry } from '../../types/';
import { currentDay } from './selectors';
import { removeEntry, loadMoreEntries, loadOneYear } from '../../redux/entries/creators';
import { selectEntry, deselectEntry } from '../../redux/entries/actions';
import { onListScroll } from '../../redux/ui/creators';

export interface OwnOptionalProps {}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  entries: Entry[];
  user: any;
  numberOfEntries: number | null;
  view: String;
  isLoading: any;
  shouldLoadOneYear: boolean;
  labelsById: any;
  uiState: any;
  selectedEntry: any;
  currentDay: any;
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
  selectEntry: Function;
  deselectEntry: Function;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      entries: state.entries.days,
      numberOfEntries: state.entries.ui.numberOfEntries,
      user: state.auth.user,
      view: state.entries.ui.view,
      currentDay: currentDay,
      datesLoaded: state.entries.ui.datesLoaded,
      isLoading: state.entries.ui.isLoading,
      shouldLoadOneYear: state.entries.ui.shouldLoadOneYear,
      labelsById: state.labels.byId,
      uiState: state.ui,
      selectedEntry: state.entries.ui.selectedEntry,
    };
  },
  {
    removeEntry,
    loadMoreEntries,
    loadOneYear,
    onListScroll,
    selectEntry,
    deselectEntry,
  },
)(Entries);
