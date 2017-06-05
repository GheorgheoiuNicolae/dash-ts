import { GenericAction, InjectableDispatch } from './';

export interface ReduxComponentProps<T> {
  dispatch: InjectableDispatch<GenericAction<T>>;
}
