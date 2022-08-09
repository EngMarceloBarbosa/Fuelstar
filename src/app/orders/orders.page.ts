import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TasksService } from '../shared/services/tasks.service';
import { Client, clients } from '../shared/models/order-list-clients';
import { TouchSequence } from 'selenium-webdriver';
import { TaskApiService } from '../shared/http/task-api.service';
import { ContactsTaskService } from '../shared/http/contactsTask-api.service';

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
  selectedItem: any;





  constructor(private nav: NavController, private loc: Location, public formBuilder: FormBuilder, private router: Router, private tasksService: TasksService, public taskApiService: TaskApiService, private contactsTaskService: ContactsTaskService) { }

  async ngOnInit() {
    await this.contactsTaskService.getEntities().then(res => {
      console.log(res)
      this.tasksService.listClients = res;
      // this.tasksService.listTasks$.next(this.listTasks);
    })
    this.tasksService.allDocumentsFilter = this.tasksService.listClients



  }

  selectedItemList(item: any) {

    this.tasksService.allDocumentsFilter = this.tasksService.listClients.map((element) => {
      return {
        ...element,
        iconCheck: element.id === item.id
      }
    });
    this.selectedItem = this.tasksService.allDocumentsFilter.filter(item => item.iconCheck == true);

    console.log(this.selectedItem)
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
    this.continue1 = false;
    this.active = true;
    console.log(this.tasksService.listClients);
  }


  continueProcess() {
    this.router.navigate(['/orders']);
  }

  addProducts() {
    this.router.navigate(['/products']);
  }

  back() {

    this.continue1 = true;
  }

  change(event, id) {
    console.log(event, id);
    if (id == 1) {
      this.tasksService.valueFirstName = event;
    }
    if (id == 2) {
      this.tasksService.valueLastName = event;
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

  save() {


    // let form = {

    //   firstName: this.tasksService.valueFirstName,
    //   lastName: this.tasksService.valueLastName,
    //   nif:this.tasksService.valueNif,
    //   email:this.tasksService.valueEmail,
    //   phoneNumber: this.tasksService.valuePhoneNumber,

    // };

    let form = new FormData();
    form.append('FirstName', this.tasksService.valueFirstName);
    form.append('LastName', this.tasksService.valueLastName);
    form.append('Nif', this.tasksService.listContacts[0]?.contactId);
    form.append('Email', this.tasksService.listContacts[0]?.contactName);
    form.append('PhoneNumber', this.tasksService.listContacts[0]?.value);


    console.log(this.tasksService.clientFields);


    console.log(this.tasksService.croudGroup)
    this.contactsTaskService.addClient(form).then(res => {
  this.tasksService.listClients = res;

        console.log(this.tasksService.listEntitys, "entidades")
      })


    if (this.tasksService.croudGroup) {
      // this.tasksService.listClients.push(form)
    }
  }

  clean() {
    console.log(this.selectedItem.id);
    this.contactsTaskService.deleteClient(this.selectedItem[0].id).then(res => {
    this.selectedItem = res;
    this.selectedItem = [];

      console.log(this.tasksService.listEntitys, "entidades")
    })

    console.log(this.selectedItem)
    if(this.selectedItem == true) {
    this.tasksService.allDocumentsFilter.slice(this.selectedItem);
    }


  }


}
