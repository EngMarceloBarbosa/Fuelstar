import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsTab } from '../models/clients-tab1';
import { ContactsTaskService } from '../http/contactsTask-api.service';
import { Classification, Contacts, Entity, IdentityDocuments, Instance, InstancePatch, Items, PaymentMethods, StatusFlows, SubTypesState, Task, Tasks, TypesState } from 'src/app/utils/models/tasks';
import { ItemApiService } from '../http/item-api.service';
import { Router } from '@angular/router';
import { TaskApiService } from '../http/task-api.service';





@Injectable({ providedIn: 'root' })
export class TasksService {

  searchDoc:any;
  allDocumentsFilter: any;
  allDocumentsFilter1:any;
  listsItems: any;
  contactNumber: any;
  idContact: any;
  idContactId: any;
  idEntityId: any;
  value: any;
  phoneContact: any;
  listTasks: Tasks[];
  listTasks1: Tasks[];
  listTasks2: Tasks[];
  listTasksFinalized: Tasks[] = [];
  listTasksSuspended: Tasks[];
  listTasksCancelled: Tasks[];
  listTasksItemId:any;
  quantityTotal: any;
  listClients: Entity[] = [];
  listClients1: Classification[] = [];
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
  quantity2: any = 1;
  listValue: any;
  listItems: Items[] = [];
  totalValueRequest: number;
  verifyEntity: IdentityDocuments[] = [];
  listItemsByType: Items[];
  itemSelected: any;
  productList: any[] = [];
  visiteEfected: any[] = [];
  visiteToDo: any[] = [];
  visiteToDo1: any[] = [];
  test: any[]=[];
  item: any;
  badge: number = 0;
  selectedItem: any = "";
  paymentMethods: PaymentMethods[];
  selectedMethod: any = "";
  checkList: string[] = [];
  controlBadge: boolean = true;
  control: boolean = false;
  validatorEmail: boolean = false;
  isSubmitted = false;
  listClassifications: any;
  selectedList:any[]=[1];
  today:any
  time: any;
  validatorNIF:boolean = false;
  controlStep:boolean = false;
  controlStep1:boolean = false;
  controlStep2:boolean = false;
  controlStep3:boolean = false;
  controlStepCheck:boolean = false;
  controlStepCheckk: boolean = false;
  controlStepCheckk1: boolean = false;
  controlStepCheckk2: boolean = false;
  msgAlert:boolean = false;
  controlStepCheck1:boolean = false;
  controlStepCheck2:boolean = false;
  controlStepCheck3:boolean = false;
  // turnColor = false;
  turnColorOrange = false;
  msgErrorNif:any= "Nif não Válido"
    min = '1';
  max = '1000';
  random: any;
  msgAlertReceipt: boolean = false;
  turnFreeSale: boolean = false;
  valueReceipt: any;
  documentMethods:any;
  totalValueRequestPrice:any;
  totalValueItemPrice:any;
  toDo: boolean = true;
  turnSearch: boolean = false;
  latitude: any;
  longitude:any;
  entityId: any;
  roleId: any;
  entityName:any;
  entityLastname:any;
  operation:any ="Operation Type"
  turnMsgAlertTask = false;
  turnMsgAlertTask1 = false;
  msgAlertTasks:any;
  msgAlertTasks1:any;
  continue1: boolean = true;
  typesState: TypesState[];
  typesStatesBullets:SubTypesState[];
  instanceId: any;
  typesStateIntance:TypesState;
  turnColor = false;
  turnButton = false;
  finalized = false;
  selectedTask: any = [];
  loginUser: any = "" ;
  notesTask: any = [];
  notesTasks: any = [];
  postNotes: any = "";
  totalTime:any;
  selectedPost:any;
  //   newClientForm: FormGroup =  new FormGroup({
  //   firstName: new FormControl(this.valueFirstName),
  //   lastName: new FormControl(null),
  //   identityDocumentId: new FormControl(null),
  //   contactId: new FormControl(null),
  //   value: new FormControl(null)
  // }
  // )

  constructor(private http: HttpClient, private contactApiService: ContactsTaskService, public itemApiService: ItemApiService,  public router: Router) {



   }

  // public listTasks(id: string) {
  //     return this.http
  //         .get<Tasks[]>(environment.ApiUrl + '/tasks/' + id);
  // }

