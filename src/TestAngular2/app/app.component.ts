import { Component } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { IAppState, reducer, INITIAL_STATE } from './store';

import { AdalService } from 'adal-angular4';
import { environment } from '../environments/environment';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = "Angular 8 Test";

    constructor(private ngRedux: NgRedux<IAppState>,
        private adalService: AdalService) {
        ngRedux.configureStore(reducer, INITIAL_STATE); // Call once for lifetime of app.

        if (environment.adalConfig.tenant.length > 0) {
            this.adalService.init(environment.adalConfig);
        }
    }

    login() {
        this.adalService.login();
    }

    logout() {
        if (this.adalService.userInfo.authenticated) {
            this.adalService.config.redirectUri = `${window.location.origin}`; // Don't redirect to a protected page.
            this.adalService.logOut();
        }
    }

    get authenticated(): boolean {
        return this.adalService.userInfo.authenticated;
    }

    ngOnInit(): void {
        this.adalService.handleWindowCallback();

        console.log(this.adalService.userInfo);
    }
}