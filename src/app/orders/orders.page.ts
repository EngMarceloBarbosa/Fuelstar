import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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

  selectedItem: any;
  listClient = [
    {
      icon: "icon_user",
      name: "Marcelo",
      id: 1,
      iconCheck : false
    },
    {
      icon: "icon_user",
      name: "Berto panasca",
      id: 2,
      iconCheck : false
    },
    {
      icon: "icon_user",
      name: "Rega",
      id: 3,
      iconCheck : false
    },
    {
      icon: "icon_user",
      name: "Tone",
      id: 4,
      iconCheck : false
    },
    {
      icon: "icon_user",
      name: "Dias",
      id: 5,
      iconCheck : false
    },
    {
      icon: "icon_user",
      name: "Coito",
      id: 5,
      iconCheck : false
    },
    {
      icon: "icon_user",
      name: "Carlos",
      id: 5,
      iconCheck : false
    },


  ]



  constructor(private nav: NavController, private loc: Location, public formBuilder: FormBuilder, private router: Router) { }

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

  /*
 * Document Filter in searchBar
 */
  searchDocument($event: string) {
    if ($event == '') {
      this.allDocumentsFilter = this.tempDocuments;
    } else {
      this.allDocumentsFilter = this.tempDocuments.filter(
        doc =>
          doc.entity.firstName?.toLowerCase().includes($event.toLowerCase()) ||
          doc.instanceNumber?.toLowerCase().includes($event.toLowerCase()) ||
          doc.unlinkedTransactionDescription?.toLowerCase().includes($event.toLowerCase()) ||
          doc.dueAmount.toString().includes($event) ||
          doc.debit.toString().includes($event) ||
          doc.credit.toString().includes($event) ||
          doc.transactionDate.toString().includes($event)
      );
    }
  }

  /*
   * Cancel search button on the searchBar
   */
  // cancelSearchDoc($event) {
  //   this.currentAccountService.existFilter = false;
  //   if ($event) this.allDocumentsFilter = this.tempDocuments;
  // }

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

  continueButton(){
    console.log(this.selectedItem);
    if(!this.selectedItem ) {
      this.continue = true;
      console.log("entrou no Conitue")
    }else {
      console.log("entrou no lol")
      this.continue = false;
    }
  }


  continueProcess(){
    this.router.navigate(['/orders']);
  }

  addProducts(){
    this.router.navigate(['/products']);
  }

  back(){

  this.continue = true;
  }
}