  //  public testTask$ = new Subject<tasksTest>();
  infoClient$ = new BehaviorSubject<ClientsTab[]>([]);
  // chooseProduct$ = new BehaviorSubject<ClientsTab[]>([]);
  // listProductsNew$ = new BehaviorSubject<ClientsTab[]>([]);
  ammountNew$ = new BehaviorSubject<ClientsTab[]>([]);
  ammountId$ = new BehaviorSubject<ClientsTab[]>([]);


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


  // valueTotal$ = new BehaviorSubject<any>('');
  // testTask2$ = new BehaviorSubject<tasksTest[]>([]);
  // badge$ = new BehaviorSubject<ClientsTab[]>([]);
  badgeEmpty$ = new BehaviorSubject<any>('');
  value$ = new BehaviorSubject<any>('');
  contact$ = new BehaviorSubject<any>('');

timeHours(){
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

   this.today = new Date();
   this.time = new Date();
   this.totalTime = new Date();
  var dd = String(this.today.getDate()).padStart(2, '0');
  var yyyy = this.today.getFullYear();
  var hours = String(this.time.getHours()).padStart(2, '0')
  var minutes = String(this.time.getMinutes()).padStart(2, '0');
  var seconds = String(this.time.getSeconds()).padStart(2, '0');
  var ms = String(this.time.getMilliseconds()).padStart(3, '0');
  var month = String(this.time.getMonth() + 1).padStart(2, '0') ;

  console.log(hours, 'horas')

  this.today = dd + '/' + monthNames[this.today.getMonth()] + '/' + yyyy;
  this.time = hours + '-' + minutes + '-' + seconds

   this.totalTime = yyyy  + '-' + month  + '-' + dd+'T' + hours + ':' + minutes + ':' + seconds + '.'+ ms +'Z'
  console.log(this.today)
  console.log(this.time)
}


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

  putTaskExecuted(){

    var task = {
      statusId: "23d91faf-d13d-42b0-902b-2de5d49a31ee",
      note: null,
      instanceId: this.instanceId
    }

    console.log(task)
    this.contactApiService.putExecuted(task).then(() =>
    console.log(task, 'em execução')
    )
  }




  putTaskSuspend(){

  var task = {
    statusId: "00bba7ce-f90b-4ebb-9478-777376f78e93",
    note: null,
    instanceId: this.instanceId
  }

  console.log(task)
  this.contactApiService.putSuspend(task).then(() =>
  console.log(task, 'suspenso')
  )
}


putTaskFinalize(){

  var task = {
    statusId: "e6875497-3ad4-4121-b3aa-4efde5d12fb1",
    note: null,
    instanceId: this.instanceId
  }

  console.log(task)
  this.contactApiService.putFinalized(task).then(() =>
  console.log(task,  'finalizado')
  )
}

putTaskCancelled(){

  var task = {
    statusId: "7d555330-4228-45b8-87a3-1f8c905284fe",
    note: null,
    instanceId: this.instanceId
  }

  console.log(task)
  this.contactApiService.putCancelled(task).then(() =>
  console.log(task,  'Cancelado')
  )
}


  getImageItems() {

    // var proImage = new Image();
    // proImage.src = "assets/img/wine 2.jpg"
    // document.body.appendChild(proImage);

    // let formImage = new FormData();

    // formImage.append('file', proImage.src);
    // console.log(proImage.src)



    this.itemApiService.getImageItem(this.listItems[0].id).then(res => {

      console.log(res);
    }
    )
  }


  async addNotes(task) {

    await this.contactApiService.getNotesInstance(this.selectedTask).then((res) =>
    // console.log(res)
    this.notesTask = res
    )

    console.log(this.notesTask, 'NOTAS DOS POSTS')
    console.log(this.notesTask.id)
    // console.log(this.notesTask.tasks[0].note)



   await  this.notesTask.tasks.map((res)=> {
     this.notesTasks = res
  })
// con

    // this.listTasksById1 = new InstancePatch();
    // this.listTasksById
    // this.listTasksById1.name = this.listTasksById.name;ks

    // this.listTasksById.taks.array.forEach(element => {

    // });


    //


    //



    console.log(this.listTasksById, "DATA")
    console.log(this.notes)
    // let data: InstancePatch = new InstancePatch(this.selectedTask);

    // const listTasksByIdNew = {
    //   note: this.notes.detail.value,
    //   date: "2022-12-27T11:08:28.098Z"
      // ...data,
    // };


console.log(this.selectedTask.id)

    const taskMain = {
      note: this.notes.detail.value,
      instanceId: this.selectedTask.id,
      entityId: task.entity.id,
      id:  task.id,
      date: this.totalTime
      // ...data,
    };
    console.log(this.notes, 'NOTES A NULO ')

    // this.listTasksById.note = this.notes;
    // console.log( listTasksByIdNew, "DATA")
    // this.contactApiService.putNotesInstanceSheets(listTasksByIdNew, this.selectedTask).then(() =>
    //   this.selectedTask.note = listTasksByIdNew.note
    // )

   await this.contactApiService.editNotesInstanceSheets(taskMain).then(() =>
    this.selectedTask.note = taskMain.note
    )

    console.log(this.notes);

    await this.contactApiService.getNotesInstance(this.selectedTask).then((res) =>
    // console.log(res)
    this.notesTask = res
    )

    console.log(this.notesTask)

    console.log(this.notesTask, 'NOTAS DOS POSTS')
    console.log(this.notesTask.id)
    // console.log(this.notesTask.tasks[0].note)



   await  this.notesTask.tasks.map((res)=> {
     this.notesTasks = res
  })
// console.log.notesTasks.note)
  console.log(this.notesTasks, 'Notas das TASKS' )

    // console.log(listTasksByIdNew, ' LISTA NOVA');
  }

