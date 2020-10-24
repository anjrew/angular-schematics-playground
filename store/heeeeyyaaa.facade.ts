

import { IStandardListPageState } from '@shared/models/interfaces/standard-page-state.interface';
import { initialPaginationDetails } from '@app/modules/shared/models/interfaces/list.interface';






/* STATE */
export interface HeeeeyyaaaPageState extends IStandardListPageState{
    entries: EntityStateExtended<HeeeeyyaaaEntity>;
}

/* INITIAL STATE */
export const initialHeeeeyyaaaPageState: HeeeeyyaaaPageState = {
    isInitialized: true,
    isLoading: false,
    isSettled: true,
    
    pagination: initialPaginationDetails,
    entries: jobProcessEntityAdapter.getInitialState({ totalCount: 0, })
    
};