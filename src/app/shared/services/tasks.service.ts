import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsTab } from '../models/clients-tab1';
import { ContactsTaskService } from '../http/contactsTask-api.service';
import { Contacts, Entity, Instance, InstancePatch } from 'src/app/utils/models/tasks';
import { stringify } from 'querystring';




@Injectable({ providedIn: 'root' })
export class TasksService {
  contactNumber: any;
  idContact: any;
  idContactId: any;
  idEntityId: any;
  value: any;
  phoneContact: any;

  listContacts: Contacts[] = [];
  listEntitys: Entity = null;
  listTasksById:Instance ;
  entity: Entity;
  noteEntity: any;
  notes: any = "Add comment about this delivery";
  email: any;

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
    lastName: new FormControl(null, Validators.required),
    nif: new FormControl(null),
    email: new FormControl(null),
    phoneNumber: new FormControl(null),
  });

  list: any[] = [];
  checkedList: any[] = []
  unCheckedList: any[] = []


  valueTotal$ = new BehaviorSubject<any>('');
  // testTask2$ = new BehaviorSubject<tasksTest[]>([]);
  badge$ = new BehaviorSubject<ClientsTab[]>([]);
  badgeEmpty$ = new BehaviorSubject<any>('');
  value$ = new BehaviorSubject<any>('');
  contact$ = new BehaviorSubject<any>('');


  putPhoneNumber() {

    var contact = {
      id: this.idContact,
      entityId: this.idEntityId,
      contactId: this.idContactId,
      value: this.contactNumber,
    }
    console.log(contact)
    this.contactApiService.putContacts(contact).then(() =>
      this.listContacts[0].value = contact.value
    )
  }


  addNotes() {

    // this.listTasksById1 = new InstancePatch();
    // this.listTasksById
    // this.listTasksById1.name = this.listTasksById.name;

    // this.listTasksById.taks.array.forEach(element => {

    // });

//  var  listTasksById{
//       ...this.listTasksById,
//       note: this.notes
//     }


console.log(this.listTasksById , "DATA")
let data:InstancePatch = new InstancePatch(this.listTasksById);
//  this.listTasksById.note = this.notes;
console.log(data, this.listTasksById , "DATA")
    this.contactApiService.putNotesInstance(data, this.listTasksById.id).then(() =>

      this.notes = this.listTasksById.note
    )
    console.log(this.listTasksById, ' LISTA NOVA');
  }


}