  async putNotes() {

    console.log(this.totalTime)

    const taskMain = {
      note: this.postNotes.detail.value,
      instanceId: this.selectedTask.id,
      entityId: this.selectedTask.entity.id,
      date: this.totalTime
      // ...data,
    };
    console.log(this.notes, 'NOTES A NULO ')

    await this.contactApiService.putNotesInstanceSheetsPost(taskMain).then(() =>
    this.selectedTask.note = taskMain.note
    )

    console.log(this.notes);

    await this.contactApiService.getNotesInstance(this.selectedTask).then((res) =>
    // console.log(res)
    this.notesTask = res
    )

   await  this.notesTask.tasks.map((res) => {
      this.notesTasks = res
    })
console.log(this.notesTasks)
    console.log(    this.notesTask)


  }






  validateNIF(nif: string) {
    const validationSets = {
      one: ['1', '2', '3', '5', '6', '8'],
      two: ['45', '70', '71', '72', '74', '75', '77', '79', '90', '91', '98', '99']
    };
    if (nif.length !== 9) {
      console.log('NÃO PASSOU')
this.validatorNIF = true;
    };
    if (!validationSets.one.includes(nif.substring(0, 1)) && !validationSets.two.includes(nif.substring(0, 2))){
      this.validatorNIF = true;
    }else{
    const nifNumbers = nif.split('').map(c => Number.parseInt(c))
    const total = nifNumbers[0] * 9 +
      nifNumbers[1] * 8 +
      nifNumbers[2] * 7 +
      nifNumbers[3] * 6 +
      nifNumbers[4] * 5 +
      nifNumbers[5] * 4 +
      nifNumbers[6] * 3 +
      nifNumbers[7] * 2;
    const modulo11 = (Number(total) % 11);
    const checkDigit = modulo11 < 2 ? 0 : 11 - modulo11;
    this.validatorNIF = false;
    return checkDigit === Number(nif[8]);
    }
  }



  validateEmail(email) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regexEmail)) {
      console.log(email, 'Passou')
      this.validatorEmail = false;
    } else {
      this.validatorEmail = true;
    }
    if (email.length === 0) {
      this.validatorEmail = false;
    }
  }



  client: FormGroup = new FormGroup({

    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(9)]),
    nif: new FormControl('', [Validators.required, Validators.maxLength(9)])
  })

  contactDetail: FormGroup = new FormGroup({


    phone: new FormControl('', [Validators.required, Validators.maxLength(9)]),
    email: new FormControl('', Validators.required),

  })



  receiptClients: FormGroup = new FormGroup({

    valueReceipt: new FormControl('', Validators.required),
  })



  DetailsOrderFrom: FormGroup = new FormGroup({

    firstNameClient: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    lastNameClient: new FormControl('', Validators.required),
    paymentMethod: new FormControl('', Validators.required),
    productsChoose: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(9)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(9)])
  })



  getColor(id) {
    // console.log(id, '2')
    switch (id) {
      case '23d91faf-d13d-42b0-902b-2de5d49a31ee':
        return 'orange';
      case '28b097a1-2834-4c9f-b1c6-6b2f316401af':
        return '#00FFEF';
    }
  }


  // handleBackButton() {
  //   console.log('entrou no back')
  //   const currentPage = this.router.url;
  //   console.log(currentPage, 'Pagina');
  //   return this.router.navigate([currentPage]);

  // }


  //




  //


}

