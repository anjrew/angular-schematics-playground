import { createAction, props } from '@ngrx/store';

const BASE_ID = '[Heeeeyyaaa List]';

export const initializePage = createAction(
    getHeeeeyyaaaActionId('initializePage'),
);


export const getPageData = createAction(
    getHeeeeyyaaaActionId('getPageData'),
);


export const receivePageData = createAction(
    getHeeeeyyaaaActionId('receivePageData'),
);


/** Creates a unique ID with the prefix relative to the component */
function getHeeeeyyaaaActionId(subId: string): string {
    return `${BASE_ID} ${subId}`;
}
