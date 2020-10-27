import { createSelector } from '@ngrx/store';
import { select<%= classify(module) %>Module } from '../../../../store/<%= dasherize(module) %>-module.selectors';
import { <%= classify(module) %>State } from '../../../../store/<%= dasherize(module) %>-module.state';
<% if (hasEntity) { %>    
    import { getExtendedEntitySelectors } from '@shared/functions/selectors-helper.functions';
    import { <%= camelize(name) %>EntityAdapter, <%= classify(name) %>PageState } from './<%= dasherize(name) %>.state';
<% } %>


export const select<%= classify(name) %>Page = createSelector(
    select<%= classify(module) %>Module,
    (state: <%= classify(module) %>ModuleState) => state.<%= classify(name) %>Page,
);

export const selectIsLoading = createSelector(
    select<%= classify(name) %>Page,
    (state: <%= classify(name) %>PageState) => state.isLoading,
);

<% if (pageType == "table" || pageType == "filter-table") { %>

    
export const selectPaginationDetails = createSelector(
    select<%= classify(name) %>Page,
    (state: <%= classify(name) %>PageState) => state.pagination,
);

export const selectEntries = createSelector(
    select<%= classify(name) %>Page,
    (state: <%= classify(name) %>PageState) => state.entries,
);

    <% if (hasEntity) { %>    

export const {
    selectEntityDataDictionary,
    selectEntityDataArray,
    selectTotalCount,
    selectEntityById
} = getExtendedEntitySelectors(selectEntries, <%= camelize(name) %>EntityAdapter);

export const selectTableData = createSelector(
    selectEntityDataArray,
    selectTotalCount,
    (array, count) => ({ data: array, totalCount: count }),
);
    <% } %>

<% } %>