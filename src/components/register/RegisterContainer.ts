import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Register from './Register';
import {reduxForm} from 'redux-form';
import { registerUser } from '../../actions/firebase_actions';

export interface StateProps {
  
}

export interface DispatchProps {
  registerUser: (user: any) => {};
}

export interface OwnProps {}

const mapStateToProps = (state: ApplicationState) => ({

});

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  {
    registerUser,
  },
)(reduxForm({
  form: 'register',
})(Register));
