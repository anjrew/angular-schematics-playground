/* ANGULAR */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* COMPONENTS */
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: '',
        component: <%= classify(name) %>Component,
        children: [
            
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class <%= classify(name) %>RoutingModule { }
