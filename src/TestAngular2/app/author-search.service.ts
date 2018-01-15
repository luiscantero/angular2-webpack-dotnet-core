import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Author } from './author.model';

@Injectable()
export class AuthorSearchService {

    constructor(private http: Http) { }

    search(term: string): Observable<Author[]> {
        console.log(term);
        return this.http
            //.get(`/mock-authors.json?name=${term}`)
            .get(`http://localhost:8081/api/authors/${term}`)
            .map((response: Response) => response.json().data as Author[]);
    }
}