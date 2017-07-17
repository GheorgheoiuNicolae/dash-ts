import * as React from 'react';
import EditEntryForm from '../../forms/EditEntry';
import { StateProps, DispatchProps, OwnProps } from './EntrySingleContainer';

type Props = StateProps & DispatchProps & OwnProps;

interface OtherProps {
  // component state props here
}

export default class EntrySingle extends React.Component<Props, OtherProps> {

  render () {
    const { entry } = this.props;

    return (
      <div className="EntrySingle">
        <EditEntryForm entry={entry} />
      </div>
    );
  }
}
