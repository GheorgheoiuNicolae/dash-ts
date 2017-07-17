import * as React from 'react';
import EditEntryForm from '../../forms/EditEntry';
import { Any } from '../../../../types/';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { StateProps, DispatchProps, OwnProps } from './EntrySingleContainer';

type Props = StateProps & DispatchProps & OwnProps;

interface OtherProps {
  // component state props here
  handleOpen: Any;
  open: boolean;
  submitDisabled: boolean;
}

export default class EntrySingle extends React.Component<Props, OtherProps> {
  componentWillMount() {
    this.setState({
      open: false,
      submitDisabled: false
    });
  }

  handleOpen = () => {
    const { setCurrentEntry, entry } = this.props;
    setCurrentEntry(entry);

    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  handleSubmit = (e: Any) => {
    e.preventDefault();
    console.log('submit form?');
    
    this.handleClose();    
  }

  render () {
    const { entry } = this.props;
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
          onTouchTap={this.handleSubmit}
        />
      ),
    ];

    return (
      <div className="EntrySingle">
        <FlatButton 
          className="title" 
          onTouchTap={this.handleOpen}
        >
          {entry.title}
        </FlatButton>

        <Dialog
          title="Edit Entry"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          
          <EditEntryForm />
        
        </Dialog>
      </div>
    );
  }
}
