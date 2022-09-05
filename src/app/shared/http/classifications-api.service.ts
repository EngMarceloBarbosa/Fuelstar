import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class ClassificationApiService {
  constructor(private http: HttpClient) { }


  getClassification() {

    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Entities/EntityProperties/Classifications`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }


}
