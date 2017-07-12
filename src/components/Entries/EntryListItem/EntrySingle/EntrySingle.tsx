import * as React from 'react';
// import EntryForm from '../../../EntryForm/EntryForm';
import { Any } from '../../../../types/';
// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';

interface Props {
  entry: Any;
}
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
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  handleSubmit = (e: Any) => {
    e.preventDefault();
    // const { user, currentEntry } = this.props;

    // this.props.dispatch(action.editEntry(user.uid, currentEntry));
    this.handleClose();    
  }

  render () {
    const { entry } = this.props;
    // const actions = [(
    //   <FlatButton
    //     label="Cancel"
    //     primary={true}
    //     onTouchTap={this.handleClose}
    //   />),(
    //     <FlatButton
    //       label="Submit"
    //       primary={true}
    //       keyboardFocused={true}
    //       onTouchTap={this.handleSubmit}
    //     />
    //   ),
    // ];

    return (
      <div className="EntrySingle">
        <h3 className="title" >{entry.title}</h3>
        {/*<h3 className="title" onTouchTap={this.handleOpen} >{this.props.entry.title}</h3>*/}

        {/*<Dialog
          title="edit entry"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          
          <EntryForm editMode={true} />
        
        </Dialog>*/}
      </div>
    );
  }
}
