export const initialState = {
  ui: {
    selectedEntry: null,
    didInvalidate: false,
    showAddModal: false,
    showDeleteEntryModal: false,
    view: 'list',
    firstLoad: true,
    isLoading: {
      loading: false,
      type: null
    },
    numberOfEntries: null,
    shouldLoadOneYear: false,
    datesLoaded: {
      past: null,
      future: null,
    },
    filterBy: {
      date: {
        from: null,
        to: null,
      },
      kind: '',
      labels: [],
    },
    error: false,
  },
  byId: {},
  allIds: [],
};