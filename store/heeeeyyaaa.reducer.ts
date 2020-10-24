import { Action, createReducer, on } from '@ngrx/store';
import { HeeeeyyaaaPageState} from './heeeeyyaaa.state';
import { initialHeeeeyyaaaPageState } from './heeeeyyaaa.state';
import * as Actions from './heeeeyyaaa.actions';


/* The main reducer for the Heeeeyyaaa*/
const reducer = createReducer(initialHeeeeyyaaaPageState,


    on(Actions.initializePage, (state) => {
        return { ...state, isLoading: true };
    }),


    on(Actions.getPageData, (state) => {
        return { ...state, isLoading: true };
    }),


    on(Actions.receivePageData, (state, action) => {
        return {
            ...state,
            isLoading: false,
            isInitialized: true,
        };
    })
);


export function heeeeyyaaaListReducer(
    state: HeeeeyyaaaPageState = initialHeeeeyyaaaPageState,
    action: Action
): HeeeeyyaaaPageState {
    return reducer(state, action);
}
