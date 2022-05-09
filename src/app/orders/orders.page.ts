import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  allDocumentsFilter: any;
  tempDocuments: any;
  active:boolean = true;
  iconCheck: boolean = false;
  selectedItem:any;
  listClient=[
{
  icon: "icon_user",
  name : "Marcelo",
  id : 1,
  // iconCheck : false
},
{
  icon: "icon_user",
  name : "João",
  id : 2,
  // iconCheck : false
},
{
  icon: "icon_user",
  name : "Diogo",
  id : 3,
  // iconCheck : false
},
{
  icon: "icon_user",
  name : "Hugo",
  id : 4,
  // iconCheck : false
},
{
  icon: "icon_user",
  name : "Carlos",
  id : 5,
  // iconCheck : false
}


  ]



  constructor(private nav: NavController,  private loc: Location, public formBuilder: FormBuilder) { }

  ngOnInit() {
  }


  selectedItemList(item:any) {
     (this.listClient).map((elem) => {
     this.iconCheck = false;
     this.selectedItem = item;
     return elem;
    });

    item.iconCheck = true;
    this.iconCheck = true;




    console.log(item.iconCheck);
    console.log(this.iconCheck);



    if(this.iconCheck == true) {
      console.log("entrou iconcheck")
      this.iconCheck = false;


    }


  }

  close(){
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

    clientButton(){
      console.log("Entrou client");
      this.active = true;
    }
    newClientButton(){
      this.active = false;
      console.log("Entrou new client");
    }
}
