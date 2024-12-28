import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
// import { environment } from '../../../../../apps/admin/src/environments/environment.development';
import { environment } from '@env/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // getUsersies(): Observable<Users[]> {
  //   return this.http.get<Users[]>(
  //     'http://localhost:3000/api/v1/Usersies/get-all-Usersies'
  //   );
  // }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}users/get-all-users`);
  }
  getUser(usersId: string): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}users/get-single-user/${usersId}`
    );
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}users/add-User`, user);
  }

  deleteUser(usersId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}users/delete-user/${usersId}`);
  }

  editUser(usersId: string, user: User): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}users/update-User/${usersId}`,
      user
    );
  }
}
