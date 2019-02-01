import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroComponent } from './intro.component';
import { AboutComponent } from './about.component';
import { AuthorDetailsComponent } from './author-details.component';

import { AdalGuard } from 'adal-angular4';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/intro',
        pathMatch: 'full'
    },
    {
        path: 'intro',
        component: IntroComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'details/:name',
        component: AuthorDetailsComponent,
        canActivate: [AuthGuard], //AdalGuard
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }