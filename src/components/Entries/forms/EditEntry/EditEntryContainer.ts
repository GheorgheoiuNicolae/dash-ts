import { connect } from 'react-redux';
import { ApplicationState } from '../../../../reducers';
import EditEntryForm from './EditEntry';
import {reduxForm} from 'redux-form';
import { Any }  from '../../../../types';
import { saveEntryEdits } from '../../../../actions/firebase_actions';

export interface OwnOptionalProps {
  handleSubmit: Any;
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  auth: Any;
  entry: Any;
}

export interface DispatchProps {
  saveEntryEdits: (entry: Any, user: Any) => {};
}

export interface OwnProps {}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      auth: state.auth,
      entry: state.entries.ui.selectedEntry,
    };
  },
  {
    saveEntryEdits,
  },
)(reduxForm({
  form: 'editEntry',
})(EditEntryForm));
