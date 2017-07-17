import * as React from 'react';
import { TextField } from 'redux-form-material-ui';
import { Field } from 'redux-form';
import { Any } from '../../../../types/';
import styled from 'styled-components';
import { StateProps, DispatchProps, OwnProps } from './EditEntryContainer';

export type Props = StateProps & OwnProps & DispatchProps;

export default class EditEntryForm extends React.PureComponent<Props, {}> {
  componentWillMount() {
    console.log('edit form');
  }

  submitForm = (v: Any) => {
    console.log('submit form');
  }

  render () {
    const { handleSubmit } = this.props;
    return (
      <div className="entry-form">
        <form onSubmit={handleSubmit(this.submitForm)}>
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

          {/* <EntryLabels 
            labels={this.state.labels} 
            updateLabelList={this.updateLabelList.bind(this)} 
          />

          <EntryImages 
            uid={this.props.store.user.uid} 
            dispatch={this.props.dispatch}
            updateEntryImageList={this.updateEntryImageList.bind(this)}
            images={this.state.images}
            entry={this.props.entry}
          />*/}
        </form>
      </div>
    );
  }
}

const InputWrap = styled.div`
  margin-bottom: 10px;
`;