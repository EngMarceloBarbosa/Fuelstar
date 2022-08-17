import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetModel, ActionSheetService } from '@nc-angular/library-mobile.stg';
import { TranslateService } from '@ngx-translate/core';
import { TasksService } from '../shared/services/tasks.service';
import { ContactsTaskService } from '../shared/http/contactsTask-api.service';
import { Contacts, Entity, Tasks } from '../utils/models/tasks';
import { TaskApiService } from '../shared/http/task-api.service';

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
  idTask: any;
  noteTask: Entity;
  entityId: Entity;
  listTasksAll: any;
  NewListTest: any;


  constructor(private translate: TranslateService, public tasksService: TasksService, private router: Router, private actionSheetService: ActionSheetService, private contactsTaskService: ContactsTaskService, public taskApiService: TaskApiService,) { }

  ngOnInit() {


    this.tasksService.infoClient$
      .subscribe(client => {
        this.clientDetails = client;
      })

      // this.tasksService.listTasks$
      // .subscribe(listTasks => {
      //  this.listTasksAll = listTasks
      // })


    this.contactsTaskService.getContactById(this.clientDetails.entity.id).then(res => {
      console.log('resultado', res)
      this.tasksService.listContacts = res;
      this.tasksService.idContact = this.tasksService.listContacts[0].id
      this.tasksService.idContactId = this.tasksService.listContacts[0].contactId
      this.tasksService.idEntityId = this.tasksService.listContacts[0].entity.id

      console.log(this.tasksService.idContact)
    })

    this.contactsTaskService.getEntityHeader(this.clientDetails.entity.id).then(res => {
      console.log('resultado', res)
      this.tasksService.listEntitys = res;
      console.log(this.tasksService.listEntitys, "entidades")
    })

    this.contactsTaskService.getAddressById(this.clientDetails.id).then(res => {
      console.log(res, 'Nota')
      this.tasksService.listTasksById = res;
      console.log(this.tasksService.listTasksById.address.addressLine1, "Tarefas id")
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
    this.tasksService.notes = "";
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


  modelChangeFn(e) {
    this.tasksService.notes = e;
    console.log(this.tasksService.notes);

  }

  close() {
    this.onNotes = true;
  }

  done() {


    this.tasksService.countVisits = this.tasksService.countVisits -1  ;
    this.tasksService.countsToDo = this.tasksService.countsToDo + 1;
   this.router.navigate(['tabs/tab1']);

  }
  save() {
    this.tasksService.addNotes();
    this.onNotes= true;
  }
}
