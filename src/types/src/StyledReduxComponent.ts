import StyledComponent from '../../styled-component/src/';
import { ReduxComponentProps } from './';

// tslint:disable-next-line:no-any
export abstract class StyledReduxComponent<P> extends StyledComponent<P & ReduxComponentProps<any>, void> { }
