import { BaseAction } from './';

export interface Action<P> extends BaseAction {
  payload: P;
  meta?: P;
}
