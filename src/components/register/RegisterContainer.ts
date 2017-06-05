import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Register from './Register';
import {reduxForm} from 'redux-form';
export interface StateProps {
  auth: any;
}

export interface DispatchProps {}

export interface OwnProps {}

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.auth,
});

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  {},
)(reduxForm({
  form: 'register',
})(Register));
