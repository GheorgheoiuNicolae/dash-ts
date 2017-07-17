import { connect } from 'react-redux';
import { ApplicationState } from '../../../../reducers';
import EditEntryForm from './EditEntry';
import {reduxForm} from 'redux-form';
import { saveEntryEdits, setCurrentEntry } from '../../../../actions/firebase_actions';

export interface OwnOptionalProps {
  handleSubmit: any;
  handleClose: any;
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  auth: any;
  // formValues: any;
}

export interface DispatchProps {
  saveEntryEdits: (entry: any, user: any) => {};
  setCurrentEntry: (entry: any) => {};
}

export interface OwnProps {
  entry: any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      auth: state.auth,
      initialValues: state.entries.ui.selectedEntry,
      // formValues: state.form,
    };
  },
  {
    saveEntryEdits,
    setCurrentEntry,
  },
)(reduxForm({
  form: 'editEntry',
  enableReinitialize: true,
})(EditEntryForm));
