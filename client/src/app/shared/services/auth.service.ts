import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<{token: string}>(`${this.urlServer}/auth/login`, user);
  }



}
