import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { StateProps, DispatchProps, OwnProps } from './LabelsContainer';
import styled from 'styled-components';

export type Props = StateProps & OwnProps & DispatchProps;

export default class Labels extends React.Component<Props, {}> {
  constructor (){
    super();
    this.state = {
      labelName: '',
      editMode: false
    }
  }
  componentWillMount() {
    console.log('this', this);
  }
  handleChange (e: any){
    e.preventDefault();
    this.setState({
      labelName: e.target.value
    })
    console.log('name: ', this.state)
  }
  handleSubmit(){
    console.log("state: ", this.state)
  }
  
  render() {
    return (
      <div className="entries">
        <Wrap>
          <h3>Labels</h3>
          <input 
          onChange={this.handleChange.bind(this)}
          onSubmit={this.handleSubmit.bind(this)}
          type="text" placeholder="add your lable here"/>
          <FlatButton>ADD</FlatButton>
           <div className="labelList">
           
          </div>
        </Wrap>
      </div>
    );
  }
}

const Wrap = styled.div`
  padding-left: 300px;
`;
