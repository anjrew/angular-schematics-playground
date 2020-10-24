import { createSelector } from '@ngrx/store';
import { selectEDDERSModule } from '../../../../store/edders-module.selectors';
import { JobEDDERSState } from '../../../../store/edders-module.state';



export const selectHeeeeyyaaaPage = createSelector(
    selectEDDERSModule,
    (state: EDDERSModuleState) => state.HeeeeyyaaaPage,
);

export const selectIsLoading = createSelector(
    selectHeeeeyyaaaPage,
    (state: HeeeeyyaaaPageState) => state.isLoading,
);



    
export const selectPaginationDetails = createSelector(
    selectHeeeeyyaaaPage,
    (state: HeeeeyyaaaPageState) => state.pagination,
);

export const selectEntries = createSelector(
    selectHeeeeyyaaaPage,
    (state: HeeeeyyaaaPageState) => state.entries,
);

    

