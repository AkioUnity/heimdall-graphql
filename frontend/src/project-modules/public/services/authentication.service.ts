import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';

import { AuthenticationModel } from "@projectModules/public/models";


@Injectable()
export class AuthenticationService {

    private apiUrl = environment.API_BASE_URL.concat('auth');

    constructor(private http: HttpClient) { }

    login(user: AuthenticationModel): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, user).pipe(
            tap(data => data as any),
            catchError(this.errorHandler)
        );
    }

    signup(user: AuthenticationModel): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup`, user, { withCredentials: true }).pipe(
            tap(data => data as any),
            catchError(this.errorHandler)
        );
    }

    fido2Login(user: AuthenticationModel): Observable<any> {
        return this.http.post(`${this.apiUrl}/fido2Login`, user, { withCredentials: true }).pipe(
            tap(data => data as any),
            catchError(this.errorHandler)
        );
    }

    verifyFido2Resp(formData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/verifyFido2Resp`, formData, { withCredentials: true }).pipe(
            tap(data => data as any),
            catchError(this.errorHandler)
        );
    }

    saveSampleData(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/saveSampleData`, data).pipe(
            tap(data => data as any),
            catchError(this.errorHandler)
        );
    }

    private errorHandler(httpErrorResponse: HttpErrorResponse) {
        return throwError(httpErrorResponse.error || 'Server error');
    }


}
