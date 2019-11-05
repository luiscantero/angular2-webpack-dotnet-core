import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Author } from './author.model';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsObservable = {
    observe: 'response' as 'body',
};

@Injectable({ providedIn: 'root' })
export class AuthorService {
    private authorsUrl = environment.authorsUrl; // URL to web api.

    constructor(private http: HttpClient) { }

    getAuthors(): Promise<Array<Author>> {
        return this.http.get(this.authorsUrl)
            .toPromise()
            .then((response: any) => response.data as Array<Author>)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getAuthorsAsObservable(): Observable<{ data: Array<Author> }> {
        return this.http.get<{ data: Array<Author> }>(this.authorsUrl);
    }

    getAuthorsAsObservableMap(): Observable<Array<Author>> {
        return this.http.get<{ data: Array<Author> }>(this.authorsUrl)
            .pipe(map((response: any) => response.data as Array<Author>));
    }

    // Create.
    private post(author: Author): Promise<Author> {
        return this.http
            .post(this.authorsUrl, JSON.stringify(author), httpOptions)
            .toPromise()
            .then((res: any) => res.data)
            .catch(this.handleError);
    }

    private postAsObservable(author: Author): Observable<{ data: Author }> {
        return this.http
            .post<{ data: Author }>(this.authorsUrl, author);
    }

    // Update.
    private put(author: Author): Promise<Author> {
        let url = `${this.authorsUrl}/${author.name}`;

        return this.http
            .put(url, JSON.stringify(author), httpOptions)
            .toPromise()
            .then(() => author)
            .catch(this.handleError);
    }

    private putAsObservable(author: Author): Observable<HttpResponse<{ data: Author }>> {
        let url = `${this.authorsUrl}/${author.name}`;

        const httpOptionsObservable: { observe: any; } = {
            observe: 'response',
        };

        return this.http
            .put(url, author, httpOptionsObservable) as Observable<HttpResponse<{ data: Author }>>;
    }

    // Delete.
    delete(author: Author) {
        let url = `${this.authorsUrl}/${author.name}`;

        this.http
            .delete(url, httpOptions)
            .toPromise()
            .catch(this.handleError);
    }

    deleteAsObservable(author: Author) {
        let url = `${this.authorsUrl}/${author.name}`;

        this.http
            .delete(url, httpOptionsObservable);
    }

    // Create if new, otherwise update.
    save(author: Author): Promise<Author> {
        if (author.name) {
            return this.put(author);
        }
        return this.post(author);
    }

    getAuthor(name: string): Promise<Author> {
        return this.getAuthors()
            .then((authors: Array<Author>) => authors.find(author => author.name === name));
    }

    //getMockAuthors(): Promise<Array<Author>> {
    //    return Promise.resolve([
    //        { name: 'Bill', age: 20 },
    //        { name: 'Steve', age: 21 },
    //        { name: 'R.R.', age: 65 },
    //    ]);
    //}

    getAuthorsSlowly(): Promise<Array<Author>> {
        return new Promise<Array<Author>>(resolve =>
            setTimeout(resolve, 2000)) // 2 s.
            .then(() => this.getAuthors());
    }
}