import * as React from 'react';
import { StateProps, DispatchProps, OwnProps } from './CheckListContainer';
// import styled from 'styled-components';
import { 
  // TextField
} from 'redux-form-material-ui';
import { 
  // Field,
  // FieldArray
 } from 'redux-form';

export type Props = StateProps & OwnProps & DispatchProps;
interface OtherProps {
  // component state props here
  fields: any;
  push: any;
  list: any;
  array: any;
  insert: any;
  value: string;
  checkListItems: any[];
}

export default class Entries extends React.PureComponent<Props & OtherProps, OtherProps> {
  componentWillMount() {
    this.setState({
      checkListItems: [],
    });
  }
  
  pushToState(code: number,value: any) {
    const { push, list } = this.props;
    if(code === 13) {
      // console.log('register value', value, list);
      let checkListItem = {
        desc: value,
        checked: false,
      };

      let arr = this.state.checkListItems;
      arr.push(checkListItem);

      this.setState({ checkListItems: [...arr]});
      
      push('list', ...this.state.checkListItems);
      console.log('checkListItems: ', this.state.checkListItems, list);
    }
  }

  render() {
    const { fields, 
      list, 
      push,
      insert,
    } = this.props;
    
    // push('list', { desc: e.target.value });

    return (
      <ul>
        <input
          type="text"
          onKeyUp={(e: any) => {
            console.log('list: ', list);
            // return push('list', { desc: e.target.value });
            if(e.keyCode === 13) {
              if(list) {
                return push(`list`, { desc: e.target.value });
              } else {
                return insert(`list`, { desc: e.target.value });
              }
              
            } else {
              return false; 
            }
          }}
          // onKeyUp={(e: any) => {
          //  e.preventDefault();
          //  this.pushToState(e.keyCode, e.target.value);
          // }}
        />
        {list && list.map((todo: any, index: number) => {
          return (
            <li key={index}>
              <label>{todo.desc}</label>
              <button onClick={() => fields.remove(index)}>
                X
              </button>
            </li>
          );
        }
        )}
      </ul>
    );
  }
}

// const Wrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   overflow: scroll;
//   padding: 0 30px 0 230px;
// `;

// const InputWrap = styled.div`
//   margin-bottom: 10px;
// `;