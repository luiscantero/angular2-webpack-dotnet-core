import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdalService } from 'adal-angular4';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private adalService: AdalService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.adalService.userInfo.authenticated) {
            return true;
        } else {
            this.adalService.config.redirectUri = `${window.location.origin}${state.url}`;
            this.adalService.login();
            return false;
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }
}