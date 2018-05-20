import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Author } from './author.model';
import { AUTHORS } from './mock-authors';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthorService {
    private authorsUrl = '/mock-authors.json'; // URL to web api.

    constructor(private http: HttpClient) { }

    getAuthors(): Promise<Author[]> {
        return this.http.get(this.authorsUrl)
            .toPromise()
            .then((response: any) => response.data as Author[])
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    // Create.
    private post(author: Author): Promise<Author> {
        return this.http
            .post(this.authorsUrl, JSON.stringify(author), httpOptions)
            .toPromise()
            .then((res: any) => res.data)
            .catch(this.handleError);
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

    // Delete.
    delete(author: Author) {
        let url = `${this.authorsUrl}/${author.name}`;

        return this.http
            .delete(url, httpOptions)
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