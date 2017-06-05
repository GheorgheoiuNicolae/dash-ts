import { BaseAction, Dependencies } from './';

export interface InjectableAction<S> {
  (dependencies: Dependencies<S>): BaseAction;
}
