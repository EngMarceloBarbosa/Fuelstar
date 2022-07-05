import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { clients } from '../shared/models/order-list-clients';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.page.html',
  styleUrls: ['./receipts.page.scss'],
})
export class ReceiptsPage implements OnInit {

  @ViewChild('formElement', { static: false }) formElement: NgForm;
  @ViewChild('inputEmail') inputEmail: ElementRef;

  allDocumentsFilter: any;
  listClient = clients;
  alertMessagesTranslations: any;
  form: FormGroup;
  searchValue: string = "";
  selectedItem: any;

  constructor(private router: Router, private nav: NavController, private loc: Location, public formBuilder: FormBuilder) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          // Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[a-z]{2,4}$|^[0-9]{16}$|^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[a-z]{2,4}/[A-Za-zA-Z0-9]+$|^[0-9]{16}/[a-zA-Z0-9]+$')
        ]
      ]
    });
  }

  selectedItemList(item: any) {
    this.listClient.forEach((element) => {
      element.iconCheck = false;
      return element;
    });

    this.selectedItem = item;
    item.iconCheck = true;
  }

  get email() {
    return this.form.get('email');
  }

  signInClick() {
    // this.loading = 'loading';

    const authentication = {
      username: this.email.value,
      productId: '00000000-0000-0000-0000-000000000003'
    };

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

  close(){
    this.router.navigate(['/tabs/tab2']);
  }

}


