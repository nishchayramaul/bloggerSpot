import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private readonly httpClient: HttpClient) {
   }

 
  private readonly baseUrl = `${environment.apiBaseUrl.replace(/\/$/, '')}${environment.apiBasePath}`;

  private withLeadingSlash(path: string): string {
   return path.startsWith('/') ? path : `/${path}`;
  }

  get(path: string, options: any = {}): Observable<any> {
   const url = `${this.baseUrl}${this.withLeadingSlash(path)}`;
   return this.httpClient.get<any>(url, options);
  }

  post(path: string, body: any, options: any = {}): Observable<any> {
   const url = `${this.baseUrl}${this.withLeadingSlash(path)}`;
   return this.httpClient.post<any>(url, body, options);
  }

  put(path: string, body: any, options: any = {}): Observable<any> {
   const url = `${this.baseUrl}${this.withLeadingSlash(path)}`;
   return this.httpClient.put<any>(url, body, options);
  }

  delete(path: string, options: any = {}): Observable<any> {
   const url = `${this.baseUrl}${this.withLeadingSlash(path)}`;
   return this.httpClient.delete<any>(url, options);
  }
   
  

}
