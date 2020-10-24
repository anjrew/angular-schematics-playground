

import { IStandardListPageState } from '@shared/models/interfaces/standard-page-state.interface';
import { initialPaginationDetails } from '@app/modules/shared/models/interfaces/list.interface';

<% if (hasEntity) { %>    
    /* ENTITY */
import { EntityStateExtended } from '@shared/models/interfaces/entity-state-extended.interface';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { <%= classify(name) %>Entity } from '@shared/models/entities/job-process-entity';
    <% } %>

<% if (hasEntity) { %>
/* ADAPTERS */
export const <%= classify(name) %>EntityAdapter: EntityAdapter<<%= classify(name) %>Entity> =
        createEntityAdapter<<%= classify(name) %>Entity>();
<% } %>


/* STATE */
export interface <%= classify(name) %>PageState extends IStandardListPageState{
    entries: EntityStateExtended<<%= classify(name) %>Entity>;
}

/* INITIAL STATE */
export const initial<%= classify(name) %>PageState: <%= classify(name) %>PageState = {
    isInitialized: true,
    isLoading: false,
    isSettled: true,
    <% if (pageType == "table" || pageType == "filter-table") { %>
    pagination: initialPaginationDetails,
    entries: jobProcessEntityAdapter.getInitialState({ totalCount: 0, })
    <% } %>
};