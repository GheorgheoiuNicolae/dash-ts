import { connect } from 'react-redux';
import * as React from 'react';
import { ApplicationState } from '../../reducers';
import styled from 'styled-components';
import TopBar from './topbar/TopBar';

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
        <TopBar />
        <h3>Dashboard</h3>
        <div className="dashboard-content">
          {children}
        </div>
      </DashboardWrap>
    );
  }
}

const DashboardWrap = styled.div`
  height: 100%;
  width: 100%;
`;

export default connect<StateProps, {}, RequiredProps & OptionalProps>(
  (state: ApplicationState) => ({
  }),
)(Dashboard);