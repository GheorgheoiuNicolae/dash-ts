import * as React from 'react';
import { TextField,  } from 'redux-form-material-ui';
import { Field } from 'redux-form';
import { Any } from '../../../../types/';
import styled from 'styled-components';
import { Dialog, FlatButton } from 'material-ui';
import { StateProps, DispatchProps, OwnProps } from './EditEntryContainer';

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  // component state props here
  // onSubmit: Any;
  handleOpen: Any;
  handleClose: Any;
  handleSubmit: Any;
  open: boolean;
  submitDisabled: boolean;
}

// export const myRemoteSubmit = (values) => () => console.log(values);

export default class EditEntryForm extends React.PureComponent<Props, OtherProps> {
  componentWillMount() {
    this.setState({
      open: false,
      submitDisabled: false
    });
    console.log('mount', this.props);
  }

  submitForm = (v: Any, a: Any) => {
    console.log('submit form', v, a);
  }

  handleOpen = () => {
    const { entry, setCurrentEntry } = this.props;
    setCurrentEntry(entry);

    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  handleSubmit = (values: Any) => {
    // const { formValues } = this.props;
    // console.log('handleSubmit: ', formValues.editEntry.values);
    console.log('values', values);
  }

  render () {
    const { handleSubmit, entry } = this.props;
    const actions = [(
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />),(
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}

        />
      ),
    ];

    return (
      <div className="entry-form">
        <FlatButton 
          className="title" 
          onTouchTap={this.handleOpen}
        >
          {entry ? entry.title : 'not loaded'}
        </FlatButton>

          <Dialog
            title="Edit Entry"
            actions={actions}
            modal={true}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
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
            </form>
          </Dialog>

      </div>
    );
  }
}

const InputWrap = styled.div`
  margin-bottom: 10px;
`;