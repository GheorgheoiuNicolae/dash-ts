import { connect } from 'react-redux';
import * as React from 'react';
import { ApplicationState } from '../../reducers';
import styled from 'styled-components';
import Sidebar from './sidebar';
import { Any, Entry } from '../../types/';
import { getEntries } from '../../actions/firebase_actions';
import { getAllEntries } from '../Entries/selectors';

interface StateProps {
  user: Any;
  entries: Entry[];
}

interface RequiredProps {
  children: JSX.Element;
  getEntries: Any;
}

interface OptionalProps {}

type Props = StateProps & RequiredProps & OptionalProps;

class Dashboard extends React.Component<Props, {}> {
  componentWillMount() {
    const { user, getEntries } = this.props;
    if(user) {
      getEntries(user.uid);
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
    };
  },
  {
    getEntries,
  },
)(Dashboard);
