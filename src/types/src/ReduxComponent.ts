import * as React from 'react';
import { ReduxComponentProps } from './';

// tslint:disable-next-line:no-any
export abstract class ReduxComponent<P> extends React.PureComponent<P & ReduxComponentProps<any>, void> { }
