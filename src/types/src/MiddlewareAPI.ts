import { Action, BaseAction, InjectableAction, InjectableDispatch } from './';

export interface MiddlewareAPI<S> {
  dispatch: InjectableDispatch<Action<any> | InjectableAction<any> | BaseAction>;
  getState: () => S;
}
