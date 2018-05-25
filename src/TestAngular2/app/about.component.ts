import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Author } from './author.model';
import { AuthorService } from './author.service';

import { RepositoryService } from './repository.service';

import { NgRedux, NgReduxModule, select } from '@angular-redux/store';
import { IAppState, reducer, INITIAL_STATE, ADD_ITEM, REMOVE_ITEM, REMOVE_ALL_ITEMS } from './store';
import { Observable } from 'rxjs';

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
    author: any = { name: "Bill", age: 20 };
    @select("authors") reduxAuthors: Observable<Author>;
    @select() lastUpdate: Observable<Date>;

    constructor(private router: Router,
        private authorService: AuthorService,
        private repoSvc: RepositoryService,
        private ngRedux: NgRedux<IAppState>) {
        ngRedux.configureStore(reducer, INITIAL_STATE);
    }

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

    addAuthor() {
        this.ngRedux.dispatch({
            type: ADD_ITEM,
            author: { name: "New author", age: this.getRandomInt(1, 99) },
        });
    }

    clearAuthors() {
        this.ngRedux.dispatch({ type: REMOVE_ALL_ITEMS });
    }

    private getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}