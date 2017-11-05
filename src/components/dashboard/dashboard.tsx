import { connect } from 'react-redux';
import * as React from 'react';
import { ApplicationState } from '../../redux/reducers';
import styled from 'styled-components';
import Sidebar from './sidebar';
import { Entry } from '../../types/';
import { getInitialEntries, getEntryOnChildAdded } from '../../redux/entries/creators';
import { getAllEntries } from '../Entries/selectors';
import { getLabels, receiveLabel } from '../../redux/labels/creators';

interface StateProps {
  user: any;
  entries: Entry[];
  labels: any[];
  datesLoaded: {
    past: any,
    future: any,
  };
  pathname: any;
}
interface RequiredProps {
  children: JSX.Element;
  getInitialEntries: Function;
  getEntryOnChildAdded: Function;
  getLabels: Function;
  receiveLabel: Function;
}
interface OptionalProps {}
type Props = StateProps & RequiredProps & OptionalProps;

class Dashboard extends React.Component<Props, {}> {
  componentWillMount() {
    const { 
      user, 
      getInitialEntries, 
      getEntryOnChildAdded,
      getLabels,
      receiveLabel,
    } = this.props;
    if(user) {
      // get the initial entries
      getInitialEntries(user.uid);
      // get the newly added entry
      getEntryOnChildAdded(user.uid);
      // get all labels 
      getLabels(user.uid);
      // get newly added label
      receiveLabel(user.uid);
    }
  }
  
  render() {
    const { children, pathname } = this.props;
    return (
      <DashboardWrap>
        <div className="bg0"/>
        <div className="bg1" style={{width: pathname === '/today' ? 'initial': '200px', opacity: 1}}/>
        <div className="bg2" style={{width: pathname === '/today' ? 'initial': 'initial', opacity: 1}}/>
        <Sidebar />
        {children}
      </DashboardWrap>
    );
  }
}

const DashboardWrap = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  background: #f3f5f7;
`;

export default connect<StateProps, {}, RequiredProps & OptionalProps>(
  (state: ApplicationState) => {
    return {
      user: state.auth.user,
      entries: getAllEntries(state),
      datesLoaded: state.entries.ui.datesLoaded,
      labels: state.labels.byId,
      pathname: state.routing.locationBeforeTransitions.pathname
    };
  },
  {
    getInitialEntries,
    getEntryOnChildAdded,
    getLabels,
    receiveLabel,
  },
)(Dashboard);
