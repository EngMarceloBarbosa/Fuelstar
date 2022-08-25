import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PaymentMethodApiService {
  constructor(private http: HttpClient) { }

  getPaymentMethod() {
    {
      // this.loadingService.loader();
      return this.http
        .get<any>(`${environment.api}/api/Thebox/CustomDocuments/PaymentMethods`, {
          headers: new HttpHeaders({
            "content-type": "application/json",
            Authorization: "Bearer " + environment.token,
          })
        })
        .pipe()
        .toPromise();
    }

  }
}
