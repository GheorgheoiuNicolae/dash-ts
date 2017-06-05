import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Login from './Login';
import {reduxForm} from 'redux-form';

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

const mapStateToProps = (state: ApplicationState) => ({});

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  {},
)(reduxForm({
  form: 'login',
})(Login));
