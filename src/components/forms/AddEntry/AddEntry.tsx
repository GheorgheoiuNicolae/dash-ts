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
              floatingLabelText={'Title'}
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
              name={`date`}
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
        </form>
      
      </Dialog>
    );
  }
}

const InputWrap = styled.div`
  margin-bottom: 10px;
`;