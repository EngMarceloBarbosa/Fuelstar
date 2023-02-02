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


  getEntities() {

    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Entities`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }

  getEntitiesClients() {

    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Hollo/Entities?classificationIds=00000000-0005-0000-0000-000000000106`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }

verifyNif(form: FormData){


  console.log(form.get("IdentityDocuments[0].value"))
  console.log(form.get("IdentityDocuments[0].IdentityDocumentId"))
  console.log(form.get("IdentityDocuments[0].countryId"))



    return this.http
    .get<any>(`${environment.api}/api/Thebox/Entities/EntityIdentityDocuments?IdentityDocumentId=${form.get("IdentityDocuments[0].IdentityDocumentId")}&CountryId=${form.get("IdentityDocuments[0].countryId")}&Value=${form.get("IdentityDocuments[0].value")}`, {
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

  // getAddressById(clientDetails) {
  //  console.log(clientDetails)
  //   // this.loadingService.loader();
  //   return this.http
  //     .get<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances/${clientDetails}`, {
  //       headers: new HttpHeaders({
  //         "content-type": "application/json",
  //         Authorization: "Bearer " + environment.token,
  //       })
  //     })
  //     .pipe()
  //     .toPromise();

  // }


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




  putNotesInstance(listTasksById, instanceId) {
    console.log('value', instanceId);
    return this.http
      .patch<any>(`${environment.api}/api/Thebox/Bullets/Instances/${instanceId}`,  (listTasksById), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + environment.token,
          'Content-type': 'application/json',
          'accept': '*/*'
        })
      })
      .pipe()
      .toPromise();
  }


  getNotesInstance(instanceId) {
    console.log('value', instanceId);
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances/${instanceId.id}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + environment.token,
          'Content-type': 'application/json',
          'accept': '*/*'
        })
      })
      .pipe()
      .toPromise();
  }


  editNotesInstanceSheets(taskMain) {
    console.log('value', taskMain);
    return this.http
      .patch<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances/${taskMain.instanceId}/Tasks/${taskMain.id}`,  (taskMain), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + environment.token,
          'Content-type': 'application/json',
          'accept': '*/*'
        })
      })
      .pipe()
      .toPromise();
  }

  editNotesInstanceSheetsPut(taskMain1) {
    console.log('value', taskMain1);
    return this.http
      .put<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances/${taskMain1.id}/Tasks`,  (taskMain1), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + environment.token,
          'Content-type': 'application/json',
          'accept': '*/*'
        })
      })
      .pipe()
      .toPromise();
  }



  putNotesInstanceSheetsPost(taskMain) {
    console.log('value', taskMain);
    return this.http
      .post<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances/${taskMain.instanceId}/Tasks`,  (taskMain), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + environment.token,
          'Content-type': 'application/json',
          'accept': '*/*'
        })
      })
      .pipe()
      .toPromise();
  }


  deleteClient(entityId){
    console.log(entityId)
    // this.loadingService.loader();
    return this.http
      .delete<any>(`${environment.api}/api/Thebox/Entities/${entityId}`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();
  }

  addClient(form){

    return this.http
      .put<any>(`${environment.api}/api/Thebox/Entities`, (form) ,{
        headers: new HttpHeaders({
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();
  }

  putSuspend(task) {
    console.log('tarefa SUSPENSA', task);
    return this.http
      .patch<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances/${task.instanceId}/Status`, JSON.stringify(task),{
        headers: new HttpHeaders({
          Authorization: "Bearer " + environment.token,
          'Content-type': 'application/json',
          'accept': '*/*'
        })
      })
      .pipe()
      .toPromise();
    }

    putExecuted(task) {
      console.log('tarefa SUSPENSA', task);
      return this.http
        .patch<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances/${task.instanceId}/Status`, JSON.stringify(task),{
          headers: new HttpHeaders({
            Authorization: "Bearer " + environment.token,
            'Content-type': 'application/json',
            'accept': '*/*'
          })
        })
        .pipe()
        .toPromise();
      }

  putCancelled(task) {
    console.log('tarefa SUSPENSA', task);
    return this.http
      .patch<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances/${task.instanceId}/Status`, JSON.stringify(task),{
        headers: new HttpHeaders({
          Authorization: "Bearer " + environment.token,
          'Content-type': 'application/json',
          'accept': '*/*'
        })
      })
      .pipe()
      .toPromise();
    }
  putFinalized(task) {
    console.log('tarefa SUSPENSA', task);
    return this.http
      .patch<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances/${task.instanceId}/Status`, JSON.stringify(task),{
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




