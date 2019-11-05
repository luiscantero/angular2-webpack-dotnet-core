import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Author } from './author.model';
import { AuthorService } from './author.service';

import { RepositoryService } from './repository.service';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState, ADD_ITEM, REMOVE_ITEM, REMOVE_ALL_ITEMS } from './store';
import { Observable } from 'rxjs';

import { AdalService } from 'adal-angular4';

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
    authors: Array<Author>;
    authors$: Observable<Array<Author>>;
    author: any = { name: "Bill", age: 20 };
    @select("authors") reduxAuthors: Observable<Author>;
    @select() lastUpdate: Observable<Date>;

    constructor(private router: Router,
        private authorService: AuthorService,
        private repoSvc: RepositoryService,
        private ngRedux: NgRedux<IAppState>,
        private adalService: AdalService) { }

    async ngOnInit(): Promise<void> {
        // Use promise.
        //this.authors = await this.authorService.getAuthors();

        // Use observable.
        this.authorService.getAuthorsAsObservable().subscribe(response => {
            this.authors = response.data;
        });

        // Use observable and map.
        this.authors$ = this.authorService.getAuthorsAsObservableMap();

        this.repo = this.repoSvc.get("repo");

        //(async () => {
        //    alert(JSON.stringify(this.adalService.userInfo));

        //    var token = await this.adalService.acquireToken("00000003-0000-0000-c000-000000000000").toPromise();

        //    var response = await fetch("https://graph.microsoft.com/v1.0/me", {
        //        headers: {
        //            Authorization: "Bearer " + token,
        //        }
        //    });

        //    var profile = await response.text();
        //    alert("Graph: " + JSON.stringify(profile));
        //})();
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