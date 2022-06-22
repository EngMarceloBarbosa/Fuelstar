import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { tasksTest } from '../../utils/models/tasks';




@Injectable({ providedIn: 'root' })
export class TasksService {

  constructor(private http: HttpClient) { }

  // public listTasks(id: string) {
  //     return this.http
  //         .get<Tasks[]>(environment.ApiUrl + '/tasks/' + id);
  // }

  //  public testTask$ = new Subject<tasksTest>();
  listClient$ = new BehaviorSubject<tasksTest[]>([]);
  chooseProduct$ = new BehaviorSubject<tasksTest[]>([]);
  listProductsNew$ = new BehaviorSubject<tasksTest[]>([]);



  list: any []=[];
  checkedList:any [] =[]
  unCheckedList:any[]=[]


  valueTotal$ = new BehaviorSubject<any>('');
  // testTask2$ = new BehaviorSubject<tasksTest[]>([]);
  badge$ = new BehaviorSubject<tasksTest[]>([]);
  badgeEmpty$ = new  BehaviorSubject<any>('');


}

