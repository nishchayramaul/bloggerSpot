import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
    {
        path: '', component: LandingComponent,
    },
];

