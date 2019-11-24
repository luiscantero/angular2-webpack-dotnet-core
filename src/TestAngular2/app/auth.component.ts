import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'my-auth',
    template: ``,
    styles: [``],
})
export class AuthComponent implements OnInit {
    repo: string;

    constructor(private router: Router) { }

    ngOnInit(): void {
        var url = sessionStorage.getItem("UrlBeforeAuth");
        console.log("AuthComponent UrlBeforeAuth: " + url);
        if (url !== null) {
            // Fwd to stored URL.
            this.router.navigate([url]);
        }
    }
}