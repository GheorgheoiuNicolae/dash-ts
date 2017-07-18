import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import Labels from './Labels';
import {reduxForm} from 'redux-form';
import { Any }  from '../../types';

export interface OwnOptionalProps {
  handleSubmit: Any;
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
)(reduxForm({
  form: 'labels',
})(Labels));
