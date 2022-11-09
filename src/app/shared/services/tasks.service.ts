import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsTab } from '../models/clients-tab1';
import { ContactsTaskService } from '../http/contactsTask-api.service';
import { Contacts, Entity, IdentityDocuments, Instance, InstancePatch, Items, PaymentMethods, Tasks } from 'src/app/utils/models/tasks';
import { ItemApiService } from '../http/item-api.service';





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
  listTasksItemId:any;
  quantityTotal: any;
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
  //   newClientForm: FormGroup =  new FormGroup({
  //   firstName: new FormControl(this.valueFirstName),
  //   lastName: new FormControl(null),
  //   identityDocumentId: new FormControl(null),
  //   contactId: new FormControl(null),
  //   value: new FormControl(null)
  // }
  // )

  constructor(private http: HttpClient, private contactApiService: ContactsTaskService, public itemApiService: ItemApiService) {


  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

   this.today = new Date();
  var dd = String(this.today.getDate()).padStart(2, '0');
  var yyyy = this.today.getFullYear();

  this.today = dd + '/' + monthNames[this.today.getMonth()] + '/' + yyyy;
  console.log(this.today)
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
      note: this.notes.detail.value
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




  //



  //


}

