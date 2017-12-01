import { NgModule }        from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }     from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule }      from '@angular/http';

import { AppComponent }    from './app.component';
import { routing }         from './app.routing';
import { MaterialModule }  from './material.module';

import { IntroComponent }  from './intro.component';
import { AboutComponent }  from './about.component';
import { AuthorDetailsComponent } from './author-details.component';
import { MyUppercasePipe } from './myuppercase.pipe';
import { NestmeComponent } from './nestme.component';
import { AlertOnClickDirective } from './alert.directive';
import { AuthorSearchComponent } from './author-search.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        MaterialModule,
    ],
    declarations: [
        AppComponent,
        IntroComponent,
        AboutComponent,
        AuthorDetailsComponent,
        MyUppercasePipe,
        NestmeComponent,
        AlertOnClickDirective,
        AuthorSearchComponent,
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }