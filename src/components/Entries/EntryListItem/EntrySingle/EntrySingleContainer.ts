import { connect } from 'react-redux';
import { ApplicationState } from '../../../../reducers';
import EntrySingle from './EntrySingle';
import {Any } from '../../../../types';

export interface OwnOptionalProps {
  entry: Any;
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  
}

export interface DispatchProps {}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      
    };
  },
  {
    
  },
)(EntrySingle);
