import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Author } from './author.model';

@Injectable()
export class AuthorSearchService {

    constructor(private http: HttpClient) { }

    search(term: string): Observable<Author[]> {
        console.log(term);
        return this.http
            //.get(`/mock-authors.json?name=${term}`)
            .get(`http://localhost:8081/api/authors/${term}`)
            .pipe(
            map((response: any) => response.data as Author[]));
    }
}