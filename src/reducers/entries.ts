import { BaseAction, Entry } from '../types/';

export interface EntriesState {
    entries_initial_load: boolean;
    list: Entry[];
}

export default function reducer(state: EntriesState = {
    entries_initial_load: true,
    list: []
}, action: BaseAction) {
    switch(action.type) {
        case 'ADD_ENTRY_TO_LIST': {
            return {...state};
        }
        case 'UPDATE_ENTRY_LIST': {
            return {...state, entries_initial_load: false, list: action.payload};
        }
        default: {
            return {...state};
        }
    }
}