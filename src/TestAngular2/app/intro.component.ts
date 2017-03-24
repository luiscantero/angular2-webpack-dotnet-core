import { Component } from '@angular/core';

@Component({
    selector: 'my-intro',
    template: require('to-string-loader!./intro.component.html'),
    styles: [require('to-string-loader!./intro.component.css')],
})
export class IntroComponent { }