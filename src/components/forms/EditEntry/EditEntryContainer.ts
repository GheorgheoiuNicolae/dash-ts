import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import EditEntryForm from './EditEntry';
import {reduxForm} from 'redux-form';
import { editEntry } from '../../../actions/firebase_actions';

export interface OwnOptionalProps {
  handleSubmit: any;
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  auth: any;
}

export interface DispatchProps {
  editEntry: (entry: any, user: any) => {};
}

export interface OwnProps {
  entry: any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState, ownProps: any) => {
    const { entry } = ownProps;
    return {
      auth: state.auth,
      initialValues: state.entries.byId[entry.id],
    };
  },
  {
    editEntry,
  },
)(reduxForm({
  form: 'editEntry',
})(EditEntryForm));
