import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import Sidebar from './Sidebar';
import { hideModal, showModal } from '../../../actions/local';
export interface OwnOptionalProps {
  
}

export interface OwnProps extends Partial<OwnOptionalProps> {
  
}

export interface StateProps {
  showAddModal: boolean;
}

export interface DispatchProps {
  hideModal: Function;
  showModal: Function;
}

export interface OwnProps {}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      showAddModal: state.entries.ui.showAddModal,
    };
  },
  {
    hideModal,
    showModal,
  },
)(Sidebar);
