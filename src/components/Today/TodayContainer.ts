import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import Today from './Today';
import { Entry } from '../../types/';
import { getTodayEntries, getUpcomingEntries } from './selectors';
import { removeEntry } from '../../redux/entries/creators';

export interface OwnOptionalProps {}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  user: any;
  entries: Entry[];
  upcomingEntries: Entry[];
  labelsById: any;
}

export interface DispatchProps {
  removeEntry: any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      user: state.auth.user,
      entries: getTodayEntries(state),
      upcomingEntries: getUpcomingEntries(state),
      labelsById: state.labels.byId,
    };
  },
  {
    removeEntry
  },
)(Today);
