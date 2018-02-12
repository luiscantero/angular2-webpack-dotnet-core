import { Component, OnInit, OnDestroy } from '@angular/core';

import { RepositoryService } from './repository.service';

@Component({
    selector: 'my-intro',
    template: require('to-string-loader!./intro.component.html'),
    styles: [require('to-string-loader!./intro.component.css')],
})
export class IntroComponent implements OnInit, OnDestroy {
    repo: string;

    constructor(private repoSvc: RepositoryService) { }

    ngOnInit(): void {
        this.repo = this.repoSvc.get("repo");
    }

    ngOnDestroy(): void {
        this.repoSvc.set("repo", this.repo);
    }
}