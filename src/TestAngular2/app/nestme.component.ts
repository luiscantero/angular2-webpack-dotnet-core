import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nest-me',
    templateUrl: './nestme.component.html',
    styleUrls: ['./nestme.component.css'],
})
export class NestmeComponent {
    // Public API.
    @Input() myName: string;
    @Output() sendHello = new EventEmitter();

    sayHello() {
        this.sendHello.emit("Hello " + this.myName);
    }
}