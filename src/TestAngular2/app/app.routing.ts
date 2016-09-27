import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroComponent } from './intro.component';
import { AboutComponent } from './about.component';
import { AuthorDetailsComponent } from './author-details.component';

const appRoutes: Routes = [
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
        component: AuthorDetailsComponent
    },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);