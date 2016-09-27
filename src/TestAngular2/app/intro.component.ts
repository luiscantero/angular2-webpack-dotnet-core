import { Component } from '@angular/core';

@Component({
    selector: 'my-intro',
    template: require('to-string!./intro.component.html'),
    styles: [require('to-string!./intro.component.css')],
})
export class IntroComponent { }