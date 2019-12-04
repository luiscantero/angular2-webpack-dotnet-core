import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'my-auth',
    template: ``,
    styles: [``],
})
export class AuthComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit(): void {
        var url = sessionStorage.getItem('UrlBeforeAuth');
        console.log('AuthComponent UrlBeforeAuth: ' + url);

        if (url === null) {
            url = '/';
        }

        this.router.navigate([url]);
    }
}