/* ANGULAR */
import { Injectable } from '@angular/core';

/*

/* NGRX */
import { AppState } from '@app/store/app.state';
import { Store } from '@ngrx/store';
import * as GlobalSelectors from '@shared/store/global/global.selectors';

/* APP */
import { IListRequest, IListWithCount } from '@app/modules/shared/models/interfaces/list.interface';

/* RXJS */
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';



@Injectable()
export class <%= classify(name) %>DataService {


    constructor(
        <% if (isMqtt) { %>    
        private appMqttService: AppMqttService,
        <% } %>
        <% if (!isMqtt) { %>    
        private httpService: AppHttpService,
        <% } %>
        private store$: Store<AppState>
    ) { }


}
