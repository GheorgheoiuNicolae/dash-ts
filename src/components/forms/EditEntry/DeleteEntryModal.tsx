import * as React from 'react';
import styled from 'styled-components';
import { 
  Dialog, 
  RaisedButton,
} from 'material-ui';

interface Props {
  showModal: Function;
  hideModal: Function;
  removeEntry: Function;
  activeModal: any;
  entry: string;
  uid: string;
}

export default class DeleteEntryModal extends React.Component<Props, {}> {
  closeModal = (modalName: string) => {
    const { hideModal } = this.props;
    hideModal(modalName);
  }

  deleteEntry = () => {
    const { entry, removeEntry, uid} = this.props;
    removeEntry(entry, uid);
  }

  render() {
    const { activeModal } = this.props;
    return (
      <Dialog
        modal={true}
        open={activeModal === 'deleteEntry'}
        onRequestClose={() => console.log('aaa')}
        autoScrollBodyContent={true}
        bodyStyle={{padding: '0'}}
      >
        <Content>
          <h3>Are you sure you want to permanently delete this entry?</h3>
        </Content>
        <Footer>
          <RaisedButton
            label="Cancel"
            keyboardFocused={true}
            style={{marginRight: '20px'}}
            onClick={() => this.closeModal('deleteEntry')}
          />
          <RaisedButton
            onClick={() => this.deleteEntry()}
            label="Confirm"
            secondary={true}
            className="dangerButton"
            keyboardFocused={false}
          />
        </Footer>
      </Dialog>
    );
  }
}

const Footer = styled.footer`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  border-top: 1px solid #eee;
  padding: 10px;
`;

const Content = styled.section`
  display: flex;
  flex: 1;
  padding: 20px;
`;