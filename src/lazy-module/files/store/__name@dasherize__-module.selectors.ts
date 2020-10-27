import { <%= classify(name) %>ModuleState, <%= name.toUpperCase() %>_MODULE_STATE_KEY } from './<%= dasherize(name) %>-module.state';
import { createFeatureSelector } from '@ngrx/store';


export const select<%= classify(name) %>Module = createFeatureSelector<<%= classify(name) %>ModuleState>(<%= name.toUpperCase() %>_MODULE_STATE_KEY);
