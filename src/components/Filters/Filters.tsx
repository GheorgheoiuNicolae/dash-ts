import * as React from 'react';
import { StateProps, DispatchProps, OwnProps } from './FiltersContainer';
import { 
  Checkbox, 
  DatePicker,
} from 'redux-form-material-ui';
import { RaisedButton, IconButton } from 'material-ui';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import * as moment from 'moment';
import { Field, FieldArray } from 'redux-form';
// import LablesPicker from './labelsPicker/';
import LabelFilled from 'material-ui/svg-icons/action/label';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import LablesPicker from '../forms/AddEntry/labelsPicker/';
import Close from 'material-ui/svg-icons/navigation/close';
import styled from 'styled-components';

export type ContainerProps = StateProps & DispatchProps & OwnProps;
interface OtherProps {
  labelsPopoverOpen: boolean;
  anchorEl: any;
}

export default class Filters extends React.PureComponent<ContainerProps, OtherProps> {
  constructor() {
    super();
    this.state = {
      labelsPopoverOpen: false,
      anchorEl: null
    };
  }

  componentWillMount() {
    const {
      auth,
      getAllEntries,
      allEntriesLoaded,
    } = this.props;

    if(!allEntriesLoaded) {
      getAllEntries(auth.user.uid);
    }
  }

  handleLablelsPopoverClose = () => {
    this.setState({
      labelsPopoverOpen: false,
    });
  }

  clearAllFilters = () => {
    const {
      filterEntries,
    } = this.props;

    const filters = {
      date: {
        from: null,
        to: null,
      },
      kind: '',
      labels: [],
      hasChecklist: null,
      hasDescription: null,
    };
    filterEntries(filters);
  }

  closeFiltersPopover = () => {
    const {
      toggleFilterDrawer,
    } = this.props;
    toggleFilterDrawer();
  }

  handleLablelsPopoverOpen = (event: any) => {    
    event.preventDefault();

    this.setState({
      labelsPopoverOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  handleSubmit = (values: any) => {
    const {
      filterEntries,
      toggleFilterDrawer,
    } = this.props;

    const dateFromIsEmpty = Object.keys(values.dateFrom).length === 0 && values.dateFrom.constructor === Object;
    const dateToIsEmpty = Object.keys(values.dateTo).length === 0 && values.dateTo.constructor === Object;

    const filters = {
      date: {
        from: values.dateFrom && !dateFromIsEmpty ? values.dateFrom.getTime() : null,
        to: values.dateTo && !dateToIsEmpty ? values.dateTo.getTime() : null,
      },
      kind: '',
      labels: values.labels || [],
      hasChecklist: values.hasChecklist || null,
      hasDescription: values.hasDescription || null,
    };
    
    filterEntries(filters);
    toggleFilterDrawer();
  }

  render() {
    const { 
      handleSubmit, 
      filtersDrawerOpen,
      array: { push, insert }, 
      selectedLabels, 
      labelsById, 
    } = this.props;  

    return  filtersDrawerOpen ? (
      <Wrap>
        <IconButton 
          onClick={() => this.closeFiltersPopover()}
          style={{color: 'crimson', position: 'absolute', right: '20px'}}
        >
          <Close />
        </IconButton>
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
           {/* <Label>Date Range</Label> */}
           <DateRange>
            <InputWrap>
              <Field
                component={DatePicker}
                floatingLabelFixed={true}
                floatingLabelText={'From date'}
                name={`dateFrom`}
                autoOk={true}
                className="datepicker-wrapper input"
                formatDate={(date: any) => moment(date).format('ll')}
              />
            </InputWrap>
            <InputWrap>
              <Field
                component={DatePicker}
                floatingLabelFixed={true}
                floatingLabelText={'To date'}
                name={`dateTo`}
                autoOk={true}
                className="datepicker-wrapper input"
                formatDate={(date: any) => moment(date).format('ll')}
              />
            </InputWrap>
          </DateRange> 

          {/* filter by labels  */}
          {/* <Label>Labels</Label> */}
          <InputWrap>
            <LabelsSelect onClick={(e: any) => this.handleLablelsPopoverOpen(e)}>
              <LabelTitle>Contains labels</LabelTitle>
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
                  {/* <LablesPicker/>  */}
                <FieldArray 
                  name="labels" 
                  component={(props: any) => <LablesPicker {...props} selectedLabelIds={selectedLabels} />} 
                  push={push}
                  insert={insert}
                /> 
              </LabelsPopover>
            </Popover>

            <SelectedLabelsWrapper className="selectedLabelsWrapper">
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
            </SelectedLabelsWrapper>
          </InputWrap>
          {/* /end filter by labels  */}

          {/* <Label>Entry properties</Label> */}
          <section className="entry-properties">
            <InputWrap>
              <Field
                component={Checkbox}
                label={'With description'}
                name={`hasDescription`}
                className="checkbox-wrapper"
              />
            </InputWrap>
            <InputWrap>
              <Field
                component={Checkbox}
                label={'With checklist'}
                name={`hasChecklist`}
                className="checkbox-wrapper"
              />
            </InputWrap>
          </section>
          
          <RaisedButton
            label="Clear filters" 
            secondary={true}
            className="dangerButton"
            onClick={() => this.clearAllFilters()}
            style={{margin: '10px 10px 0 0'}}
          />
          <RaisedButton 
            label="Apply filters" 
            secondary={true}
            className="successButton"
            onClick={handleSubmit(this.handleSubmit.bind(this))}
            style={{margin: '10px 10px 0 0'}}
          />
        </form>
      </Wrap>
    ) : null;
  }
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  display: flex;
  width: calc(100% - 200px);;
  z-index: 1;
  background: #fff;
  margin-right: 20px;
  margin-top: 50px;
  background: #fff;
  position: absolute;
  box-sizing: border-box;
  padding: 20px;
  z-index: 2;
  box-shadow: 5px 5px 10px #989898;
`;
const DateRange = styled.section`
  display: flex;
  flex-direction: row;
  flex: 1;
`;
// const ClearFiltersButton = styled(RaisedButton)`
//   position: absolute;
//   right: 20px;
//   top: 10px;
// `;
// const Label = styled.h5`  
//   margin-bottom: 10px;
//   margin-top: 0;
// `;
const InputWrap = styled.div`
  margin-bottom: 10px;
  margin-right: 20px;
  // width: 140px;
`;
const LabelName = styled.div`
  flex: 1;
  font-size: 14px
`;
const StyledLabelFilled = styled(LabelFilled)`
  width: 18px!important;
  height: 18px!important;
  margin-right: 5px;
`;
const LabelSingle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #f8f8ff;
  margin-right: 20px;
`;
const SelectedLabelsWrapper = styled.section`
  display: flex;
  flex-direction: row;
`;
const LabelsSelect = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
  width: 300px;
`;
const LabelTitle = styled.span`
  margin: 0 10px;
`;
const LabelsPopover = styled.div`
  padding: 5px;
  min-width: 200px;
  justify-content: space-around;
`;