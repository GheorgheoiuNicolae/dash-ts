import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Entries from './Entries';
import { Entry } from '../../types/';
import { getAllEntries } from './selectors';
import {Any} from '../../types';

export interface OwnOptionalProps {}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  entries: Entry[];
  user: Any;
}

export interface DispatchProps {}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      entries: getAllEntries(state),
      user: state.auth.user,
    };
  },
  {
    
  },
)(Entries);
