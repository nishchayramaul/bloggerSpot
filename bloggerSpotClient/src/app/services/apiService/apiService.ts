import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly httpClient: HttpClient) {
   }


   signIn(url : string , userDto : any): Observable<any> {
    return this.httpClient.post<any>(url, userDto, {});
   }
   

   Login(url : string , userDto : any): Observable<any> {
    return this.httpClient.post<any>(url,userDto,{});
   
}


}
