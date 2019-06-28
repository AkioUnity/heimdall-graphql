import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import { environment } from '@environments/environment';
import { ServiceModel } from '@projectModules/service/models';

/**
 * Funny Name, becuause our CRUD identity is also named as service
 */
@Injectable()
export class ServiceService {
  private readonly API_URL = environment.API_BASE_URL.concat('service');

  constructor(private http: HttpClient) { }

  list(): Observable<ServiceModel[]> {
    return this.http.get<ServiceModel[]>(`${this.API_URL}/list`).pipe(
      tap(data => <ServiceModel[]>data),
      catchError(this.errorHandler)
    );
  }

  find(id: number): Observable<ServiceModel> {
    return this.http.get<ServiceModel>(`${this.API_URL}/find/${id}`).pipe(
      tap(data => <ServiceModel>data),
      catchError(this.errorHandler)
    );
  }

  create(service: ServiceModel): Observable<ServiceModel> {
    return this.http.post<ServiceModel>(`${this.API_URL}/create`, service).pipe(
      tap(data => <ServiceModel>data),
      catchError(this.errorHandler)
    );
  }

  update(id: number, service: ServiceModel): Observable<ServiceModel> {
    return this.http.patch<ServiceModel>(`${this.API_URL}/update/${id}`, service).pipe(
      tap(data => <ServiceModel>data),
      catchError(this.errorHandler)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/delete/${id}`).pipe(
      tap(data => <any>data),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(httpErrorResponse: HttpErrorResponse) {
    return throwError(httpErrorResponse.error || 'Server error');
  }

}

