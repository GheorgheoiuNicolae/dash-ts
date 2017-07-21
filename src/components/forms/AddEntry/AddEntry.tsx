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

export type Props = StateProps & OwnProps & DispatchProps;

export default class AddEntryForm extends React.PureComponent<Props, {}> {
  handleSubmit = (values: Any) => {
    console.log('add - handleSubmit', values);
    const { createEntry, auth } = this.props;
    createEntry(values, auth.user.uid);
  }

  closeModal = (modalName: string) => {
    const { hideModal } = this.props;
    hideModal(modalName);
  }

  render () {
    const { handleSubmit, showAddModal, array: { push, insert } } = this.props;
    console.log('aaa', handleSubmit);
    return (
      <Dialog
        title="add entry"
        modal={true}
        open={showAddModal}
        onRequestClose={() => this.closeModal('addEntry')}
        autoScrollBodyContent={true}
      >
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <InputWrap>
            <Field
              component={TextField}
              floatingLabelFixed={true}
              floatingLabelText={'title'}
              fullWidth={true}
              name={'title'}
            />
          </InputWrap>
          
          <InputWrap>
            <Field
              component={TextField}
              floatingLabelFixed={true}
              floatingLabelText={'Description'}
              fullWidth={true}
              name={'description'}
              multiLine={true}
            />
          </InputWrap>

          <InputWrap>
            <Field
              component={DatePicker}
              floatingLabelFixed={true}
              floatingLabelText={'Date'}
              fullWidth={true}
              defaultDate={new Date()}
              name={`date`}
              format={(value: any, name: any) => value === '' ? new Date() : value}
            />
          </InputWrap>
          
          <FieldArray 
            name="checklistItems" 
            component={CheckList} 
            push={push}
            insert={insert}
          />
          
          <FlatButton 
            label="Primary" 
            primary={true} 
            onClick={handleSubmit(this.handleSubmit.bind(this))}
          />
        </form>
      
      </Dialog>
    );
  }
}

const InputWrap = styled.div`
  margin-bottom: 10px;
`;