import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../entity/login-user.entity';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl : string ="http://localhost:3000/auth"
  constructor(private http : HttpClient) { }

  login(authUser: LoginUser){
    return this.http.post(`${this.apiUrl}/token`, authUser, {withCredentials: true});
  }

  logout(){
    this.deleteSession();
    return this.http.post(`${this.apiUrl}/logout`, {
      refresh_token: localStorage.getItem('keycloak_refresh_token')
    }, {withCredentials: true});
  }

  getToken(){
    return localStorage.getItem('keycloak_access_token');
  }

  setSession(authResult: any) {

    localStorage.setItem('keycloak_access_token', authResult.access_token);
    localStorage.setItem('keycloak_refresh_token', authResult.refresh_token);
  }    
  deleteSession(){
    localStorage.removeItem("keycloak_access_token");
  }  

  isLoggedIn() {
    return !!this.getToken();
  }
}
