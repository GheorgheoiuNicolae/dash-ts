import { connect } from 'react-redux';
import { ApplicationState } from '../../../redux/reducers';
import EditEntryForm from './EditEntry';
import { reduxForm, formValueSelector } from 'redux-form';
import { hideModal, showModal } from '../../../redux/ui/actions';
import { editEntry, removeEntry } from '../../../redux/entries/creators';

export interface OwnOptionalProps {
  handleSubmit: any;
  array: any;
  initialValues: any;
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  auth: any;
  selectedLabels: any;
  labelsById: any;
  activeModal: string | null;
  entriesCount: number;
  allDates: number[];
}

export interface DispatchProps {
  editEntry: ( user: any, entry: any, allDates: number[]) => {};
  removeEntry: (entry: any, user: any) => {};
  hideModal: Function;
  showModal: Function;
}

export interface OwnProps {
  entry: any;
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState, ownProps: any) => {
    const { entry } = ownProps;

    const selector = formValueSelector('editEntry');
    const labels = selector(state, 'labels');
    // change timestamp to Date obj before sending it to component
    entry.date = new Date(entry.date);
    entry.dateTime = new Date(entry.dateTime);

    return {
      auth: state.auth,
      initialValues: state.entries.byId[entry.id],
      selectedLabels: labels,
      labelsById: state.labels.byId,
      activeModal: state.ui.activeModal,
      entriesCount: state.entries.entriesCount,
      allDates: state.entries.allDates,
    };
  },
  {
    editEntry,
    removeEntry,
    showModal,
    hideModal
  },
)(reduxForm({
  form: 'editEntry',
})(EditEntryForm));
