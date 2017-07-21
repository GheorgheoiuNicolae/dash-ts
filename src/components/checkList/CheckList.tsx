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
}

export default class Entries extends React.PureComponent<Props & OtherProps, OtherProps> {
  render() {
    const { fields } = this.props;
    const items = fields.getAll();
    
    return (
      <Wrap>
        <FlatButton 
          label="Add Checklist" 
          primary={true}  
          onClick={() => fields.push({completed: false, text: ''})} 
        />
        <List>
          <Subheader>Checklist</Subheader>
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
                leftCheckbox={<Checkbox onChange={() => console.log('checkbox')} />}
              >
                {fields.length -1 === index && (
                  <Field
                    name={`${member}.text`}
                    type="text"
                    component={TextField}
                    label="Todo"
                    onKeyUp={(e: any) => e.keyCode === 13 && fields.push({completed: false, text: ''})}
                    autoFocus={true}
                  />
                )}
              </ListItem>
            </div>
          ))}
        </List>
        {/*<ul>
          {fields.map((member: any, index: any) => (
            <li key={index}>
              <button
                type="button"
                title="Remove Member"
                onClick={() => fields.remove(index)}
              />
              
              <h5>{items[index].text}</h5>

              {fields.length -1 === index && (
                <div>
                  <Field
                    name={`${member}.text`}
                    type="text"
                    component={TextField}
                    label="Todo"
                    onKeyUp={(e: any) => e.keyCode === 13 && fields.push({completed: false, text: ''})}
                    autoFocus={true}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>*/}
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  margin-bottom: 10px;
`;