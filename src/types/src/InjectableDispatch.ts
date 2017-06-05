
export interface InjectableDispatch<A> {
  (action: A): A;
}
