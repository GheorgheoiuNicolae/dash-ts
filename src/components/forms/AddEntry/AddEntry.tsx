import * as React from 'react';
import { 
  TextField, 
  DatePicker
} from 'redux-form-material-ui';
import { Dialog, FlatButton, RaisedButton } from 'material-ui';
import { Field, FieldArray } from 'redux-form';
import { Any } from '../../../types/';
import styled from 'styled-components';
import { StateProps, DispatchProps, OwnProps } from './AddEntryContainer';
import CheckList from '../../checkList/';
import * as moment from 'moment';
import Close from 'material-ui/svg-icons/navigation/close';

import './AddEntry.css';
export type Props = StateProps & OwnProps & DispatchProps;

export default class AddEntryForm extends React.PureComponent<Props, {}> {

  handleSubmit = (values: Any) => {
    const { createEntry, auth, destroy, hideModal } = this.props;
    values.date = new Date(values.date).getTime();
    createEntry(values, auth.user.uid);
    hideModal('addEntry');
    destroy();
  }

  closeModal = (modalName: string) => {
    const { hideModal } = this.props;
    hideModal(modalName);
  }

  render () {
    const { handleSubmit, showAddModal, array: { push, insert } } = this.props;
    return (
      <Dialog
        modal={true}
        open={showAddModal}
        onRequestClose={() => this.closeModal('addEntry')}
        autoScrollBodyContent={true}
        bodyStyle={{padding: '0'}}
      >
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <ModalHeader className="modal-header">
            <h5 className="h5">Add new Entry</h5>
            <Close className="close-icon" onClick={() => this.closeModal('addEntry')} />
          </ModalHeader>
          <ModalContent>
            <LeftSide>
              <InputWrap>
                <Field
                  component={TextField}
                  floatingLabelFixed={true}
                  floatingLabelText={'Title'}
                  fullWidth={true}
                  name={'title'}
                  className="input-wrapper input"
                  autofocus={true}
                />
              </InputWrap>
              
              <InputWrap>
                <Field
                  component={TextField}
                  floatingLabelFixed={true}
                  floatingLabelText={'Description'}
                  fullWidth={true}
                  name={'description'}
                  className="textarea-wrapper input"
                  multiLine={true}
                />
              </InputWrap>
              
              <FieldArray 
                name="checklistItems" 
                component={CheckList} 
                push={push}
                insert={insert}
              />
            </LeftSide>
            <RightSide>
              <InputWrap>
                <Field
                  component={DatePicker}
                  floatingLabelFixed={true}
                  floatingLabelText={'Date'}
                  fullWidth={true}
                  name={`date`}
                  className="datepicker-wrapper input"
                  defaultValue={new Date()}
                  formatDate={(date: Date) => moment(date).format('ll')}
                />
              </InputWrap>
            </RightSide>
          </ModalContent>
          <ModalFooter>
            <FlatButton 
              label="Cancel" 
              primary={false} 
              onClick={() => this.closeModal('addEntry')}
              style={{margin: '10px 10px 0 0'}}
            />
            <RaisedButton 
              label="Add" 
              secondary={true}
              className="successButton"
              onClick={handleSubmit(this.handleSubmit.bind(this))}
              style={{margin: '10px 10px 0 0'}}
            />
          </ModalFooter>
        </form>
      </Dialog>
    );
  }
}

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 7;
  padding: 20px;
`;
const RightSide = styled.div`
  display: flex;
  flex: 3;
  padding: 20px;
  border-left: 1px solid #eee;
`;
const InputWrap = styled.div`
  margin-bottom: 10px;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  color: #6b7c93;
  text-align: center;
  border-bottom: 1px solid #f7f7f7;
`;
const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #6b7c93;
  text-align: center;
  border-top: 1px solid #f7f7f7;
  margin-bottom: 10px;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
`;
