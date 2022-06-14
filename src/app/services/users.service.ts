import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { UserLogin } from '../userLogin';
import { UserAPI } from '../user-api';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private REST_API_SERVER = "http://34.94.79.113:9090/api";
  
  

  constructor(private httpClient: HttpClient, private cookies: CookieService) { }

  // Http Options
 
    

  login(user: UserLogin): Observable<any> {
    return this.httpClient.post("http://34.94.79.113:9090/api/user/login/token", user);
  } 

  register(user: UserAPI): Observable<any> {
    return this.httpClient.post("http://34.94.79.113:9090/api/user", user);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  getUserToken(token: string) {
    return this.httpClient.get("http://34.94.79.113:9090/api/user/"+token);
  }
  SignOff(){
    this.cookies.delete("token");
  }
  handleError(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


}
