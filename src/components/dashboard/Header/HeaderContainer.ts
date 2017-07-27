import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import Header from './Header';
import { hideModal, showModal, switchEntriesView } from '../../../actions/local';

export interface OwnOptionalProps {}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {}

export interface DispatchProps {
  hideModal: Function;
  showModal: Function;
  switchEntriesView: Function;
}

export interface OwnProps {}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
    };
  },
  {
    hideModal,
    showModal,
    switchEntriesView,
  },
)(Header);
