import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { NgReduxModule } from '@angular-redux/store';

import { IntroComponent } from './intro.component';
import { AboutComponent } from './about.component';
import { AuthorDetailsComponent } from './author-details.component';
import { LocaleDatetimePipe } from './locale-datetime.pipe';
import { NestmeComponent } from './nestme.component';
import { AlertOnClickDirective } from './alert.directive';
import { AuthorSearchComponent } from './author-search.component';

import { AdalService, AdalGuard, AdalInterceptor } from 'adal-angular4';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';

@NgModule({
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
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NgReduxModule,
    ],
    providers: [
        AdalService,
        AdalGuard,
        // AAD Auth: Uncomment to enable HTTP interception for ADAL guard.
        //{ provide: HTTP_INTERCEPTORS, useClass: AdalInterceptor, multi: true },
        AuthGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }