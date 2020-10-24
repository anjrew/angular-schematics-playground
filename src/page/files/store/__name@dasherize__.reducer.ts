import { Action, createReducer, on } from '@ngrx/store';
import { <%= classify(name) %>PageState<% if (hasEntity) { %>, <%= camelize(name) %>EntityAdapter <% } %>} from './<%= dasherize(name) %>.state';
import { initial<%= classify(name) %>PageState } from './<%= dasherize(name) %>.state';
import * as Actions from './<%= dasherize(name) %>.actions';


/* The main reducer for the <%= classify(name) %>*/
const reducer = createReducer(initial<%= classify(name) %>PageState,


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


export function <%= camelize(name) %>ListReducer(
    state: <%= classify(name) %>PageState = initial<%= classify(name) %>PageState,
    action: Action
): <%= classify(name) %>PageState {
    return reducer(state, action);
}
