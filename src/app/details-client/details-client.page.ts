import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetModel, ActionSheetService } from '@nc-angular/library-mobile.stg';
import { TranslateService } from '@ngx-translate/core';
import { TasksService } from '../shared/services/tasks.service';
import { ContactsTaskService } from '../shared/http/contactsTask-api.service';
import { Contacts, Entity, Tasks } from '../utils/models/tasks';
import { TaskApiService } from '../shared/http/task-api.service';
import { CallNumber } from 'capacitor-call-number';

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

  @ViewChild('search') myInput;


  constructor(private translate: TranslateService, public tasksService: TasksService, private router: Router, private actionSheetService: ActionSheetService, private contactsTaskService: ContactsTaskService, public taskApiService: TaskApiService) {

  }

  ngOnInit() {

    this.tasksService.infoClient$
      .subscribe(client => {
        this.clientDetails = client;
      })

    // this.tasksService.listTasks$
    // .subscribe(listTasks => {
    //  this.listTasksAll = listTasks
    // })

    console.log(this.clientDetails)


    this.contactsTaskService.getContactById(this.clientDetails.entity.id).then(res => {
      console.log('resultado', res)
      this.tasksService.listContacts = res;
      console.log(this.tasksService.listContacts[0].id)
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

  notes() {

    setTimeout(() => {
      console.log('PASSOU')
      this.myInput.setFocus();
    }, 150);

    this.onNotes = false;
  }

  getFocustxt() {
    document.getElementById("search").focus;
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


  closeNotes() {

  }


  modelChangeFn(e) {
    this.tasksService.notes = e;
    console.log(this.tasksService.notes);

  }

  close() {
    this.onNotes = true;
  }

     done(task) {
    console.log(this.tasksService.visiteToDo)
    console.log(task)

    this.tasksService.visiteToDo = this.tasksService.visiteToDo.filter(elem => elem.id != task.id)

    let index = this.tasksService.visiteEfected.findIndex(el => el.id === task.id);

    if (index < 0) {
      this.tasksService.visiteEfected = [...this.tasksService.visiteEfected, task]
    }
    // console.log(index)
    //      if(index > -1){
    //       this.tasksService.visiteEfected = this.tasksService.visiteEfected.splice(task)

    //      }else {
    //       this.tasksService.visiteToDo
    //      }



    // console.log(task)
    // //  this.tasksService.listTasks.map(ele => {

    // //   if( ele.id == task   ) {
    // console.log(this.tasksService.checkList)


    // const index = this.tasksService.visiteToDo.findIndex(el => task.id === el.id);

    // console.log(index)
    // if (index > -1) {
    //   console.log('Não dá')
    //    this.tasksService.visiteToDo = this.tasksService.visiteToDo.splice(index, 1)
    //    this.tasksService.visiteEfected = this.tasksService.visiteToDo.push(index, 1)
    // }
    // else {
    //   this.tasksService.countVisits = this.tasksService.countVisits - 1;
    //   this.tasksService.countsToDo = this.tasksService.countsToDo + 1;
    //   console.log(task)
    //   this.tasksService.checkList.push(task)
    //   this.tasksService.control = true;
    //   if (this.tasksService.control == true) {
    //     const box = document.getElementById('box-task-header');

    //   }
    // }
    // console.log(this.tasksService.checkList)
    // console.log( this.tasksService.visiteEfected )
    // console.log( this.tasksService.visiteToDo)

    console.log(this.tasksService.listTasks1[0].item.name, 'EEEENTTTRRROOU')
    this.tasksService.countsToDo = this.tasksService.visiteEfected.length;
    this.tasksService.countVisits = this.tasksService.visiteToDo.length;

    if(this.tasksService.visiteToDo.length === 0){
      this.tasksService.turnMsgAlertTask = true;
      this.tasksService.msgAlertTasks = "Não existe mais tarefas"
    }else {
      this.tasksService.turnMsgAlertTask = false;
    }


    this.router.navigate(['tabs/tab1']);
    console.log([...this.tasksService.visiteEfected], "EFETUADAS")
    console.log([...this.tasksService.visiteToDo], "POR fazer")


  }



  save() {
    this.tasksService.addNotes();
    this.onNotes = true;
  }

  async call() {
    this.tasksService.listContacts[0]?.value
    await CallNumber.call({ number: this.tasksService.listContacts[0]?.value, bypassAppChooser: false });
  }
}
