import { connect } from 'react-redux';

import { ApplicationState } from '../reducers';
import App from './App';

export interface StateProps {
  entries: any;
}

export interface DispatchProps {}

export interface OwnProps {}

const mapStateToProps = (state: ApplicationState) => ({
  entries: state.entries
});

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  {},
)(App);
