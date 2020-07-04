import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlServer = 'http://localhost:3000';
  private token = null;

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.urlServer}/auth/registration`, user)
  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.urlServer}/auth/login`, user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
            localStorage.setItem('userId', this.getDecodedAccessToken(token).userId);
            this.setToken(token);
          }
        )
      );
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  isAdmin(): boolean {
    return this.getDecodedAccessToken(this.token).isAdmin;
  }

  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }

}
