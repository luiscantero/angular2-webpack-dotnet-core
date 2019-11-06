import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

import { AuthorSearchService } from './author-search.service';
import { Author } from './author.model';

@Component({
    selector: 'author-search',
    templateUrl: './author-search.component.html',
    providers: [AuthorSearchService],
})
export class AuthorSearchComponent implements OnInit {
    authors$: Observable<Author[]>;
    searchSubject$ = new Subject<string>(); // Observable/Observer.

    private allTerms: string[] = [];
    terms$: Observable<string[]>;
    term = new FormControl();

    constructor(
        private authorSearchService: AuthorSearchService,
        private router: Router) { }

    // Push search term into observable stream.
    search(term: string) { this.searchSubject$.next(term); }

    ngOnInit(): void {
        this.authors$ = this.searchSubject$
            .asObservable()           // Cast to Observable.
            .pipe(
            debounceTime(300),        // Wait 300 ms after input finished.
            distinctUntilChanged(),   // Ignore if same as previous.
            switchMap((term: string) => term // Switch to new observable each time.
                // Return http search observable.
                ? this.authorSearchService.search(term)
                // or empty observable if no search term.
                : of<Author[]>([])),
            catchError((error: string) => {
                // Todo: Real error handling.
                console.log(error);
                return of<Author[]>([]);
            }));

        this.terms$ = this.term.valueChanges
            .pipe(
            debounceTime(300),      // Wait 300 ms after input finished.
            distinctUntilChanged(),   // Ignore if same as previous.
            switchMap((term: string) => term // Switch to new observable each time.
                // Return search observable.
                ? ((term: string): Observable<string[]> => {
                    this.allTerms.splice(0, 0, term); // Push to beginning.
                    return of<string[]>(this.allTerms);
                })(term)
                // or empty observable if no search term.
                : of<string[]>([])),
            catchError((error: string) => {
                // Todo: Real error handling.
                console.log(error);
                return of<string[]>([]);
            }));
    }

    gotoDetails(author: Author) {
        //alert(author.name);
        let link = ['/details', author.name];
        this.router.navigate(link);
    }
}