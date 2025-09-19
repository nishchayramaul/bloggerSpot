import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private readonly httpClient: HttpClient) {
   }


   post(url : string , userDto : any, options: any = {}): Observable<any> {
    return this.httpClient.post<any>(url, userDto, options);
   }
   
  

}
