import * as React from 'react';

export type InternalProps<P> = Readonly<{ children?: React.ReactNode } & P>;
