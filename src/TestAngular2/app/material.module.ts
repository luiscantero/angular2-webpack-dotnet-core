import { NgModule } from '@angular/core';

import { MatCheckboxModule, MatInputModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
        MatCheckboxModule, MatInputModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatButtonModule,
    ],
    exports: [
        MatCheckboxModule, MatInputModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatButtonModule,
    ],
})
export class MaterialModule { }