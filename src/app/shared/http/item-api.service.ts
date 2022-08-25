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
      .get<any>(`${environment.api}/api/Thebox/Items/ItemProperties/Types/Tree`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }



  getItems(id) {
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Items?TypeFilterMode=1&TypeId=${id}`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();
  }


  // putItems() {
  //   return this.http
  //     .put<any>(`${environment.api}/api/Thebox/Items/ItemProperties/Types`,  {
  //       headers: new HttpHeaders({
  //         "content-type": "application/json",
  //         Authorization: "Bearer " + environment.token,
  //       })
  //     })
  //     .pipe()
  //     .toPromise();
  // }






 getImageItem(itemId) {
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Items/${itemId}/Image` , {
        headers: new HttpHeaders({
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }

}







