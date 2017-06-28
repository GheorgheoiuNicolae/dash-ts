import { connect } from 'react-redux';

import { ApplicationState } from '../reducers';
import App from './App';

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

const mapStateToProps = (state: ApplicationState) => ({});

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  {},
)(App);
