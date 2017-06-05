import { Action, BaseAction, InjectableAction } from './';

export type GenericAction<T> = BaseAction | Action<T> | InjectableAction<T>;
