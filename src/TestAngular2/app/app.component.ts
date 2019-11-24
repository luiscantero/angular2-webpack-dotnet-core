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
        // Call once for lifetime of app.
        ngRedux.configureStore(reducer, INITIAL_STATE);

        if (this.adalEnabled()) {
            this.adalService.init(environment.adalConfig);
        }
    }

    login() {
        if (this.adalEnabled()) {
            console.log("AppComponent UrlBeforeAuth: " + location.pathname);
            sessionStorage.setItem("UrlBeforeAuth", location.pathname);
            this.adalService.config.redirectUri = `${window.location.origin}/auth`;
            this.adalService.login();
        }
    }

    logout() {
        if (this.adalService.userInfo.authenticated) {
            // Don't redirect to a protected page!
            console.log("AppComponent UrlBeforeAuth: /");
            sessionStorage.setItem("UrlBeforeAuth", "/");
            this.adalService.config.redirectUri = `${window.location.origin}/auth`;
            this.adalService.logOut();
        }
    }

    private adalEnabled() {
        return environment.adalConfig.tenant.length > 0;
    }

    get authenticated(): boolean {
        return this.adalService.userInfo.authenticated;
    }

    ngOnInit(): void {
        if (this.adalEnabled) {
            this.adalService.handleWindowCallback();
        }

        console.log(this.adalService.userInfo);
    }
}