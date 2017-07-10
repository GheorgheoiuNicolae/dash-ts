import { Any } from './Any';
/*
 * {
    type: "UPDATE_USER_EMAIL",
    payload: "user@email.com"
  }
*/

export interface BaseAction {
  type: string;
  payload: Any;
  meta?: {} | Function;
}

export default BaseAction;