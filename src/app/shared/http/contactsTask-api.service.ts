import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacts, Entity } from 'src/app/utils/models/tasks';
import { environment } from 'src/environments/environment';
import { TasksService } from '../services/tasks.service';

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

  getAddressById(clientDetails) {
   console.log(clientDetails)
    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Bullets/Instances/${clientDetails}`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }


  getEntityHeader(entityId) {
   console.log(entityId)
    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Entities/${entityId}/Header`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }

  putContacts(contact) {
    console.log('value', contact);
    return this.http
      .patch<any>(`${environment.api}/api/Thebox/Entities/${contact.entityId}/Contacts/${contact.id}`, JSON.stringify(contact.value),{
        headers: new HttpHeaders({
          Authorization: "Bearer " + environment.token,
          'Content-type': 'application/json',
          'accept': '*/*'
        })
      })
      .pipe()
      .toPromise();

  }


  putNotesInstance(listTasksById) {
    console.log('value', listTasksById);
    return this.http
      .patch<any>(`${environment.api}/api/Thebox/Bullets/Instances/${listTasksById.id}`, JSON.stringify(listTasksById), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + environment.token,
          'Content-type': 'application/json',
          'accept': '*/*'
        })
      })
      .pipe()
      .toPromise();
  }



  // putNotes(listEntitys) {
  //   console.log(listEntitys);
  //   let temp = new FormData();
  //   Object.entries(listEntitys).forEach((elem) =>{
  //     temp.append(elem[0].charAt(0).toUpperCase() + elem[0].slice(1), elem[1] as string)
  //   });
  //   return this.http
  //     .patch<any>(`${environment.api}/api/Thebox/Entities/${listEntitys.id}/Header`, temp,{
  //       headers: new HttpHeaders({
  //         Authorization: "Bearer " + environment.token,
  //         'Content-type': 'multipart/form-data',
  //         'accept': '*/*'
  //       })
  //     })
  //     .pipe()
  //     .toPromise();

  // }
}
