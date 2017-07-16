import { Any } from '../types';

export function deleteFromById(state: Any, data: Any) {
  const newState = Object.assign({}, state);
  delete newState[data.id];
  return newState; 
}

export function deleteFromAllIds(state: Any, data: Any) {
  const newState = [...state];
  const idx = newState.indexOf(data.id);
  newState.splice(idx, 1);
  return newState; 
}