import { connect } from 'react-redux';
import * as React from 'react';
import { ApplicationState } from '../../reducers';
import styled from 'styled-components';
import TopBar from './topbar';
import AdminTools from '../adminTools/';

interface StateProps {}

interface RequiredProps {
  children: JSX.Element;
}

interface OptionalProps {}

type Props = StateProps & RequiredProps & OptionalProps;

class Dashboard extends React.Component<Props, {}> {
  render() {
    const { children } = this.props;
    return (
      <DashboardWrap>
        <AdminTools />
        <TopBar />
        {children}
      </DashboardWrap>
    );
  }
}

const DashboardWrap = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

export default connect<StateProps, {}, RequiredProps & OptionalProps>(
  (state: ApplicationState) => ({
  }),
)(Dashboard);