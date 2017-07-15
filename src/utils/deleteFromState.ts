export function deleteFromById(state: any, data: any) {
  const newState = Object.assign({}, state);
  delete newState[data.id];
  return newState; 
}

export function deleteFromAllIds(state: any, data: any) {
  const newState = [...state];
  const idx = newState.indexOf(data.id);
  newState.splice(idx, 1);
  return newState; 
}