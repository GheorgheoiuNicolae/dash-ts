/*
 * {
    type: "UPDATE_USER_EMAIL",
    payload: "user@email.com"
  }
*/

export interface BaseAction {
  type: string;
  payload: any;
  meta?: {} | Function;
}

export default BaseAction;