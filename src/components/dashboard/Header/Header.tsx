import * as React from 'react';
import styled from 'styled-components';
import { StateProps, DispatchProps, OwnProps } from './HeaderContainer';
import './header.css';
import IconButton from 'material-ui/IconButton';
import ViewList from 'material-ui/svg-icons/action/view-list';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import FilterList from 'material-ui/svg-icons/content/filter-list';
// import Search from 'material-ui/svg-icons/action/search';

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  // component state props here
}

export default class Header extends React.Component<Props, OtherProps> {
  setView(type: string) {
    const { switchEntriesView } = this.props;
    switchEntriesView(type);
  }

  toggleFilters() {
    const { toggleFilterDrawer } = this.props;
    toggleFilterDrawer();
  }

  toggleSearch() {
    const { toggleSearch } = this.props;
    toggleSearch();
  }

  render () {
    return (
      <HeaderWrap>
        <div className="actions">
          <HeaderItem className="header-item">
            <ItemText>View</ItemText>
            <IconButton onTouchTap={() => this.setView('list')}>
              <ViewList />
            </IconButton>
            <IconButton  onTouchTap={() => this.setView('grid')}>
              <ViewModule />
            </IconButton>
          </HeaderItem>
          <HeaderItem className="header-item">
            <ItemText>Filter</ItemText>
            <IconButton onTouchTap={() => this.toggleFilters()}>
              <FilterList />
            </IconButton>
          </HeaderItem>
          {/* <HeaderItem className="header-item">
            <IconButton onTouchTap={() => this.toggleSearch()}>
              <Search />
            </IconButton>
            <ItemText>Search</ItemText>
          </HeaderItem> */}
        </div>
      </HeaderWrap>
    );
  }
}

const HeaderWrap = styled.div`
  position: absolute;
  top: 0;
  left: 200px;
  right: 0;
  height: 49px;
  z-index: 3;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
`;
const HeaderItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
  font-size: 12px;
  border-right: 1px solid #eee;
  padding-right: 10px;
`;
const ItemText = styled.div`
  margin: 0 5px;
`;
