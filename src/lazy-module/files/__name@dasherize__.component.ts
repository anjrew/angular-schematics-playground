import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { verticalRouterTransition } from '@app/modules/shared/animations/vertical-indexed-router-transition.animation';

@Component({
    selector: '<%= dasherize(name) %>',
    templateUrl: './<%= dasherize(name) %>.component.html',
    styleUrls: ['./<%= dasherize(name) %>.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [verticalRouterTransition]
})
export class <%= classify(name) %>Component {

    public getState(outlet: RouterOutlet): number {
        return outlet.activatedRouteData.state;
    }

}

