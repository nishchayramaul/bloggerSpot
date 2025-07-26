import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ArticlePageComponent } from './components/article-page/article-page.component';

export const routes: Routes = [
    {
        path: '', component: LandingComponent,
    },
    {
        path: 'home', component: HomepageComponent,
    },
    {
        path : 'forgot-password', component : ForgotPasswordComponent
    },
    {
        path: 'article/:id', component: ArticlePageComponent
    }
];

