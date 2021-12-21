import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url:any;
  constructor(private _http: HttpClient) {
    this.url = ' http://127.0.0.1:8000/api/';
   }

   login(json: any): Observable<any> {
    let headers = new HttpHeaders()
      // .set('Authorization', 'Bearer '+ this.token)
      .set('Content-Type', 'application/json');
   return this._http.post<any>(this.url + 'user/login', json);
  }

  register(json: any): Observable<any> {
    let headers = new HttpHeaders()
      // .set('Authorization', 'Bearer '+ this.token)
      .set('Content-Type', 'application/json');
   return this._http.post<any>(this.url + 'crear_usuario', json);
  }
}
