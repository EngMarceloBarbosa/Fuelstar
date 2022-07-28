import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacts } from 'src/app/utils/models/tasks';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsTaskService {



  constructor(private http: HttpClient) { }


  getContact() {

    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Entities/EntityContacts`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }

  getContactById(entityId:any) {

    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Entities/${entityId}/Contacts`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }


  putContacts(entityId) {

    // this.loadingService.loader();
    return this.http
      .put<any>(`${environment.api}/api/Thebox/Entities/${entityId}/Contacts`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }
}
