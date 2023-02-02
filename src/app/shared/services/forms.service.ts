import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ContactsTaskService } from "../http/contactsTask-api.service";
import { ItemApiService } from "../http/item-api.service";

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from "src/environments/environment";
import { TasksService } from "./tasks.service";


@Injectable({ providedIn: 'root' })
export class FormsService {


  idForm:any;
  formsSubmit:any;
  form: FormGroup;

  dateFormsStep1 = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    dateOfTheDay: new FormControl('', [Validators.required]),
    departure: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    kilometers: new FormControl(null, [Validators.required]),
    type: new FormControl('', [Validators.required]),
    registration: new FormControl('', [Validators.required]),

  });



  dateFormsStep2 = new FormGroup({
    materials: new FormControl(''),
    anomalias: new FormControl(''),
    trabalho: new FormControl('')
  });

  dateFormsStep3 = new FormGroup({
    sure: new FormControl( [Validators.required]),
    reason: new FormControl(''),
    sureOVM: new FormControl(''),
    reasonOVM: new FormControl(''),
    initialDate: new FormControl(''),
    finalDate: new FormControl(''),
  });

  dateFormsStep4 = new FormGroup({
    signatures: new FormControl('')
  });

  finalForm = new FormGroup ({
   dateFormsStep1 : this.dateFormsStep1,
   dateFormsStep2 : this.dateFormsStep2,
   dateFormsStep3 : this.dateFormsStep3,
   dateFormsStep4 : this.dateFormsStep4,

  })



  forms1 = {
    value: this.dateFormsStep1.value.kilometers
  }





  constructor(private http: HttpClient, private contactApiService: ContactsTaskService, public itemApiService: ItemApiService, public router: Router, public tasksService:TasksService) {



  }

ngOnit(){
  console.log(this.dateFormsStep1.value.dateOfTheDay)
}



  //    forms = {
  //   formId: "DB6F3078-8B55-4628-861A-81F56CF57D7D",
  //   fields: {
  //     dateFields : [
  //       {
  //       fieldId: "00000000-0000-0000-0000-000000000002",
  //       value : this.dateFormsStep1.value.dateOfTheDay
  //       },
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000004",
  //         value : this.dateFormsStep1.value.startDate

  //       },
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000005",
  //         value : this.dateFormsStep1.value.endDate

  //       },
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000017",
  //         value : this.dateFormsStep3.value.initialDate

  //       },
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000018",
  //         value : this.dateFormsStep3.value.finalDate

  //       }


  //     ],
  //     booleanFields : [
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000015",
  //         value : this.dateFormsStep3.value.optionOVM
  //       },
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000013",
  //         value : this.dateFormsStep3.value.sureOption
  //       }
  //     ],
  //     fieldText : [
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000006",
  //         value : this.dateFormsStep1.value.departure
  //       },
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000007",
  //         value : this.dateFormsStep1.value.destination
  //       },
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000009",
  //         value : this.dateFormsStep1.value.registration
  //       },
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000014",
  //         value : this.dateFormsStep3.value.reason
  //       },
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000016",
  //         value : this.dateFormsStep3.value.reason
  //       },
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000010",
  //         value : this.dateFormsStep2.value.materials
  //       },
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000011",
  //         value : this.dateFormsStep2.value.anomalias
  //       },
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000012",
  //         value : this.dateFormsStep2.value.trabalho
  //       },

  //     ],
  //     selectFields: [
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000003",
  //         value : "this.dateFormsStep1.value.type"
  //       }
  //     ],
  //     numericFields: [
  //       {
  //         fieldId: "00000000-0000-0000-0000-000000000008",
  //         value : this.dateFormsStep1.value.kilometers
  //       }
  //     ]

  //   }

  // }


  postForms(form) {
    console.log(environment.token)

    // this.loadingService.loader();
    return this.http
      .post<any>(`${environment.api}/api/Thebox/Forms/FormInstances`, (form), {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,

        })

      })
      .pipe()
      .toPromise();

  }

  submitForms(id) {
    console.log(environment.token)

    // this.loadingService.loader();
    return this.http
      .patch<any>(`${environment.api}/api/Thebox/Forms/FormInstances/${id}/Process`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }

  PostsubmitForms(id) {

    // this.loadingService.loader();
    return this.http
      .patch<any>(`${environment.api}/api/Thebox/Forms/FormInstances/${id}/FormInstances`, {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }



}
