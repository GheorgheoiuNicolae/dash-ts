import { connect } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import CheckList from './CheckList';

export interface OwnOptionalProps {}
export interface OwnProps extends Partial<OwnOptionalProps> {}
export interface StateProps {}
export interface DispatchProps {
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: ApplicationState) => {
    return {
      
    };
  },
  {
    
  },
)(CheckList);
