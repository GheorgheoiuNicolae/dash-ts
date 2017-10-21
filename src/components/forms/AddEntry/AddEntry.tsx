import * as React from 'react';
import { 
  TextField, 
  DatePicker,
  TimePicker
} from 'redux-form-material-ui';
import { Dialog, FlatButton, RaisedButton } from 'material-ui';
import { Field, FieldArray } from 'redux-form';
import styled from 'styled-components';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import { StateProps, DispatchProps, OwnProps } from './AddEntryContainer';
import CheckList from '../../checkList/';
import LablesPicker from './labelsPicker/';
import * as moment from 'moment';
import Close from 'material-ui/svg-icons/navigation/close';
import Label from 'material-ui/svg-icons/action/label-outline';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

import './AddEntry.css';

export type Props = StateProps & OwnProps & DispatchProps;
interface OtherProps {
  labelsPopoverOpen: boolean;
  anchorEl: any;
}

export default class AddEntryForm extends React.PureComponent<Props, OtherProps> {
  constructor() {
    super();
    this.state = {
      labelsPopoverOpen: false,
      anchorEl: null
    };
  }

  handleLablelsPopoverClose = () => {
    this.setState({
      labelsPopoverOpen: false,
    });
  };

  handleLablelsPopoverOpen = (event: any) => {    
    event.preventDefault();

    this.setState({
      labelsPopoverOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  handleSubmit = (values: any) => {
    const { createEntry, auth, destroy, hideModal } = this.props;
    values.dateTime = new Date(values.date).getTime();
    values.date = new Date(values.date).setHours(0,0,0,0);
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
                  autoFocus={true}
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
              <InputWrap>
                <Field
                  component={(props: any) => <TimePicker {...props} />}
                  autoOk={true}
                  format={null}
                  floatingLabelFixed={true}
                  floatingLabelText={'Time'}
                  fullWidth={true}
                  name={`date`}
                  className="datepicker-wrapper input"
                />
              </InputWrap>

              <InputWrap>
                <LabelsSelect onClick={(e: any) => this.handleLablelsPopoverOpen(e)}>
                  <StyledLabelIcon className="label-icon" />
                  <LabelTitle>Labels</LabelTitle>
                  <ArrowDropDown className="label-icon-right" />
                </LabelsSelect>
                <Popover
                  open={this.state.labelsPopoverOpen}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={() => this.handleLablelsPopoverClose()}
                  animation={PopoverAnimationVertical}
                >
                  <LabelsPopover>
                    <LabelsPopoverHeader>
                      <strong>Assign labels</strong>
                      <small className="link">Manage</small>
                    </LabelsPopoverHeader>
                    <LablesPicker/>
                  </LabelsPopover>
                </Popover>
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
  flex-direction: column;
`;
const InputWrap = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;
const LabelsPopover = styled.div`
  padding: 5px;
  min-width: 200px;
  justify-content: space-around;
`;
const LabelsSelect = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const LabelTitle = styled.span`
  margin: 0 10px;
`;
const LabelsPopoverHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
`;
const StyledLabelIcon = styled(Label)`
  color: #673AB7!important;
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
