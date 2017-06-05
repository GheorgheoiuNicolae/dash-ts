import { InjectableDependencies, MiddlewareAPI } from './';

export type Dependencies<S> = InjectableDependencies & MiddlewareAPI<S>;
