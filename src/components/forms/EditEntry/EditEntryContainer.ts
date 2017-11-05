import { connect } from 'react-redux';
import { ApplicationState } from '../../../redux/reducers';
import EditEntryForm from './EditEntry';
import {reduxForm} from 'redux-form';
import { editEntry } from '../../../redux/entries/creators';

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
    // change timestamp to Date obj before sending it to component
    entry.date = new Date(entry.date);
    entry.dateTime = new Date(entry.dateTime);

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
