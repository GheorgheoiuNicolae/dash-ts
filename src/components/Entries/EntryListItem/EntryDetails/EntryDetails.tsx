import * as React from 'react';
import { StateProps, DispatchProps, OwnProps } from './EntryDetailsContainer';
import styled from 'styled-components';
import EditEntryForm from '../../../forms/EditEntry/';
// import FlatButton from 'material-ui/FlatButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

export type Props = StateProps & OwnProps & DispatchProps;
interface OtherProps {
  // component state props here
}

export default class EntryDetails extends React.Component<Props, OtherProps> {
  render() {
    const { entry, deselectEntry } = this.props;
    return entry ? (
      <Wrap className="entry-details">
        <Header>
          <Title>Editing: <b>{entry.title}</b></Title>
          <IconButton
            tooltip="Close"
            tooltipPosition="bottom-right"
            onClick={() => deselectEntry()}
          >
            <CloseIcon />
          </IconButton>
        </Header>
        <EditEntryForm entry={entry} />
      </Wrap>
    ) : null;
  }
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  height: 100%;
  background: #fff;
  margin-left: 200px;
  padding: 0 20px;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
`;
const Header = styled.header`
  display: flex;
  flex-direction: row;
  margin-left: -20px;
  margin-right: -20px;
  padding: 0 20px;
  background: #FAFAFA;
  justify-content: space-between;
`;
const Title = styled.p`
  font-size: 18px;
  margin: 0;
  padding: 10px 0;
`;