import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import Sidebar from './Sidebar';

export interface OwnOptionalProps {
  
}

export interface OwnProps extends Partial<OwnOptionalProps> {}

export interface StateProps {
  
}

export interface DispatchProps {
}

export interface OwnProps {}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      
    };
  },
  {
  },
)(Sidebar);
