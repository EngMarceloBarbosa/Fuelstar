import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TasksService } from '../shared/services/tasks.service';
import { Client, clients } from '../shared/models/order-list-clients';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  allDocumentsFilter: any;
  tempDocuments: any;
  active: boolean = true;
  continue: boolean = true;
  iconCheck: boolean = false;
  isOnActionButtons: boolean = true;
  valueIcon: string;
  valueReference: string;
  valueId: number;
  valueFirstName: string;
  valueLastName: string;
  valueNif: number;
  valueEmail: string;
  valuePhoneNumber: number;
  valueIconCheck: boolean;
  searchValue: string = "";
  selectedItem: any;
  listClient = clients;



  constructor(private nav: NavController, private loc: Location, public formBuilder: FormBuilder, private router: Router, private tasksService: TasksService) { }

  ngOnInit() {

  }

  selectedItemList(item: any) {
    this.listClient.forEach((element) => {
      element.iconCheck = false;
      return element;
    });

    this.selectedItem = item;
    item.iconCheck = true;
  }

  // selectedItemList(item: any) {

  //   this.selectedItem = item;
  //   item.iconCheck = !item.iconCheck;
  // }


  //  selectedItemList(item) {
  //   this.(tua_lista).map((elem) => {
  //     elem.iconCheck = false;
  //     return elem;
  //   });

  //   item.iconCheck = true;
  //   this.selectedItem = item;
  //   item.iconCheck = true;
  //   this.nextButtonDisabled = false;
  // }



  close() {
    this.loc.back();
  }



  clientButton() {
    console.log("Entrou client");
    this.active = true;
    // this.isOnActionButtons = false;
    console.log(this.isOnActionButtons);
  }
  newClientButton() {
    this.active = false;
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

    const temp = this.tasksService.croudGroup.getRawValue();
    let form = {
      icon: temp.icon ? temp.icon.trim() : this.valueIcon,
      reference: temp.reference ? temp.email.trim() : this.valueReference,
      id: temp.id ? temp.id.trim() : this.valueId,
      firstName: temp.firstName ? temp.firstName.trim() : this.valueFirstName,
      lastName: temp.lastName ? temp.lastName.trim() : this.valueLastName,
      nif: temp.nif ? temp.nif : this.valueNif,
      email: temp.email ? temp.email.trim() : this.valueEmail,
      phoneNumber: temp.phoneNumber ? temp.phoneNumber : this.valuePhoneNumber,
      iconCheck: temp.iconCheck ? temp.iconCheck.trim() : this.valueIconCheck,
    };
    console.log(this.tasksService.croudGroup.getRawValue());
    console.log(this.selectedItem);
    if (!this.selectedItem) {
      this.continue = true;
      console.log("entrou no Conitue")
    } else {
      console.log("entrou no lol")
      this.continue = false;
    }
    if (this.tasksService.croudGroup) {
      this.listClient.push(form)

    }
    console.log(this.listClient);
  }


  continueProcess() {
    this.router.navigate(['/orders']);
  }

  addProducts() {
    this.router.navigate(['/products']);
  }

  back() {

    this.continue = true;
  }

  change(event, id) {
    console.log(event, id);
    if (id == 1) {
      this.valueFirstName = event;
    }
    if (id == 2) {
      this.valueLastName = event;
    }
    if (id == 3) {
      this.valueNif = event;
    }
    if (id == 4) {
      this.valueEmail = event;
    }
    if (id == 5) {
      this.valuePhoneNumber = event;
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
    if ($event == '') {
      this.allDocumentsFilter = this.listClient;
    } else {
      this.allDocumentsFilter = this.listClient.filter(
        doc =>
          doc.firstName?.toLowerCase().includes($event.toLowerCase())
      );
    }
  }


}
