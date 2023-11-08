import { Injectable } from '@angular/core';
import { tap, catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserDto, NewUserDto, UserClamesDto, UserRequestDto } from '../models/userDto';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl + 'Auth/';
  constructor(private http: HttpClient) {
  }



  login(userDto: UserDto) {
    const json = {
      email: userDto.email,
      password: userDto.password
    }
    return this.http.post<UserDto>(this.apiUrl + 'Login', json ).pipe(
      tap((_) => this.log('logging in')),
      catchError(this.handleError<any>('login')),
      map((response) => {
        this.setToken(response);
        return response;
      })
    );

  }

  register(newUserDto: NewUserDto) {
    const json = {
      email: newUserDto.email,
      name: newUserDto.name,
      phone: newUserDto.phone,
      password: newUserDto.password,
      confirmPassword: newUserDto.confirmPassword
    }
    return this.http.post<NewUserDto>(this.apiUrl + 'Register', json).pipe(
      tap((_) => this.log('register user')),
      catchError(this.handleError<any>('register')),
      map((response) => {
        return response;
      })
    );
  }

  getRoles() {
    return this.http.get<Role[]>(this.apiUrl + 'GetRoles' ).pipe(
      tap((_) => this.log('get roles')),
      catchError(this.handleError<any>('getRoles')),
      map((response) => {
        return response;
      })
    );
  }

  getNewRoleRequests() {
    return this.http.get<Role[]>(this.apiUrl + 'NewRoleRequest' ).pipe(
      tap((_) => this.log('NewRoleRequest')),
      catchError(this.handleError<any>('NewRoleRequest')),
      map((response) => {
        return response;
      })
    );
  }

  acceptRoleRequest(UserRequestDto: UserRequestDto){
    const json = {
      requestId: UserRequestDto.requestId,
      userName: UserRequestDto.userName,
      roleName: UserRequestDto.roleName
    }
    return this.http.post<UserRequestDto>(this.apiUrl + 'AcceptRoleRequest', json).pipe(
      tap((_) => this.log('AcceptRoleRequest')),
      catchError(this.handleError<any>('AcceptRoleRequest')),
      map((response) => {
        return response;
      })
    );
  }

  public denyRoleRequest(UserRequestDto: UserRequestDto): Observable<UserRequestDto> {
    return this.http.delete<UserRequestDto>(`${this.apiUrl+ 'DenyRoleRequest'}/${UserRequestDto.requestId}`);
  }

  requestNewRole(roleId: number) {
    const json = {
      roleId: roleId
    }
    return this.http.post(this.apiUrl + 'RoleRequest', json).pipe(
      tap((_) => this.log('RoleRequest')),
      catchError(this.handleError<any>('RoleRequest')),
      map((response) => {
        return response;
      })
    );
  }

  getUserClaims(){
    return this.http.get(this.apiUrl + 'UserClames' ).pipe(
      tap((_) => this.log('get user clames')),
      catchError(this.handleError<any>('UserClames')),
      map((response) => {
        this.setUserClaims(response);
        return response;
      })
    );
  }

  getToken() {
    return localStorage.getItem('auth-token');
  }

  private setUserClaims(resultClames: UserClamesDto) {

    localStorage.setItem('user-name', resultClames.userName);
    localStorage.setItem('user-email', resultClames.userEmail);
    localStorage.setItem('user-role', resultClames.userRoleName);
  }

  private setToken(resultToken: string) {

    localStorage.setItem('auth-token', resultToken);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.error.message}`);

      // Let the app keep running by returning an empty result.
      // return of(result as T);
      return of(error);
    };
  }
  private log(message: string) {
    /*this.messageService.add(`ApiServi: ${message}`);*/
    //console.log(`ApiService: ${message}`);
  }
}
