import * as React from 'react';
import { StateProps, DispatchProps, OwnProps } from './CheckListContainer';
import { TextField } from 'redux-form-material-ui';
import { FlatButton, 
  List, ListItem, Subheader, Checkbox 
} from 'material-ui';
import { Field } from 'redux-form';
import styled from 'styled-components';

export type Props = StateProps & OwnProps & DispatchProps;

interface OtherProps {
  fields: any;
  push: any;
  itemInEdit: number | null;
}

export default class Entries extends React.PureComponent<Props & OtherProps, OtherProps> {

  toggleCheck(index: number) {
    const { fields } = this.props;
    const items = fields.getAll();
    items[index].completed = !items[index].completed;
    console.log('toggle: ', items);
    fields.remove(index);
    fields.insert(index, items[index]);
  }

  createNewItem() {
    const { fields } = this.props;
    const items = fields.getAll();
    if(!items || items.length === 0 || items && items.length > 0 && items[items.length -1].text) {
      fields.push({completed: false, text: ''});
    }
  }

  removeEmptyTodo (index: number) {
    const { fields } = this.props;
    const items = fields.getAll();
    if(!items[index].text) {
      fields.remove(index);
    }
  }

  render() {
    const { fields } = this.props;
    const items = fields.getAll();

    return (
      <Wrap>
        <div onClick={() => this.createNewItem()} >
          <Subheader>Checklist</Subheader>
        </div>
        <List>
          {fields.map((member: any, index: any) => (
            <div key={index}>
              <ListItem 
                primaryText={items[index].text}
                rightIconButton={
                  <FlatButton 
                    label="Remove"
                    onClick={() => fields.remove(index)}
                  />
                }
                leftCheckbox={<Checkbox onCheck={() => this.toggleCheck(index)} />}
              >
                {items.length -1 === index && !items[items.length - 1].text && (
                  <Field
                    name={`${member}.text`}
                    type="text"
                    component={TextField}
                    label="Todo"
                    onKeyUp={(e: any) => e.keyCode === 13 && fields.push({completed: false, text: ''})}
                    onBlur={() => this.removeEmptyTodo(index)}
                    autoFocus={true}
                  />
                )}
              </ListItem>
            </div>
          ))}
        </List>
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  margin-bottom: 10px;
`;
