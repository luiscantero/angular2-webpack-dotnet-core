import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from './author.model';
import { AuthorService } from './author.service';

@Component({
    selector: 'author-details',
    templateUrl: './author-details.component.html',
    styleUrls: ['./author-details.component.css'],
    providers: [AuthorService],
})
export class AuthorDetailsComponent implements OnInit, OnDestroy {
    author: Author;
    sub: any;

    constructor(private route: ActivatedRoute,
        private authorService: AuthorService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            if (typeof (params['name']) !== 'undefined') {
                let name = params['name'];
                this.authorService.getAuthor(name)
                    .then((author: Author) => this.author = author);
            } else {
                this.author = new Author("", 0);
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}