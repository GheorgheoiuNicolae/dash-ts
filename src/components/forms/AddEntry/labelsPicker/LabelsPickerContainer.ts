import { connect } from 'react-redux';
import { ApplicationState } from '../../../../reducers';
import LabelsPicker from './LabelsPicker';

export interface StateProps {}
export interface DispatchProps {}
export interface OwnProps {}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
    };
  },
  {
  },
)(LabelsPicker);