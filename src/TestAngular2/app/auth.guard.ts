import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdalService } from 'adal-angular4';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private adalService: AdalService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.adalService.userInfo.authenticated) {
            return true;
        } else {
            console.log("AuthGuard UrlBeforeAuth: " + location.pathname);
            sessionStorage.setItem("UrlBeforeAuth", location.pathname);
            this.adalService.config.redirectUri = `${window.location.origin}/auth`;
            this.adalService.login();
            return false;
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }
}