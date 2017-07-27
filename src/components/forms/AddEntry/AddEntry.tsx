import * as React from 'react';
import { 
  TextField, 
  DatePicker
} from 'redux-form-material-ui';
import { Dialog, FlatButton } from 'material-ui';
import { Field, FieldArray } from 'redux-form';
import { Any } from '../../../types/';
import styled from 'styled-components';
import { StateProps, DispatchProps, OwnProps } from './AddEntryContainer';
import CheckList from '../../checkList/';
import * as moment from 'moment';

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
          <ModalHeader>
            <h3>Add new Entry</h3>
          </ModalHeader>
          <ModalContent>
            <InputWrap className="input-wrap">
              <Field
                component={TextField}
                floatingLabelFixed={true}
                floatingLabelText={'Title'}
                fullWidth={true}
                name={'title'}
                className="input-field"
              />
            </InputWrap>
            
            <InputWrap className="input-wrap">
              <Field
                component={TextField}
                floatingLabelFixed={true}
                floatingLabelText={'Description'}
                fullWidth={true}
                name={'description'}
                className="input-field"
                multiLine={true}
              />
            </InputWrap>

            <InputWrap className="input-wrap">
              <Field
                component={DatePicker}
                floatingLabelFixed={true}
                floatingLabelText={'Date'}
                fullWidth={true}
                name={`date`}
                className="input-field"
                defaultValue={new Date()}
                formatDate={(date: Date) => moment(date).format('ll')}
              />
            </InputWrap>
            
            <FieldArray 
              name="checklistItems" 
              component={CheckList} 
              push={push}
              insert={insert}
            />
            
            <FlatButton 
              label="Add" 
              primary={true} 
              onClick={handleSubmit(this.handleSubmit.bind(this))}
            />
            <FlatButton 
              label="Cancel" 
              primary={false} 
              onClick={() => this.closeModal('addEntry')}
            />
          </ModalContent>
        </form>
      </Dialog>
    );
  }
}

const InputWrap = styled.div`
  margin-bottom: 10px;
`;
const ModalHeader = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  color: #fff;
  background: #24c6dc; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #24c6dc, #514a9d); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #24c6dc, #514a9d); 
`;
const ModalContent = styled.div`
  padding: 20px;
`;
