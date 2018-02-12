import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Author } from './author.model';

@Injectable()
export class AuthorSearchService {

    constructor(private http: HttpClient) { }

    search(term: string): Observable<Author[]> {
        console.log(term);
        return this.http
            //.get(`/mock-authors.json?name=${term}`)
            .get(`http://localhost:8081/api/authors/${term}`)
            .map((response: any) => response.data as Author[]);
    }
}