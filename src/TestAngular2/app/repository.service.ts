import { Injectable } from '@angular/core';

@Injectable()
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