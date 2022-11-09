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

  getTasksItemId() {
      console.log(this.tasksService.listTasks[0].item.id)
    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Bullets/Instances?ItemId=${this.tasksService.listTasks[0].item.id}`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }
}
