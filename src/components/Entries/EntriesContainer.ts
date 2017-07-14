import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Entries from './Entries';
import { Entry } from '../../types/';
import { getAllEntries } from './selectors';

export interface OwnOptionalProps {}

export interface OwnProps extends Partial<OwnOptionalProps> {
  
}

export interface StateProps {
  entries: Entry[];
}

export interface DispatchProps {

}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      entries: getAllEntries(state),
    };
  },
  {
    
  },
)(Entries);
