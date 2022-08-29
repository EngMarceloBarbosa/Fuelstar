import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TasksService } from '../shared/services/tasks.service';
import { TaskApiService } from '../shared/http/task-api.service';
import { ContactsTaskService } from '../shared/http/contactsTask-api.service';
import { TouchSequence } from 'selenium-webdriver';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {


  tempDocuments: any;
  active: boolean = true;
  continue1: boolean = true;
  iconCheck: boolean = false;
  isOnActionButtons: boolean = true;
  valueIcon: string;
  valueReference: string;
  valueId: number;
  valueIconCheck: boolean;
  searchValue: string = "";

  msgErro: any;
  msgErroCheck : boolean = false;
  msgErroLastname: any;
  msgErroCheckLastName:boolean = true;
  msgErroFields:boolean = false;
  alertMessage:any = "NIF inválido"
  alertMessage1:boolean = false;




  constructor(private nav: NavController, private loc: Location, public formBuilder: FormBuilder, private router: Router, private tasksService: TasksService, public taskApiService: TaskApiService, private contactsTaskService: ContactsTaskService) { }

  async ngOnInit() {
    // await this.contactsTaskService.getEntities().then(res => {
    //   console.log(res)
    //   this.tasksService.listClients = res;
    //   // this.tasksService.listTasks$.next(this.listTasks);
    // })
    // this.tasksService.allDocumentsFilter = this.tasksService.listClients



  }

  selectedItemList(item: any) {

    this.tasksService.allDocumentsFilter = this.tasksService.listClients.map((element) => {
      return {
        ...element,
        iconCheck: element.id === item.id
      }
    });
    this.tasksService.selectedItem = this.tasksService.allDocumentsFilter.filter(item => item.iconCheck == true);

    console.log(this.tasksService.selectedItem)
  }


  close() {
    this.router.navigate(['/tabs/tab2']);
  }



  clientButton() {
    console.log("Entrou client");
    this.active = true;
    // this.isOnActionButtons = false;
    console.log(this.isOnActionButtons);
  }
  newClientButton() {
    this.active = false;
    // this.continue = false;
    // this.isOnActionButtons = false;
    console.log("Entrou new client");
  }

  // async createBullet() {
  //   console.log(this.tasksService.croudGroup.getRawValue());
  //   const temp = this.tasksService.croudGroup.getRawValue();
  //   let form = {
  //     firstName: temp.firstName ? temp.firstName.trim() : null,
  //     lastName: temp.lastName ? temp.lastName.trim() : null,
  //     nif: temp.nif ? temp.nif : null,
  //     email: temp.email ? temp.email.trim() : null,
  //     phoneNumber: temp.phoneNumber ? temp.phoneNumber : null,
  //   };
  //   // if (this.bulletService.crudGroup.valid) {
  //   //   this.bulletAPIService
  //   //     .put(form)
  //   //     .then( () => {
  //   //       this.initalHttpRequest();
  //   //     })
  //   //     .catch((error: HttpErrorResponse) => {
  //   //       console.log(error);
  //   //     });
  //   //   } else {
  //   //     console.log('campo obrigatorio : name');
  //   //   }
  // }



  continueButton() {
    if (this.tasksService.selectedItem == null) {

    } else {
      this.continue1 = false;
      this.active = true;
      console.log(this.tasksService.listClients);
    }
  }


  continueProcess() {
    this.router.navigate(['/orders-details']);
  }

  addProducts() {
    this.router.navigate(['/products']);
  }

  back() {

    this.continue1 = true;
  }

  change(event, id) {
    console.log(event, id);
    // if (id == 1 && event.length > 7) {
    //   this.msgErro = "Só pode ter 7 carateres"
    //   console.log(this.msgErro)
    //   this.msgErroCheck = true;

      if(id == 1 && event.length == 0){

      }
      if(id == 1 && event.length != 0){
      this.tasksService.valueFirstName = event;
      this.msgErroCheck= false;
      this.msgErroFields = false;
    }
    if (id == 2 && event == "") {

      this.msgErroCheckLastName = true;

    }if( id == 2 && event != "") {
      this.tasksService.valueLastName = event;
      this.msgErroFields = false
      this.msgErroCheckLastName= false;
    }
    if (id == 3) {
      this.tasksService.valueNif = event;
    }
    if (id == 4) {
      this.tasksService.valueEmail = event;
    }
    if (id == 5) {
      this.tasksService.valuePhoneNumber = event;
    }
    // this.valueNif = event, 'nif';
    // this.valueEmail = event, 'email';
    // this.valuePhoneNumber = event, 'phoneNumber';
    // this.valueIcon = event;
    // this.valueReference = event;
    // this.valueId = event;
    // this.valueIconCheck= event;
  }

  searchDocument($event: string) {
    console.log($event)
    if ($event.length == 0) {
      this.tasksService.allDocumentsFilter = this.tasksService.listClients;
    } else {
      this.tasksService.allDocumentsFilter = this.tasksService.listClients.filter(
        doc =>
          doc.firstName?.trim().toLowerCase().includes($event.trim().toLowerCase()) ||
          doc.lastName?.trim().toLowerCase().includes($event.trim().toLowerCase())
      );

    }
  }

  async save() {


    console.log(this.tasksService.valueFirstName)
    console.log(this.tasksService.valueEmail)
    console.log(this.tasksService.valueLastName)
    console.log(this.tasksService.valuePhoneNumber)
    console.log(this.tasksService.valueNif)



    if (this.tasksService.valueFirstName == "" || this.tasksService.valueEmail == "" || this.tasksService.valueLastName == "" || this.tasksService.valueNif == "" || this.tasksService.valuePhoneNumber == "" ) {
      this.msgErroFields = true;
      this.msgErroLastname = "Campo Obrigatório"
      return;

    } else {
      console.log("ENTROU NO ADD")
      this.msgErroFields = false;
      console.log(this.tasksService.listContacts[0]?.contactId);
      let form = new FormData();

      form.append('FirstName', this.tasksService.valueFirstName);
      form.append('LastName', this.tasksService.valueLastName);
      form.append('IdentityDocuments[0].value', this.tasksService.valueNif)
      form.append('IdentityDocuments[0].IdentityDocumentId', "00000000-0001-0000-0000-000000000001");
      form.append('Contact[0].ContactId', "00000000-0007-0000-0000-000000000012");
      form.append('Contact[0].Value', this.tasksService.valueEmail);
      form.append('Contact[1].ContactId', "00000000-0007-0000-0000-000000000001");
      form.append('Contact[1].Value', this.tasksService.valuePhoneNumber);
      form.append('CountryId', "00000000-0032-0000-0000-000000000033");
      form.append('IdentityDocuments[0].countryId', "00000000-0032-0000-0000-000000000033");
      form.append('IdiomId', "00000000-0036-0000-0000-000000000001");






      console.log(this.tasksService.clientFields);


      console.log(this.tasksService.croudGroup)

      await this.contactsTaskService.verifyNif(form).then(res => {
        this.tasksService.verifyEntity = res;
        console.log(   this.tasksService.verifyEntity)

      })
      if(this.tasksService.verifyEntity.length === 0) {
 console.log(this.tasksService.verifyEntity.length )
      this.contactsTaskService.addClient(form).then(res => {
        this.tasksService.listClients = res;


      })
      await this.contactsTaskService.getEntities().then(res => {
        console.log(res)
        this.tasksService.listClients = res;
        // this.tasksService.listTasks$.next(this.listTasks);
      })
      this.tasksService.allDocumentsFilter = this.tasksService.listClients;

      console.log(this.tasksService.list)

      this.active = true;
      this.tasksService.valueFirstName = "";
      1
    }else {
this.msgErro = 'ERRO';
this.alertMessage1 = true;
console.log(   this.tasksService.verifyEntity)

    }


    }
    // if (this.tasksService.croudGroup) {
    //   // this.tasksService.listClients.push(form)
    // }
  }

  async clean() {
   await this.contactsTaskService.deleteClient(this.tasksService.selectedItem[0].id).then(res => {
 console.log(res)
      this.tasksService.listClients = res;

      console.log(     this.tasksService.listClients )
      this.tasksService.selectedItem = [];

      console.log(this.tasksService.listEntitys, "entidades")
    })


   await this.contactsTaskService.getEntities().then(res => {
      console.log(res)
      this.tasksService.listClients = res;
      // this.tasksService.listTasks$.next(this.listTasks);
    })
    this.tasksService.allDocumentsFilter = this.tasksService.listClients;

  }

  goBack() {
    this.active = true;
  }

}
