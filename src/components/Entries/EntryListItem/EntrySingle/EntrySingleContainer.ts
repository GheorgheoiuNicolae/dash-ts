import { connect } from 'react-redux';
import { ApplicationState } from '../../../../reducers';
import EntrySingle from './EntrySingle';
import {Any } from '../../../../types';
import { setCurrentEntry } from '../../../../actions/firebase_actions';

export interface OwnOptionalProps {
  entry: Any;
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  user: Any;
  selectedEntry: Any;
}

export interface DispatchProps {
  setCurrentEntry: Any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      user: state.auth.user,
      selectedEntry: state.entries.ui.selectedEntry,
    };
  },
  {
    setCurrentEntry,
  },
)(EntrySingle);
