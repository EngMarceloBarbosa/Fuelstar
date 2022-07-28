import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsTab } from '../models/clients-tab1';
import { ContactsTaskService } from '../http/contactsTask-api.service';



@Injectable({ providedIn: 'root' })
export class TasksService {
  contactNumber: any;
  idContact:any;
  idContactId:any;
  idEntityId: any;
  phoneContact:any;

  constructor(private http: HttpClient, private contactApiService: ContactsTaskService) { }

  // public listTasks(id: string) {
  //     return this.http
  //         .get<Tasks[]>(environment.ApiUrl + '/tasks/' + id);
  // }

  //  public testTask$ = new Subject<tasksTest>();
  infoClient$ = new BehaviorSubject<ClientsTab[]>([]);
  chooseProduct$ = new BehaviorSubject<ClientsTab[]>([]);
  listProductsNew$ = new BehaviorSubject<ClientsTab[]>([]);
  ammountNew$ = new BehaviorSubject<ClientsTab[]>([]);


  croudGroup: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl (null, Validators.required),
    nif: new FormControl( null),
    email: new FormControl(null),
    phoneNumber: new FormControl(null),
  });

  list: any []=[];
  checkedList:any [] =[]
  unCheckedList:any[]=[]


  valueTotal$ = new BehaviorSubject<any>('');
  // testTask2$ = new BehaviorSubject<tasksTest[]>([]);
  badge$ = new BehaviorSubject<ClientsTab[]>([]);
  badgeEmpty$ = new  BehaviorSubject<any>('');
  value$ = new BehaviorSubject<any>('');


  putPhoneNumber(entityId){

    var contact = {
      id: this.idContact ,
      entityId: this.idEntityId,
      contactId: this.idContactId,
      value:  this.contactNumber,
    }
this.contactApiService.putContacts(entityId).then(() =>
contact = this.phoneContact

)
  }




}

