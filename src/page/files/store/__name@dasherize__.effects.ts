/* ANGULAR */
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

/* APP */
import { effectsErrorhandler } from '@shared/functions/effect-helper.functions';
import { <%= classify(dataService) %>DataService } from '../../../../services/<%= dasherize(dataService) %>-data.service';

/* RXJS */
import { Observable } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

/* NGRX */
import { AppState } from '@app/store/app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';
import * as <%= classify(name) %>Actions from './<%= dasherize(name) %>.actions';
import * as Selectors from './<%= dasherize(name) %>.selectors';
import * as ModalActions from '@modals/store/modal.actions';
import { Store } from '@ngrx/store';


@Injectable()
export class <%= classify(name) %>Effects {

    constructor(
        private actions$: Actions,
        private store$: Store<AppState>,
        private dataService: <%= classify(dataService) %>DataService
    ) { }


    initializePage$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(<%= classify(name) %>Actions.initializePage),
                map(() => <%= classify(name) %>Actions.getPageData())
            )
        );


    getData$ =
        createEffect(() =>
            this.actions$.pipe(
                ofType(<%= classify(name) %>Actions.getPageData),
                withLatestFrom(this.store$.select(Selectors.selectPaginationDetails)),
                switchMap(([, pagination]) =>
                    this.<%= classify(dataService) %>DataService.getJobsProcessesList(pagination)
                        .pipe(
                            map(data => <%= classify(name) %>Actions.receivePageData({ data })),
                            catchError((error: HttpErrorResponse | Error) => this.errorhandler(error, 'getData))
                        )
                )
            )
        );


    /* The default error handler for this effect*/
    public errorhandler(
        error: HttpErrorResponse | Error | string,
        sender: string)
        : Observable<TypedAction<string> | (ModalActions.SnackBarRequest & TypedAction<string>)> {
        return effectsErrorhandler(error, '<%= classify(name) %>Effects', sender);
    }
}
