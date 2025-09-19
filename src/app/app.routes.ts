import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ArticlePageComponent } from './components/article-page/article-page.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PostComponentComponent } from './components/post-component/post-component.component';

export const routes: Routes = [
    {
        path: '', component: LandingComponent,
    },
    {
        path: 'home', component: HomepageComponent,
    },
    {
        path: 'email-verification', component: EmailVerificationComponent
    },
    {
        path: 'forgot-password', component: ForgotPasswordComponent
    },
    {
        path: 'reset-password', component: ResetPasswordComponent
    },
    {
        path: 'article/:id', component: ArticlePageComponent
    },
    {
        path:'postComponent', component : PostComponentComponent
    }
];

