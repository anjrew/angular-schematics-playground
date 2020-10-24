import { createAction, props } from '@ngrx/store';

const BASE_ID = '[<%= capitalize(name) %> List]';

export const initializePage = createAction(
    get<%= classify(name) %>ActionId('initializePage'),
);


export const getPageData = createAction(
    get<%= classify(name) %>ActionId('getPageData'),
);


export const receivePageData = createAction(
    get<%= classify(name) %>ActionId('receivePageData'),
);


/** Creates a unique ID with the prefix relative to the component */
function get<%= classify(name) %>ActionId(subId: string): string {
    return `${BASE_ID} ${subId}`;
}
