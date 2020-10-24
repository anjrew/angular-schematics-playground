/* ANGULAR */
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

/* APP */
import { effectsErrorhandler } from '@shared/functions/effect-helper.functions';
import { TootooDataService } from '../../../../services/tootoo-data.service';

/* RXJS */
import { Observable } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

/* NGRX */
import { AppState } from '@app/store/app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';
import * as HeeeeyyaaaActions from './heeeeyyaaa.actions';
import * as Selectors from './heeeeyyaaa.selectors';
import * as ModalActions from '@modals/store/modal.actions';
import { Store } from '@ngrx/store';


@Injectable()
export class HeeeeyyaaaEffects {

    constructor(
        private actions$: Actions,
        private store$: Store<AppState>,
        private dataService: TootooDataService
    ) { }


    initializePage$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(HeeeeyyaaaActions.initializePage),
                map(() => HeeeeyyaaaActions.getPageData())
            )
        );


    getData$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(HeeeeyyaaaActions.getPageData),
                withLatestFrom(this.store$.select(Selectors.selectPaginationDetails)),
                switchMap(([, pagination]) =>
                    this.TootooDataService.getJobsProcessesList(pagination)
                        .pipe(
                            map(data => HeeeeyyaaaActions.receivePageData({ data })),
                            catchError((error: HttpErrorResponse | Error) => this.errorhandler(error, 'Heeeeyyaaa'))
                        )
                )
            )
        );


    /* The default error handler for this effect*/
    public errorhandler(
        error: HttpErrorResponse | Error | string,
        sender: string)
        : Observable<TypedAction<string> | (ModalActions.SnackBarRequest & TypedAction<string>)> {
        return effectsErrorhandler(error, 'HeeeeyyaaaEffects', sender);
    }
}
