import * as React from 'react';
import { StateProps, DispatchProps, OwnProps } from './EntriesContainer';
import EntryListItem from './EntryListItem/EntryListItem';
export type Props = StateProps & OwnProps & DispatchProps;
interface OtherProps {
  // component state props here
}

export default class Entries extends React.Component<Props, OtherProps> {
  componentWillMount() {
    const { getEntries, user } = this.props;
    if(user) {
      getEntries(user.uid);
    }
  }
  componentWillReceiveProps(nextProps: any) {
    const { entries } = nextProps;
    console.log('next: ', entries);
  }

  render() {
    return (
      <div className="entries">
        <h3>Entries</h3>
        <EntryListItem />
      </div>
    );
  }
}
