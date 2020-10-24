import { createSelector } from '@ngrx/store';
import { select<%= classify(moduleName) %>Module } from '../../../../store/<%= dasherize(moduleName) %>-module.selectors';
import { Job<%= classify(moduleName) %>State } from '../../../../store/<%= dasherize(moduleName) %>-module.state';
<% if (hasEntity) { %>    
    import { getExtendedEntitySelectors } from '@shared/functions/selectors-helper.functions';
    import { <%= camelize(name) %>EntityAdapter, <%= classify(name) %>PageState } from './<%= dasherize(name) %>.state';
<% } %>


export const select<%= classify(name) %>Page = createSelector(
    select<%= classify(moduleName) %>Module,
    (state: <%= classify(moduleName) %>ModuleState) => state.<%= classify(name) %>Page,
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