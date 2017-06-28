import AllTypes from './AllTypes';

/*
 * {
    type: "UPDATE_USER_EMAIL",
    payload: "user@email.com"
  }
*/

export interface BaseAction {
  type: string;
  payload: AllTypes;
  meta?: {} | Function;
}

export default BaseAction;