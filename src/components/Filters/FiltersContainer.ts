import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import Filters from './Filters';

export interface Props {}
export interface StateProps {}
export interface DispatchProps {}

export default connect<StateProps, DispatchProps, Props>(
  (state: ApplicationState, ownProps: Props) => {
    return {
      
    };
  },
  {
  },
)((Filters));
