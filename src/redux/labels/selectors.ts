import { createSelector } from 'reselect';
import { ApplicationState } from '../reducers';

const getLabels = (state: ApplicationState ) => 
  state.labels.allIds
  && state.labels.allIds.map((id: any) => {
    return state.labels.byId[id];
  }
);

export const denormalizeLabels = createSelector(
  getLabels,
  (items: any) => items
);

// export const denormalizeLabels = (state: any): any[] => {
//   console.log('DENORMALIZE',  state.labels.byId);
//   return state.labels.allIds ? state.labels.allIds.map((id: string) => state.labels.byId[id]) : [];
// };