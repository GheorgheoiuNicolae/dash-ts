export interface EntriesInitialState {
  allIds: number[] | string[];
  ui: {
    selectedEntry: any;
    didInvalidate: boolean;
    showAddModal: boolean;
    filterBy: EntriesFilterBy;
    error: boolean;
    view: string;
    firstLoad: boolean;
    isLoading: {
      loading: boolean;
      type: 'initial' | 'future' | 'past' | null;
    };
    shouldLoadOneYear: boolean;
    datesLoaded: {
      past: any,
      future: any,
    }
  };
  byId: any;
}

interface EntriesFilterBy {
  date: {
    from?: Date | null;
    to?: Date | null;
  };
  kind: any;
  labels: any[];
}