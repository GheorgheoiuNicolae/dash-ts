export interface LabelsInitialState {
  ui: {
    didInvalidate: boolean,
    showManageLabelsModal: boolean,
    firstLoad: boolean,
    isLoading: boolean,
    error: any,
  },
  byId: any,
  allIds: any[],
};