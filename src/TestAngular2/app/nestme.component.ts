import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nest-me',
    template: require('to-string!./nestme.component.html'),
    styles: [require('to-string!./nestme.component.css')],
})
export class NestmeComponent {
    // Public API.
    @Input() myName: string;
    @Output() sendHello = new EventEmitter();

    sayHello(): void {
        this.sendHello.emit("Hello " + this.myName);
    }
}