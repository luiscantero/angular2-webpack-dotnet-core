import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Author } from './author.model';
import { AuthorService } from './author.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { RepositoryService } from './repository.service';

@Component({
    selector: 'my-about',
    template: require('to-string-loader!./about.component.html'),
    styles: [require('to-string-loader!./about.component.css')],
    providers: [AuthorService],
})
export class AboutComponent implements OnInit, OnDestroy {
    msg = "Hello from about!";
    useRedBack = false;
    repo: string;
    authors: Author[];
    author: Author = new Author("Bill", 20);

    constructor(private router: Router,
        private authorService: AuthorService,
        private repoSvc: RepositoryService) { }

    ngOnInit(): void {
        this.authorService.getAuthors()
            .then((authors: Author[]) => this.authors = authors);

        this.repo = this.repoSvc.get("repo");
    }

    ngOnDestroy(): void {
        this.repoSvc.set("repo", this.repo);
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