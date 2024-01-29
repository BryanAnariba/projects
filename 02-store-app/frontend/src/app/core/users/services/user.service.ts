import { Injectable } from '@angular/core';
import { devEnvironments } from '../../../environments/environments.dev';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { User, UserResponse } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = devEnvironments.apiUrl;
  private selectedUser: User | null = null;

  constructor(private httpClient: HttpClient) { }

  get currentUser (): User | null {
    return this.selectedUser;
  }

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<UserResponse>(`${this.apiUrl}/users`, {}).pipe(map(userResponse => userResponse.users));
  }

  public getUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/users/${userId}`, {})
      .pipe(
        tap(userResponse => this.selectedUser = userResponse),
        map(userResponse => userResponse),
      );
  }
}
