import { connect } from 'react-redux';
import * as React from 'react';
import { ApplicationState } from '../../reducers';
import styled from 'styled-components';
import Sidebar from './sidebar';
import { Entry } from '../../types/';
import { getInitialEntries, getEntryOnChildAdded } from '../../redux/entries/creators';
import { getAllEntries } from '../Entries/selectors';

interface StateProps {
  user: any;
  entries: Entry[];
  datesLoaded: {
    past: any,
    future: any,
  };
}
interface RequiredProps {
  children: JSX.Element;
  getInitialEntries: any;
  getEntryOnChildAdded: any;
}
interface OptionalProps {}
type Props = StateProps & RequiredProps & OptionalProps;

class Dashboard extends React.Component<Props, {}> {
  componentWillMount() {
    const { user, getInitialEntries, getEntryOnChildAdded } = this.props;
    if(user) {
      // get the initial entries
      getInitialEntries(user.uid);
      // get the newly added entry
      getEntryOnChildAdded(user.uid);
    }
  }
  
  render() {
    const { children } = this.props;
    return (
      <DashboardWrap>
        <div className="bg0" />
        <div className="bg1"/>
        <div className="bg2" />
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
    };
  },
  {
    getInitialEntries,
    getEntryOnChildAdded,
  },
)(Dashboard);
