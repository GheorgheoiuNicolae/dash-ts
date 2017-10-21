import * as React from 'react';
import styled from 'styled-components';
import Label from 'material-ui/svg-icons/action/label';
import Check from 'material-ui/svg-icons/navigation/check';

import { StateProps, DispatchProps, OwnProps } from './LabelsPickerContainer';

export type Props = StateProps & OwnProps & DispatchProps;
interface OtherProps {}

interface label {
  name: string;
  color: string;
  id: number;
}

const labels: label[] = [{
  name: 'Travel',
  color: 'purple',
  id: 1
}, {
  name: 'Medical',
  color: 'red',
  id: 5,
}]

export default class LabelsPicker extends React.PureComponent<Props, OtherProps> {
  handleClick(label: any) {
    console.log('handle label click', label);
  }

  render() {
    // const {selectedLabels} = this.props;
    const selectedLabels = [3, 5];

    return (
      <Wrap>
        {labels.map((label: label) => {
          const isSelected = selectedLabels.find((id: any) => id === label.id);
          const checkColor = isSelected ? '#4caf50' : '#c3c3c3';
          return (
            <LabelSingle 
              key={label.id}
              onClick={() => this.handleClick(label)}
            >
              <StyledLabelIcon style={{color: label.color}} />
              <LabelName className="name">{label.name}</LabelName>
              <StyledCheckIcon style={{color: checkColor}} />
            </LabelSingle>
          )
        })}
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const LabelSingle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const LabelName = styled.div`
  flex: 1;
`;
const StyledLabelIcon = styled(Label)`
  width: 18px!important;
  height: 18px!important;
  padding: 5px;
`;
const StyledCheckIcon = styled(Check)`
  width: 18px!important;
  height: 18px!important;
  padding: 5px;
`;