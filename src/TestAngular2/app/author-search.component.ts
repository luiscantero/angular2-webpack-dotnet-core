import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthorSearchService } from './author-search.service';
import { Author } from './author.model';

@Component({
    selector: 'author-search',
    template: require('to-string-loader!./author-search.component.html'),
    providers: [AuthorSearchService]
})
export class AuthorSearchComponent implements OnInit {
    authors: Observable<Author[]>;
    searchSubject = new Subject<string>(); // Observable/Observer.

    private allTerms: string[] = [];
    terms: Observable<string[]>;
    term = new FormControl();

    constructor(
        private authorSearchService: AuthorSearchService,
        private router: Router) { }

    // Push search term into observable stream.
    search(term: string): void { console.log(term); this.searchSubject.next(term); }

    ngOnInit(): void {
        this.authors = this.searchSubject
            .asObservable()           // Cast to Observable.
            .debounceTime(300)        // Wait 300 ms after input finished.
            .distinctUntilChanged()   // Ignore if same as previous.
            .switchMap((term: string) => term // Switch to new observable each time.
                // Return http search observable.
                ? this.authorSearchService.search(term)
                // or empty observable if no search term.
                : Observable.of<Author[]>([]))

            .catch((error: string) => {
                // Todo: Real error handling.
                console.log(error);
                return Observable.of<Author[]>([]);
            });

        this.terms = this.term.valueChanges
            .debounceTime(300)        // Wait 300 ms after input finished.
            .distinctUntilChanged()   // Ignore if same as previous.
            .switchMap((term: string) => term // Switch to new observable each time.
                // Return search observable.
                ? ((term: string): Observable<string[]> => {
                    this.allTerms.splice(0, 0, term); // Push to beginning.
                    return Observable.of<string[]>(this.allTerms);
                })(term)
                // or empty observable if no search term.
                : Observable.of<string[]>([]))

            .catch((error: string) => {
                // Todo: Real error handling.
                console.log(error);
                return Observable.of<string[]>([]);
            });
    }

    gotoDetails(author: Author): void {
        //alert(author.name);
        let link = ['/details', author.name];
        this.router.navigate(link);
    }
}