import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacts, Entity } from 'src/app/utils/models/tasks';
import { environment } from 'src/environments/environment';
import { TasksService } from '../services/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class ItemApiService {



  constructor(private http: HttpClient) { }


  getItem() {

    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Items`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }



}
