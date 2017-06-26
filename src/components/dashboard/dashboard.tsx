import * as React from 'react';
import styled from 'styled-components';
import TopBar from './topbar/TopBar';

interface Props {}
interface OwnProps {}

export interface StyledComponentProps {
  style?: string;
  store: any;
}

export default class Dashboard extends React.Component<Props, OwnProps> {
  render () {
    return (
      <DashboardWrap>
        <TopBar />
        <h3>Dashboard</h3>
        <div className="dashboard-content">
          {this.props.children}
        </div>
      </DashboardWrap>
    );
  }
}

const DashboardWrap = styled.div`
  height: 100%;
  width: 100%;
`;