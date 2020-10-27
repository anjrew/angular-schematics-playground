/* NGRX */
import { ActionReducerMap } from '@ngrx/store';
import { <%= classify(name) %>ModuleState } from './<%= dasherize(name) %>-module.state';


export const <%= camelize(name) %>ModuleReducerMap: ActionReducerMap<<%= classify(name) %>ModuleState> = {
};
