import { Component } from '@angular/core';
import './rxjs-extensions';

@Component({
    selector: 'my-app',
    template: require('to-string!./app.component.html'),
    styles: [require('to-string!./app.component.css')],
})
export class AppComponent {
    title = "Angular 2 Test";
}