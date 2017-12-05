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
import LabelFilled from 'material-ui/svg-icons/action/label';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ManageLabels from '../ManageLabels/';
import Map from '../../Map/map';

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
  }

  handleLablelsPopoverOpen = (event: any) => {    
    event.preventDefault();

    this.setState({
      labelsPopoverOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  handleSubmit = (values: any) => {
    const { createEntry, auth, 
      resetForm, 
      hideModal,
      location,
    } = this.props;
    
    values.dateTime = new Date(values.date).getTime();
    values.date = new Date(values.date).setHours(0,0,0,0);
    values.geoPlace = {
      latitude: location ? location.coords.latitude : 0,
      longitude: location ? location.coords.longitude : 0
    };
    
    createEntry(values, auth.user.uid);
    hideModal('addEntry');
    resetForm('addEntry');
  }

  closeModal = (modalName: string) => {
    const { hideModal } = this.props;
    hideModal(modalName);
  }

  handleManageLabels() {
    const { showModal } = this.props;
    showModal('manageLabels');
    this.handleLablelsPopoverClose();
  }

  render () {
    const { handleSubmit, 
      showAddModal, 
      array: { push, insert }, 
      selectedLabels, 
      labelsById, 
      location 
    } = this.props;    
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
                  autoOk={true}
                  className="datepicker-wrapper input"
                  formatDate={(date: any) => moment(date).format('ll')}
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
                      <small 
                        onClick={() => this.handleManageLabels()}
                        style={{cursor: 'pointer', color: '#3f51b5'}}
                      >
                        Manage
                      </small>
                    </LabelsPopoverHeader>
                     {/* <LablesPicker/>  */}
                    <FieldArray 
                      name="labels" 
                      component={(props: any) => <LablesPicker {...props} selectedLabelIds={selectedLabels} />} 
                      push={push}
                      insert={insert}
                    /> 
                  </LabelsPopover>
                </Popover>

                {selectedLabels && selectedLabels.map((id: any) => {
                  return (
                    <LabelSingle 
                      key={labelsById[id].id}
                      className="selectedLabel"
                    >
                      <StyledLabelFilled style={{color: labelsById[id].color}} />
                      <LabelName 
                        className="name"
                      >
                        {labelsById[id].name}
                      </LabelName>
                    </LabelSingle>
                  );
                })}
              </InputWrap>
              { location && <div className="map">
                <div style={{display: 'flex'}}>
                  <StyledLocationIcon />
                  <LocationLabel>Location</LocationLabel>
                </div>
                <Map lat={location.coords.latitude} lng={location.coords.longitude} />
              </div> }
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
        <ManageLabels />
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
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
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
const LabelSingle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #f8f8ff;
  padding: 5px 2px;
`;
const LabelName = styled.div`
  flex: 1;
  font-size: 14px
`;
const StyledLabelFilled = styled(LabelFilled)`
  width: 18px!important;
  height: 18px!important;
  margin-right: 10px;
`;
const StyledLocationIcon = styled(LocationIcon)`
  color: #f44336!important;
`;
const LocationLabel = styled.h4`
  margin: 3px 10px 10px 10px;
  font-weight: 400;
`;
