import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { appointmentApi } from '../models/appointment-api';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) { }

  createApointment(appointment: appointmentApi): Observable<any> {
    return this.httpClient.post("http://34.94.79.113:9090/api/appointment", appointment);
  }

  getApointments(id_user: string) {
    return this.httpClient.get("http://34.94.79.113:9090/api/appointments/"+id_user);
  }

  upLoadDocumentIdentity(file: any): Observable<any> {
    const formParams = new FormData();
   formParams.append('file', file)
    return this.httpClient.post("http://34.94.79.113:9090/api/documents/identification/upload", formParams);
  }

  upLoadDocumentNacionality(file: any): Observable<any> {
    const formParams = new FormData();
   formParams.append('file', file)
    return this.httpClient.post("http://34.94.79.113:9090/api/documents/nationality/upload"   , formParams);
  }

  getIdentityDocument(name: string): Observable<any> {
    return this.httpClient.get("http://34.94.79.113:9090/api/documents/identification/file/"+name);
  }
}
