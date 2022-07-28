import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetModel, ActionSheetService } from '@nc-angular/library-mobile.stg';
import { TranslateService } from '@ngx-translate/core';
import { TasksService } from '../shared/services/tasks.service';
import { ContactsTaskService } from '../shared/http/contactsTask-api.service';
import { Contacts, Entity } from '../utils/models/tasks';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.page.html',
  styleUrls: ['./details-client.page.scss'],
})
export class DetailsClientPage implements OnInit {



  globalMessagesTranslations: any;
  loginMessagesTranslations: any;
  productsMessagesTranslations: any;
  clientDetails: any;
  onNotes: boolean = true;
  value: any;
  @Input() prop: number = 0;
  listContacts: Contacts[] = [];
  entityId : Entity


  constructor(private translate: TranslateService, private tasksService: TasksService, private router: Router, private actionSheetService: ActionSheetService, private contactsTaskService: ContactsTaskService) { }

  ngOnInit() {


        this.tasksService.infoClient$
          .subscribe(client => {
            this.clientDetails = client;
          })


      this.contactsTaskService.getContactById(this.clientDetails.entity.id).then(res => {
        console.log('resultado', res)
        this.listContacts = res;
        this.tasksService.idContact = this.listContacts[0].id
        this.tasksService.idContactId = this.listContacts[0].contactId
        this.tasksService.idEntityId = this.listContacts[0].entity.id
       console.log(this.listContacts)
      })

  }



  clickTab(event: any) {

  }

  editContact() {
    this.tasksService.infoClient$.next(this.clientDetails)
    this.router.navigate(["/edit-contact"])
  }

  cancel() {
    this.router.navigate(["/tabs/tab1"]);
  }

  options() {
    const temp: ActionSheetModel = {
      titleText: "OPÇÕES",
      titleTextColor: 'c-scale-12',
      titleTextSize: 'large',
      iconHeader: 'icon_options',
      iconHeaderSize: 16,
      iconHeaderColor: 'c-scale-12',
      rightButtonShow: true,
      rightButtonText: 'Aplicar filtros',
      rightButtonColor: 'primary',

    };

    this.actionSheetService.open(temp);
  }

  notes() {
    this.onNotes = false;
  }

  closeNotes() {

  }

  close() {
    this.onNotes = true;
  }

  done() {
    this.router.navigate(["/tabs/tab1"])
  }

}
