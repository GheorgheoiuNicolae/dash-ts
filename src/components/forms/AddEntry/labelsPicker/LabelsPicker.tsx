import * as React from 'react';
import styled from 'styled-components';
import Label from 'material-ui/svg-icons/action/label';
import Check from 'material-ui/svg-icons/navigation/check';

import { StateProps, DispatchProps, OwnProps } from './LabelsPickerContainer';

export type Props = StateProps & OwnProps & DispatchProps;
interface FormProps {
  fields: any;
  push: any;
}
interface OtherProps {
}

interface ILabel {
  name: string;
  color: string;
  id: number;
}

export default class LabelsPicker extends React.PureComponent<Props & FormProps, OtherProps> {
  handleClick(label: any) {
    const { fields, selectedLabelIds } = this.props;
    if(selectedLabelIds && selectedLabelIds.length) {
      const labelExists = selectedLabelIds.filter((id: any) => id === label.id );
      if ( labelExists.length ) {
        const idx = selectedLabelIds.indexOf(label.id);
        fields.remove(idx);
      } else {
        fields.push(label.id);
      }
    } else {
      fields.push(label.id);
    }
  }

  render() {
    const { selectedLabelIds } = this.props;
    const { labels } = this.props;
    return (
      <Wrap>
        {labels.map((label: ILabel) => {
          const isSelected = selectedLabelIds && selectedLabelIds.find((id: any) => id === label.id);
          const checkColor = isSelected ? '#4caf50' : '#c3c3c3';
          return (
            <LabelSingle 
              key={label.id}
              onClick={() => this.handleClick(label)}
              className={isSelected && 'selectedLabel'}
              style={{background: isSelected && '#E8F5E9'}}
            >
              <StyledLabelIcon style={{color: label.color}} />
              <LabelName className="name">{label.name}</LabelName>
              <StyledCheckIcon style={{color: checkColor}} />
            </LabelSingle>
          );
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
  margin-bottom: 2px;
`;
const LabelName = styled.div`
  flex: 1;
  font-size: 14px;
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