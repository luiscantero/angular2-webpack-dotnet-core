import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: "[alertOnClick]",
})
export class AlertOnClickDirective {
    private el: HTMLElement;

    constructor(el: ElementRef) { this.el = el.nativeElement; }

    @Input() alertOnClick: string;

    @HostListener('click') OnClick() {
        alert('Clicked: ' + this.alertOnClick + "\n" + this.el.textContent);
    }
}