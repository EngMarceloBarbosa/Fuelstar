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
  public signatureImageClient: string = "";
  public signatureImageTecnic: string = "";
  apiKey: string ="https://api.fuelstarplus.com:11001";
  logoData1: any;
  invertedArray:any = [];
  selectedImages = [];
  formGetByIdAll:any;
  formGetByIdAll1:any;
  noteSuspend:any;
  image:any;
  image1:any;
  image2:any;
  image3:any;
  image4:any;
  image5:any;
  image6:any;
  image7:any;
  image8:any;
  idForm1:any;
  // turnNoForms : boolean = false;
  imgTecnhic:any;
  imgClient:any;
  fileIdClient:any;
  fileIdTecnhic:any;
  structureList: any;
  idForm:any = [];
  formsSubmit:any;
  form: FormGroup;
  structure: any;
  postFormsAfterProcess:any;
  turnForm: boolean = false;
  formGetById:any;
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
    sure: new FormControl('', [Validators.required]),
    reason: new FormControl(''),
    sureOVM: new FormControl('',[Validators.required]),
    reasonOVM: new FormControl(''),
    initialDate: new FormControl(''),
    finalDate: new FormControl(''),
    // technic: new FormControl('')
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


    // this.loadingService.loader();
    return this.http
      .post<any>(`${environment.api}/api/Thebox/Forms/FormInstances`, JSON.stringify(form), {
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
      .patch<any>(`${environment.api}/api/Thebox/Forms/FormInstances/${id}/Process`, null ,{
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }

  PostsubmitForms(formId, instanceId) {

    // this.loadingService.loader();
    return this.http
      .post<any>(`${environment.api}/api/Thebox/Bullets/BulletInstances/${instanceId}/FormInstances`, (formId), {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }

  getFormsbyId(formIdGenerated) {

    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Forms/FormInstances/${formIdGenerated}`,  {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }

  getImageById(id) {

    // this.loadingService.loader();
    return this.http
      .get<any>(`${environment.api}/api/Thebox/Files/TheboxFiles/${id}`,  {
        headers: new HttpHeaders({
          "content-type": "application/json",
          Authorization: "Bearer " + environment.token,
        })
      })
      .pipe()
      .toPromise();

  }

  //POR IMAGEM  NO FORMULARIO


  putImageForms(instanceId, fieldId, binaryData) {

    console.log('tarefa SUSPENSA', );

    return this.http
      .put<any>(`${environment.api}/api/Thebox/Forms/FormInstances/${instanceId}/FileField/${fieldId}`, (binaryData), {
        headers: new HttpHeaders({
          Authorization: "Bearer " + environment.token,
          'accept': '*/*'
        })
      })
      .pipe()
      .toPromise();
    }



}
