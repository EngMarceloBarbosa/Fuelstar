import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LoginApiService {
  constructor(private http: HttpClient) {}

  getLogin(authentication: any) {
    {
      // this.loadingService.loader();
      return this.http
        .post<any>(`${environment.api}/Thebox/Login/Local`, authentication)
        .pipe()
        .toPromise();
    }
  }
}
