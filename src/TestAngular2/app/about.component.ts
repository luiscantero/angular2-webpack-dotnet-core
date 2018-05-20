import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Author } from './author.model';
import { AuthorService } from './author.service';

import { RepositoryService } from './repository.service';

@Component({
    selector: 'my-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    providers: [],
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

    goBack() {
        // Go back.
        window.history.back();

        // Navigate to intro.
        //let link = ['/intro']; // [path, param].
        //this.router.navigate(link);
    }

    toggleStyle(state: boolean) {
        this.useRedBack = state;
    }

    showDetails(author: Author) {
        alert(JSON.stringify(author));
    }

    showValue(value: string) {
        alert(value);
    }

    event1() {
        alert("Event 1");
    }

    event2() {
        alert("Event 2");
    }
}