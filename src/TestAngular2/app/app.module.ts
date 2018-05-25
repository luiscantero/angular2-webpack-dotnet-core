import { NgModule }        from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }     from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }    from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule }  from './material.module';

import { IntroComponent }  from './intro.component';
import { AboutComponent }  from './about.component';
import { AuthorDetailsComponent } from './author-details.component';
import { LocaleDatetimePipe } from './locale-datetime.pipe';
import { NestmeComponent } from './nestme.component';
import { AlertOnClickDirective } from './alert.directive';
import { AuthorSearchComponent } from './author-search.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
    ],
    declarations: [
        AppComponent,
        IntroComponent,
        AboutComponent,
        AuthorDetailsComponent,
        LocaleDatetimePipe,
        NestmeComponent,
        AlertOnClickDirective,
        AuthorSearchComponent,
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }