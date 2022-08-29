import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { clients } from '../shared/models/order-list-clients';
import { TasksService } from '../shared/services/tasks.service';

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

  constructor(private router: Router, private nav: NavController, private loc: Location, public formBuilder: FormBuilder, public tasksService:TasksService) { }

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

    this.tasksService.allDocumentsFilter = this.tasksService.listClients.map((element) => {
      return {
        ...element,
        iconCheck: element.id === item.id
      }
    });
    this.tasksService.selectedItem = this.tasksService.allDocumentsFilter.filter(item => item.iconCheck == true);

    console.log(this.tasksService.selectedItem)
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

  close(){
    this.router.navigate(['/tabs/tab2']);
  }

}


