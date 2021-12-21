import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private url:any;
  constructor(private _http: HttpClient) {
    this.url = ' http://127.0.0.1:8000/api/';
   }

  // Allpayments(rol:string,id:string) {
  //   let pagos = this._http.get(this.url + 'obtener_pagos/'+rol +'/'+id);
  //      return (pagos);
  // }

  Allpayments(json: any): Observable<any> {
    let headers = new HttpHeaders()
      // .set('Authorization', 'Bearer '+ this.token)
      .set('Content-Type', 'application/json');
   return this._http.post<any>(this.url + 'obtener_pagos', json);
  }
  
  DeleteRegister(json: any): Observable<any> {
    let headers = new HttpHeaders()
      // .set('Authorization', 'Bearer '+ this.token)
      .set('Content-Type', 'application/json');
   return this._http.post<any>(this.url + 'delete_register', json);
  }
  SearchUsers(json: any): Observable<any> {
    let headers = new HttpHeaders()
      // .set('Authorization', 'Bearer '+ this.token)
      .set('Content-Type', 'application/json');
   return this._http.post<any>(this.url + 'buscar_usuario', json);
  }
  RegisterPayment(json: any): Observable<any> {
   let headers = new HttpHeaders()
      // .set('Authorization', 'Bearer '+ this.token)
      .set('Content-Type', 'multipart/form-data');
    return this._http.post<any>(this.url + 'uploadPayment', json);
  }
}
