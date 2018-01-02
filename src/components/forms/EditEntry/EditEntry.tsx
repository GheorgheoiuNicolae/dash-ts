import * as React from 'react';
import { TextField, DatePicker, TimePicker } from 'redux-form-material-ui';
import { Field, FieldArray } from 'redux-form';
import styled from 'styled-components';
import { RaisedButton } from 'material-ui';
import * as moment from 'moment';
import Map from '../../Map/map';
import CheckList from '../../checkList/';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import LablesPicker from '../../forms/AddEntry/labelsPicker/';
import { StateProps, DispatchProps, OwnProps } from './EditEntryContainer';
import DeleteEntryModal from './DeleteEntryModal';
// icons
import Label from 'material-ui/svg-icons/action/label-outline';
import LabelFilled from 'material-ui/svg-icons/action/label';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ManageLabels from '../../forms//ManageLabels/';

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  labelsPopoverOpen: boolean;
  anchorEl: any;
}

export default class EditEntryForm extends React.PureComponent<Props, OtherProps> {
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

  handleSubmit = (values: any) => {
    const { editEntry, auth, entry, allDates } = this.props;

    values.dateTime = new Date(
      values.date.setHours(
        values.dateTime.getHours(),
        values.dateTime.getMinutes(),
        values.dateTime.getSeconds(),
        values.dateTime.getMilliseconds()
      )
    );
    values.date = new Date(values.date.setHours(0,0,0,0));

    if( entry.dateTime !== values.dateTime ) {
      let idx = allDates.indexOf(entry.dateTime.getTime());
      allDates[idx] = values.dateTime.getTime();
    }
    let entryData = {...values};

    entryData.dateTime = values.dateTime.getTime(),
    entryData.date = values.date.getTime(),
    editEntry(auth.user.uid, entryData, allDates);
  }

  handleManageLabels() {
    const { showModal } = this.props;
    showModal('manageLabels');
    this.handleLablelsPopoverClose();
  }

  handleLablelsPopoverOpen = (event: any) => {
    event.preventDefault();

    this.setState({
      labelsPopoverOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  openDeleteModal = (entry: any) => {
    const { showModal } = this.props;
    showModal('deleteEntry');
  }

  preventSubmitOnEnter = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  render () {
    const {
      auth,
      handleSubmit,
      entry,
      array: { push,insert },
      selectedLabels,
      labelsById,
      showModal,
      hideModal,
      activeModal,
      removeEntry,
      allDates,
      entriesCount,
    } = this.props;

    const latitude = entry.geoPlace.latitude;
    const longitude = entry.geoPlace.longitude;

    return (
      <EditEntryWrapper className="entry-form">
        <Form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <Content>
            <LeftSide>
              <InputWrap>
                <Field
                  component={TextField}
                  floatingLabelFixed={true}
                  floatingLabelText={'Title'}
                  onKeyPress={(e: any) => this.preventSubmitOnEnter(e)}
                  fullWidth={true}
                  name={`title`}
                  className="input-wrapper input"
                />
              </InputWrap>

              <InputWrap>
                <Field
                  component={TextField}
                  floatingLabelFixed={true}
                  floatingLabelText={'Description'}
                  fullWidth={true}
                  name={'description'}
                  onKeyPress={(e: any) => this.preventSubmitOnEnter(e)}
                  multiLine={true}
                  className="textarea-wrapper input"
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
                  formatDate={(date: Date) => moment(date).format('ll')}
                />
              </InputWrap>

              <InputWrap>
                <Field
                  component={(props: any) => {
                    if(typeof props.input.value === 'number') {
                      props.input.value = new Date(props.input.value);
                    }
                    return <TimePicker {...props} />;
                  }}
                  autoOk={true}
                  format={null}
                  floatingLabelFixed={true}
                  floatingLabelText={'Time'}
                  fullWidth={true}
                  name={`dateTime`}
                  className="datepicker-wrapper input"
                />
              </InputWrap>

              {/* Labels start */}
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

                {selectedLabels && labelsById && selectedLabels.map((id: any) => {
                  return labelsById[id] && (
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
              {/* Labels end */}

              {latitude && <div className="map">
                <div style={{display: 'flex'}}>
                  <LocationIcon />
                  <LocationLabel>Location</LocationLabel>
                </div>
                <Map lat={latitude} lng={longitude} width={'100%'} />
              </div> }
            </RightSide>
          </Content>
          <Footer>
            <DeleteButton
              onClick={() => this.openDeleteModal(entry)}
              label="Delete entry"
              secondary={true}
              className="dangerButton"
              keyboardFocused={false}
            />
            <SaveButton
              label="Save"
              secondary={true}
              className="successButton"
              keyboardFocused={true}
              type={'submit'}
            />
          </Footer>
        </Form>
        <ManageLabels />
        <DeleteEntryModal
          showModal={showModal}
          hideModal={hideModal}
          removeEntry={removeEntry}
          activeModal={activeModal}
          uid={auth.user.uid}
          entry={entry}
          entriesCount={entriesCount}
          allDates={allDates}
        />
      </EditEntryWrapper>
    );
  }
}

const EditEntryWrapper = styled.section`
  display: flex;
  flex: 1;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  justify-content: space-between;
`;
const InputWrap = styled.div`
  margin-bottom: 10px;
`;
const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 20px 20px 0 20px;
`;
const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 7;
  padding: 0 20px 20px 0;
`;
const RightSide = styled.div`
  display: flex;
  flex: 3;
  padding: 0 20px 0 20px;
  border-left: 1px solid #eee;
  flex-direction: column;
`;
const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  border-top: 1px solid #eee;
  padding: 10px;
  align-items: flex-end;
  justify-content: space-between;
`;
const SaveButton = styled(RaisedButton)`
  max-width: 120px;
`;
const DeleteButton = styled(RaisedButton)`

`;

const LabelsSelect = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
`;
const StyledLabelIcon = styled(Label)`
  color: #673AB7!important;
`;
const LabelTitle = styled.span`
  margin: 0 10px;
`;
const LabelsPopover = styled.div`
  padding: 5px;
  min-width: 200px;
  justify-content: space-around;
`;
const LabelsPopoverHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
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
const LocationLabel = styled.h4`
  margin: 3px 10px 10px 10px;
  font-weight: 400;
`;
