import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Author } from './author.model';
import { environment } from '../environments/environment';

@Injectable()
export class AuthorSearchService {
    private authorsUrl = environment.authorsUrl; // URL to web api.

    constructor(private http: HttpClient) { }

    search(term: string): Observable<Author[]> {
        console.log(term);
        return this.http
            .get(`${this.authorsUrl}/${term}`)
            .pipe(
            map((response: any) => response.data as Author[]));
    }
}