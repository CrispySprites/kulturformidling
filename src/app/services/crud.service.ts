import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserDto, UserNameDto } from '../models/userDto';
import { Type } from '../models/type';
import { ArtDto } from '../models/Art';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  apiUrl = environment.apiUrl + 'CRUD/';
  constructor(private http: HttpClient) {
  }

  getTypes() {
    return this.http.get<Type[]>(this.apiUrl + 'Types').pipe(
      tap((_) => this.log('get types')),
      catchError(this.handleError<any>('getTypes')),
      map((response) => {
        return response;
      })
    );
  }

  getArtByType(type: Type) {
    return this.http.post<ArtDto[]>(this.apiUrl + 'ArtByType', type).pipe(
      tap((_) => this.log('get ArtByType')),
      catchError(this.handleError<any>('ArtByType')),
      map((response) => {
        return response;
      })
    );
  }

  public getArtists(): Observable<UserNameDto[]> {
    return this.http.get<UserNameDto[]>(this.apiUrl + 'Artists');
  }

  public addArt(art: ArtDto): Observable<ArtDto> {
    return this.http.post<ArtDto>(this.apiUrl + 'Art', art);
  }
  public editArt(art: ArtDto): Observable<ArtDto> {
    return this.http.put<ArtDto>(this.apiUrl + 'Art', art);
  }
  public deleteArt(art: ArtDto): Observable<ArtDto> {
    return this.http.delete<ArtDto>(`${this.apiUrl}${art.artId}`);
  }

  public addType(type: Type): Observable<Type> {
    return this.http.post<Type>(this.apiUrl + 'Type', type);
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
