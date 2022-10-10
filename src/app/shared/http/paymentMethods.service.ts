import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { TasksService } from "../services/tasks.service";

@Injectable({
  providedIn: "root",
})
export class PaymentMethodApiService {
  constructor(private http: HttpClient, public tasksService: TasksService) { }

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

  getDocumentMethod() {
    {
      // this.loadingService.loader();
      return this.http
        .get<any>(`${environment.api}/api/Thebox/CustomDocuments/Payment/DocumentInstances/${this.tasksService.listTasks[0].id }`, {
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
