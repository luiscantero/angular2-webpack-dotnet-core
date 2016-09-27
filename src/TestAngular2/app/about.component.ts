import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Author } from './author.model';
import { AuthorService } from './author.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'my-about',
    template: require('to-string!./about.component.html'),
    styles: [require('to-string!./about.component.css')],
    providers: [AuthorService],
})
export class AboutComponent implements OnInit {
    msg = "Hello from about!";
    useRedBack = false;
    authors: Author[];
    author: Author = new Author("Bill", 20);

    constructor(private router: Router,
        private authorService: AuthorService) { }

    ngOnInit(): void {
        this.authorService.getAuthors()
            .then((authors: Author[]) => this.authors = authors);
    }

    goBack(): void {
        // Go back.
        window.history.back();

        // Navigate to intro.
        //let link = ['/intro']; // [path, param].
        //this.router.navigate(link);
    }

    toggleStyle(state: boolean): void {
        this.useRedBack = state;
    }

    showDetails(author: Author): void {
        alert(JSON.stringify(author));
    }

    getHello(hello: string): void {
        alert(hello);
    }

    event1(): void {
        alert("Event 1");
    }

    event2(): void {
        alert("Event 2");
    }
}