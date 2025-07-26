import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface ToastMessage {
  text: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // in ms
}

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {
  private toastSubject = new Subject<ToastMessage>();

  get toast$(): Observable<ToastMessage> {
    return this.toastSubject.asObservable();
  }

  showToast(text: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration: number = 3000) {
    this.toastSubject.next({ text, type, duration });
  }
}
