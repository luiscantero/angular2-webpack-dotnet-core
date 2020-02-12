import { NgModule } from '@angular/core';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        MatCheckboxModule, MatInputModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatButtonModule,
    ],
    exports: [
        MatCheckboxModule, MatInputModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatButtonModule,
    ],
})
export class MaterialModule { }