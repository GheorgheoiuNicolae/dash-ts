import * as React from 'react';
import { TextField,  } from 'redux-form-material-ui';
import { Field } from 'redux-form';
import { Any } from '../../../types/';
import styled from 'styled-components';
import { FlatButton } from 'material-ui';
import { StateProps, DispatchProps, OwnProps } from './EditEntryContainer';

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  handleSubmit: Any;
}

export default class EditEntryForm extends React.PureComponent<Props, OtherProps> {
  handleSubmit = (values: Any) => {
    const { editEntry, auth } = this.props;
    editEntry(values, auth.user.uid);
  }

  render () {
    const { handleSubmit } = this.props;
    return (
      <div className="entry-form">
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <InputWrap>
            <Field
              component={TextField}
              floatingLabelFixed={true}
              floatingLabelText={'Title'}
              fullWidth={true}
              name={`title`}
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
          
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            type={'submit'}
          />
        </form>
      </div>
    );
  }
}

const InputWrap = styled.div`
  margin-bottom: 10px;
`;