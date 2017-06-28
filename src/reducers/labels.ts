import { BaseAction, Label } from '../types/';

export interface LabelsState {
    labels_initial_load: boolean;
    list: Label[];
}

export default function reducer(state: LabelsState = {
    labels_initial_load: true,
    list: [],
}, action: BaseAction) {
    switch(action.type) {
        case 'ADD_LABEL_TO_LIST': {
            return {...state };
        }
        case 'UPDATE_LABELS_LIST': {
            return {...state, labels_initial_load: false, list: action.payload };
        }
        default: {
            return {...state };
        }
    }
}