import { connect } from 'react-redux';
import { ApplicationState } from '../../../../redux/reducers';
import LabelsPicker from './LabelsPicker';
import { denormalizeLabels } from '../../../../redux/labels/selectors';

export interface StateProps {
  labels: any;
}
export interface DispatchProps {}
export interface OwnProps {
  selectedLabelIds: any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      labels: denormalizeLabels(state),
    };
  },
  {
  },
)(LabelsPicker);