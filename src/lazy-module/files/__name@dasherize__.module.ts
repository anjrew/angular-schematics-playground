/* ANGULAR */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* NGRX */
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { <%= classify(name.toUpperCase()) %>_MODULE_STATE_KEY } from './store/<%= dasherize(name) %>-module.state';
import { <%= camelize(name) %>ModuleReducerMap } from './store/<%= dasherize(name) %>-module.reducer';
import { <%= camelize(name) %>ModuleEffects } from './store/<%= dasherize(name) %>-module.effects';

/* APP */
import { <%= classify(name) %>RoutingModule } from './<%= dasherize(name) %>-routing.module';
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';
import { SharedModule } from '@shared/shared.module';

/* MODULE */
import { <%= classify(name) %>DataService } from './services/<%= dasherize(dataService) %>-data.service';


@NgModule({
    declarations: [
        <%= classify(name) %>Component,
    ],
    imports: [
        CommonModule,
        <%= classify(name) %>RoutingModule,
        SharedModule,

        /* NGRX */
        StoreModule.forFeature(
            <%= classify(name.toUpperCase()) %>_MODULE_STATE_KEY,
            <%= camelize(name) %>ModuleReducerMap
        ),
        EffectsModule.forFeature(
            <%= camelize(name) %>ModuleEffects
        ),
    ],
    providers: [
        <%= classify(name) %>DataService
    ]
})
export class <%= classify(name) %>Module { }
