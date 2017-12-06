import { connect } from 'react-redux';
import { ApplicationState } from '../../../redux/reducers';
import AddEntryForm from './AddEntry';
import { reduxForm, formValueSelector } from 'redux-form';
import { createEntry } from '../../../redux/entries/creators';
import { hideModal, showModal } from '../../../redux/ui/actions';
import { resetForm } from '../../../redux/ui/creators';

export interface OwnOptionalProps {
  handleSubmit?: any;
  array: any;
  initialValues: any;
  destroy: any;
  reset: any;
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  auth: any;
  showAddModal: boolean;
  selectedLabels: any;
  labelsById: any;
  location: any;
}

export interface DispatchProps {
  createEntry: (entry: any, user: any) => {};
  hideModal: Function;
  showModal: Function;
  resetForm: Function;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    // get the selected labels from the form state
    const selector = formValueSelector('addEntry');
    const labels = selector(state, 'labels');

    return {
      auth: state.auth,
      showAddModal: state.entries.ui.showAddModal,
      selectedLabels: labels,
      labelsById: state.labels.byId,
      location: state.ui.location,
    };
  },
  {
    createEntry,
    hideModal,
    showModal,
    resetForm
  },
)(reduxForm({
  form: 'addEntry',
  initialValues: {
    date: new Date(),
  }
})(AddEntryForm));
