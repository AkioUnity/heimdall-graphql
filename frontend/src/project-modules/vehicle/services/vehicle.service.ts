import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { VehicleModel } from '@projectModules/vehicle/models';

@Injectable()
export class VehicleService {
  private readonly API_URL = environment.API_BASE_URL.concat('vehicle');

  constructor(private http: HttpClient) { }

  list(): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(`${this.API_URL}/list`).pipe(
      tap(data => <VehicleModel[]>data),
      catchError(this.errorHandler)
    );
  }

  find(id: number): Observable<VehicleModel> {
    return this.http.get<VehicleModel>(`${this.API_URL}/find/${id}`).pipe(
      tap(data => <VehicleModel>data),
      catchError(this.errorHandler)
    );
  }

  create(vehicle: VehicleModel): Observable<VehicleModel> {
    return this.http.post<VehicleModel>(`${this.API_URL}/create`, vehicle).pipe(
      tap(data => <VehicleModel>data),
      catchError(this.errorHandler)
    );
  }

  update(id: number, vehicle: VehicleModel): Observable<VehicleModel> {
    return this.http.patch<VehicleModel>(`${this.API_URL}/update/${id}`, vehicle).pipe(
      tap(data => <VehicleModel>data),
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