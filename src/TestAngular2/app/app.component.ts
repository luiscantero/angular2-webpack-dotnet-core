import { Component } from '@angular/core';
import './rxjs-extensions';

@Component({
    selector: 'my-app',
    template: require('to-string-loader!./app.component.html'),
    styles: [require('to-string-loader!./app.component.css')],
})
export class AppComponent {
    title = "Angular 4 Test";
}