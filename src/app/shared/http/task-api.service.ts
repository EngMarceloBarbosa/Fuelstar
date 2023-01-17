import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TasksService } from '../services/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  constructor(private http: HttpClient,public tasksService: TasksService) { }


  getTasks() {

    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Bullets/Instances`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }

  getTasksItemIdAtribuited() {

    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances?RoleId=${this.tasksService.roleId}&EntityId=${this.tasksService.entityId}&CurrentStatusFilterMode=1&CurrentStatusId=28b097a1-2834-4c9f-b1c6-6b2f316401af`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }

  getTasksItemIdExecuted() {

    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances?RoleId=${this.tasksService.roleId}&EntityId=${this.tasksService.entityId}&CurrentStatusFilterMode=1&CurrentStatusId=23d91faf-d13d-42b0-902b-2de5d49a31ee`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }
  getTasksItemIdFinalized() {

    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances?RoleId=${this.tasksService.roleId}&EntityId=${this.tasksService.entityId}&CurrentStatusFilterMode=1&CurrentStatusId=e6875497-3ad4-4121-b3aa-4efde5d12fb1`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }

  updateTasksItemIdFinalizedDates(instanceId, updateTask) {

    // this.loadingService.loader();
    return this.http
      .patch<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances/${instanceId}/Dates`,  JSON.stringify(updateTask),  {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }


  updateTasksItemIdFinalized(instanceId, updateTask) {

    // this.loadingService.loader();
    return this.http
      .patch<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances/${instanceId}`,  JSON.stringify(updateTask),  {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }




  getTasksItemIdSuspend() {

    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances?RoleId=${this.tasksService.roleId}&EntityId=${this.tasksService.entityId}&CurrentStatusFilterMode=1&CurrentStatusId=00bba7ce-f90b-4ebb-9478-777376f78e93`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }
  getTasksItemIdCancelled() {

    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances?RoleId=${this.tasksService.roleId}&EntityId=${this.tasksService.entityId}&CurrentStatusFilterMode=1&CurrentStatusId=7d555330-4228-45b8-87a3-1f8c905284fe`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }



  getTypesStateTask(){
    return this.http
    .get<any>(`${environment.api}/api/Thebox/Bullets`, {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: "Bearer " + environment.token,
      })
    })
    .pipe()
    .toPromise();

}

  getTypesBulletsStateTask(id){
    return this.http
    .get<any>(`${environment.api}/api/Thebox/Bullets/${id}`, {
      headers: new HttpHeaders({
        "content-type": "application/json",
        Authorization: "Bearer " + environment.token,
      })
    })
    .pipe()
    .toPromise();

}

}
