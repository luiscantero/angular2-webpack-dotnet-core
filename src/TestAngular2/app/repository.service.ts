import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RepositoryService {
    private dict: { [key: string]: string; } = {};

    constructor() { }

    get(key: string): string {
        return this.dict[key];
    }

    set(key: string, value: string) {
        this.dict[key] = value;
    }
}