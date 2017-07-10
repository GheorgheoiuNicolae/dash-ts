import * as React from 'react';

// export type Props = StateProps & OwnProps & DispatchProps;
interface OtherProps {
  // component state props here
}

export default class EntryListItem extends React.Component<{}, OtherProps> {
  componentWillMount() {
    console.log('EntryListItem');
  }

  render() {
    return (
      <div className="entries">
        <h3>single</h3>
      </div>
    );
  }
}
