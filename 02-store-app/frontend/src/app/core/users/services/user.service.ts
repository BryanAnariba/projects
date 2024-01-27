import { Injectable } from '@angular/core';
import { devEnvironments } from '../../../environments/environments.dev';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User, UserResponse } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = devEnvironments.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getUser(): Observable<User[]> {
    return this.httpClient.get<UserResponse>(`${this.apiUrl}/users`, {}).pipe(map(userResponse => userResponse.users));
  }
}
