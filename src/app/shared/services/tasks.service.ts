import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsTab } from '../models/clients-tab1';
import { ContactsTaskService } from '../http/contactsTask-api.service';
import { Contacts, Entity, IdentityDocuments, Instance, InstancePatch, Items, Tasks } from 'src/app/utils/models/tasks';
import { ItemApiService } from '../http/item-api.service';





@Injectable({ providedIn: 'root' })
export class TasksService {

  allDocumentsFilter: any;
  contactNumber: any;
  idContact: any;
  idContactId: any;
  idEntityId: any;
  value: any;
  phoneContact: any;
  listTasks: Tasks[];
  quantityTotal:any;
  listClients: Entity[] = [];
  listContacts: Contacts[] = [];
  listEntitys: Entity = null;
  listTasksById: Instance;
  entity: Entity;
  noteEntity: any;
  notes: any;
  email: any;
  valueFirstName: string = "";
  valueLastName: string = "";
  valueNif: string = "";
  valueEmail: string = "";
  valuePhoneNumber: string = "";
  clientFields: any;
  countVisits: any = [];
  countsToDo: any = [];
  quantity1: any;
  listValue: any;
  listItems: Items[] = [];
  totalValueRequest: number;
  verifyEntity:IdentityDocuments[] = [];
  listItemsByType: Items;

  //   newClientForm: FormGroup =  new FormGroup({
  //   firstName: new FormControl(this.valueFirstName),
  //   lastName: new FormControl(null),
  //   identityDocumentId: new FormControl(null),
  //   contactId: new FormControl(null),
  //   value: new FormControl(null)
  // }
  // )

  constructor(private http: HttpClient, private contactApiService: ContactsTaskService, public itemApiService: ItemApiService) { }

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

  putImageItems() {

    var proImage = new Image();
    proImage.src = "assets/img/wine 2.jpg"
    document.body.appendChild(proImage);

    let formImage = new FormData();

    formImage.append('file', proImage.src);
    console.log(proImage.src)

    this.itemApiService.putImageItem(this.listItems[0].id, formImage).then(() =>
      this.listItems
    )
  }


  addNotes() {

    // this.listTasksById1 = new InstancePatch();
    // this.listTasksById
    // this.listTasksById1.name = this.listTasksById.name;ks

    // this.listTasksById.taks.array.forEach(element => {

    // });


    //


    //



    console.log(this.listTasksById, "DATA")
    let data: InstancePatch = new InstancePatch(this.listTasksById);

    const listTasksByIdNew = {
      ...data,
      note: this.notes
    };
    console.log(this.notes, 'NOTES A NULO ')

    // this.listTasksById.note = this.notes;
    console.log(data, listTasksByIdNew, "DATA")
    this.contactApiService.putNotesInstance(listTasksByIdNew, this.listTasksById.id).then(() =>
      this.listTasksById.note = listTasksByIdNew.note
    )
    console.log(this.notes);
    console.log(listTasksByIdNew, ' LISTA NOVA');
  }


  //



  //


}

