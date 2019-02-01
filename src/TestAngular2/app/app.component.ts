import { Component } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { IAppState, reducer, INITIAL_STATE } from './store';

import { AdalService } from 'adal-angular4';

const adalConfig: adal.Config = {
    tenant: '<TENANT>.onmicrosoft.com', // Azure AD tenant.
    clientId: '00000000-0000-0000-0000-000000000000', // Azure App ID (App Registration).
    endpoints: {
        'https://graph.microsoft.com': '00000003-0000-0000-c000-000000000000',
        //'http://localhost:8081/api/authors': '00000000-0000-0000-0000-000000000000',
    },
};

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = "Angular 7 Test";

    constructor(private ngRedux: NgRedux<IAppState>,
        private adalService: AdalService) {
        ngRedux.configureStore(reducer, INITIAL_STATE); // Call once for lifetime of app.

        //this.adalService.init(adalConfig);
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