import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Entry from './Entry';
import { InjectedRouter } from 'react-router';

export interface Props {
  router: InjectedRouter;
  params: {
    entryId: number;
  };
  handleSubmit?: any;
  entry: any;
}

export interface StateProps {}

export interface DispatchProps {}

export default connect<StateProps, DispatchProps, Props>(
  (state: ApplicationState, ownProps: Props) => {
    const { params: { entryId } } = ownProps;

    return {
      entry: state.entries.byId[entryId] as any
    };
  },
  {
  },
)((Entry));
