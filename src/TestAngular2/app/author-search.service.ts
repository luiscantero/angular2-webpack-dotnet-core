import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Author } from './author.model';

@Injectable()
export class AuthorSearchService {

    constructor(private http: Http) { }

    search(term: string): Observable<Author[]> {
        return this.http
            .get(`/mock-authors.json?name=${term}`)
            .map((response: Response) => response.json().data as Author[]);
    }
}