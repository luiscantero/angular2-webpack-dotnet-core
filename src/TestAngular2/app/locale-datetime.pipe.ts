import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'localedatetime' })
export class LocaleDatetimePipe implements PipeTransform {
    transform(value: Date): string {
        return new Date(value).toLocaleString();
    }
}