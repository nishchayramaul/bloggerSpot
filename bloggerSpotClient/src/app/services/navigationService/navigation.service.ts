import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private router: Router) {}


  goTo(path: string | any[], extras: object = {}) {
    this.router.navigate(Array.isArray(path) ? path : [path], extras);
  }

  goToWithParams(basePath: string, params: any) {
    this.router.navigate([basePath, ...Object.values(params)]);
  }

  goToWithQuery(path: string, queryParams: object) {
    this.router.navigate([path], { queryParams });
  }
} 