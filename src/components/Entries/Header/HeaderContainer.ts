import { connect } from 'react-redux';
import { ApplicationState } from '../../../redux/reducers';
import Header from './Header';
import { hideModal, showModal } from '../../../redux/ui/actions';

export interface OwnOptionalProps {}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {}

export interface DispatchProps {
  hideModal: Function;
  showModal: Function;
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
  },
)(Header);
