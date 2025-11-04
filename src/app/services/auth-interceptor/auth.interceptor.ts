import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { ToastServiceService } from '../toastService/toast-service.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(LocalStorageService);
  const toast = inject(ToastServiceService);

  const token = storage.getItem<string>('authToken');
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe();
};

