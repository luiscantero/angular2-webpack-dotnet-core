import { Component, Input, Output, EventEmitter } from '@angular/core';
import { setTimeout } from 'core-js';

@Component({
    selector: 'nest-me',
    templateUrl: './nestme.component.html',
    styleUrls: ['./nestme.component.css'],
})
export class NestmeComponent {
    // Public API.
    @Input() myNumber: number;
    @Output() valueReady = new EventEmitter();

    timesTwo() {
        setTimeout(
            () => this.valueReady.emit(this.myNumber * 2),
            2000); // ms.
    }
}