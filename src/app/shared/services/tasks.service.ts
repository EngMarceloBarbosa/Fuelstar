import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsTab } from '../models/clients-tab1';




@Injectable({ providedIn: 'root' })
export class TasksService {

  constructor(private http: HttpClient) { }

  // public listTasks(id: string) {
  //     return this.http
  //         .get<Tasks[]>(environment.ApiUrl + '/tasks/' + id);
  // }

  //  public testTask$ = new Subject<tasksTest>();
  listClient$ = new BehaviorSubject<ClientsTab[]>([]);
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


}

