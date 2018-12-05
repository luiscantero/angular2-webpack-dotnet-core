import { Component } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { IAppState, reducer, INITIAL_STATE } from './store';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = "Angular 7 Test";

    constructor(private ngRedux: NgRedux<IAppState>) {
        ngRedux.configureStore(reducer, INITIAL_STATE); // Call once for lifetime of app.
    }
}