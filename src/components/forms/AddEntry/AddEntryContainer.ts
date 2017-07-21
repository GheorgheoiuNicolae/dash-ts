import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import AddEntryForm from './AddEntry';
import { reduxForm } from 'redux-form';
import { createEntry } from '../../../actions/firebase_actions';
import { hideModal } from '../../../actions/local';

export interface OwnOptionalProps {
  handleSubmit?: any;
  array: any;
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  auth: any;
  showAddModal: boolean;
}

export interface DispatchProps {
  createEntry: (entry: any, user: any) => {};
  hideModal: Function;
}

export interface OwnProps {}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    
    return {
      auth: state.auth,
      showAddModal: state.entries.ui.showAddModal,
    };
  },
  {
    createEntry,
    hideModal,
  },
)(reduxForm({
  form: 'addEntry',
})(AddEntryForm));
