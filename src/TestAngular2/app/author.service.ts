import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Author } from './author.model';
import { AUTHORS } from './mock-authors';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthorService {
    private authorsUrl = '/mock-authors.json'; // URL to web api.

    constructor(private http: Http) { }

    getAuthors(): Promise<Author[]> {
        return this.http.get(this.authorsUrl)
            .toPromise()
            .then((response: any) => response.json().data as Author[])
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    // Create.
    private post(author: Author): Promise<Author> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.authorsUrl, JSON.stringify(author), { headers: headers })
            .toPromise()
            .then((res: any) => res.json().data)
            .catch(this.handleError);
    }

    // Update.
    private put(author: Author): Promise<Author> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.authorsUrl}/${author.name}`;

        return this.http
            .put(url, JSON.stringify(author), { headers: headers })
            .toPromise()
            .then(() => author)
            .catch(this.handleError);
    }

    // Delete.
    delete(author: Author) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.authorsUrl}/${author.name}`;

        return this.http
            .delete(url, { headers: headers })
            .toPromise()
            .catch(this.handleError);
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
            .then((authors: Author[]) => authors.find(author => author.name === name));
    }

    //getAuthors(): Promise<Author[]> {
    //    return Promise.resolve(AUTHORS);
    //}

    getAuthorsSlowly(): Promise<Author[]> {
        return new Promise<Author[]>(resolve =>
            setTimeout(resolve, 2000)) // 2 s.
            .then(() => this.getAuthors());
    }
}