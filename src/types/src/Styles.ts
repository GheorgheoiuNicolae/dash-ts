import { StyleObject, Styles } from '../../styled-component/src';

export type Styles<K extends string> = Styles<K>;

export type Style = {
  [key: string]: StyleObject;
};
