import { connect } from 'react-redux';
import { ApplicationState } from '../../../../redux/reducers';
import EntryDetails from './EntryDetails';
import { deselectEntry } from '../../../../redux/entries/actions';

export interface OwnOptionalProps {}
export interface OwnProps extends Partial<OwnOptionalProps> {
  
}

export interface StateProps {
  entry: any;
}

export interface DispatchProps {
  deselectEntry: Function;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      entry: state.entries.byId[state.entries.ui.selectedEntry]
    };
  },
  {
    deselectEntry,
  },
)(EntryDetails);
