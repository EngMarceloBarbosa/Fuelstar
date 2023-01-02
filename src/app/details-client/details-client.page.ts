import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetModel, ActionSheetService, AlertService, ModalMessageModel } from '@nc-angular/library-mobile.stg';
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


  @ViewChild('action3', { static: false }) action3


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
  listAll: any;
  turnDocuments = false;

  @ViewChild('search') myInput;
  showContent = true;

  constructor(private translate: TranslateService, public tasksService: TasksService, private router: Router, private actionSheetService: ActionSheetService, private contactsTaskService: ContactsTaskService, public taskApiService: TaskApiService, private alertService: AlertService, public contactApiService: ContactsTaskService) {



  }

  async ngOnInit() {




    await this.tasksService.infoClient$
      .subscribe(client => {
        this.clientDetails = client;
      })

    // this.tasksService.listTasks$
    // .subscribe(listTasks => {
    //  this.listTasksAll = listTasks
    // })

    console.log(this.clientDetails)


   await this.contactsTaskService.getContactById(this.clientDetails.entity.id).then(res => {
      console.log('resultado', res)
      this.tasksService.listContacts = res;
      console.log(this.tasksService.listContacts[0].id)
      this.tasksService.idContact = this.tasksService.listContacts[0].id
      this.tasksService.idContactId = this.tasksService.listContacts[0].contactId
      this.tasksService.idEntityId = this.tasksService.listContacts[0].entity.id

      console.log(this.tasksService.idContact)
    })

    await this.contactsTaskService.getEntityHeader(this.clientDetails.entity.id).then(res => {
      console.log('resultado', res)
      this.tasksService.listEntitys = res;
      console.log(this.tasksService.listEntitys, "entidades")
    })

    // await  this.contactsTaskService.getAddressById(this.clientDetails.id).then(res => {
    //     console.log(res, 'Nota')
    //     this.tasksService.listTasksById = res;
    //     console.log(this.tasksService.listTasksById.address.addressLine1, "Tarefas id")
    //   })

    console.log(this.tasksService.listTasksById)
    await this.taskApiService.getTypesBulletsStateTask(this.tasksService.selectedTask.bulletId).then(res => {
      this.tasksService.typesStatesBullets = res
      console.log(this.tasksService.typesStatesBullets, 'Subestados dos Tipos de estado')


    })

    await this.contactApiService.getNotesInstance(this.tasksService.selectedTask).then((res) => {
      // console.log(res)
      this.tasksService.notesTask = res
      console.log(this.tasksService.notesTask)
      this.tasksService.notesTask.tasks
      console.log(   this.tasksService.notesTask.tasks
        )

    })

      // await this.tasksService.notesTask.map((res) => {
      //   this.tasksService.notesTasks = res
      //   console.log(this.tasksService.notesTasks)
      // })





    console.log(this.tasksService.notesTask.tasks?.[0]?.note)

    console.log(this.tasksService.notesTask, 'NOTAS DOS POSTS')
    console.log(this.tasksService.notesTask.id)
    // console.log(this.notesTask.tasks[0].note)









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
    this.router.navigate(["tabs/tab1"]);
    this.tasksService.notes = "";
    this.tasksService.msgWarningExecuted  = false;
  }

  cancelTask() {
    // this.router.navigate(["/tabs/tab1"]);
    const temp: ModalMessageModel = {
      showTip: false,
      title: "Quer continuar ?",
      description: "Ao continuar vai cancelar a tarefa",
      state: "warning",
      leftButtonSize: "small",
      leftButtonType: "text",
      leftButtonText: "Voltar",
      showMiddleButton: false,
      rightButtonSize: "small",
      rightButtonType: "text",
      rightButtonText: "Cancelar",
      rightButtonTesterProperty: "clickLeaveApp",
      rightButtonColor: "c-scale-12",
      rightButtonCallback: () => {
        this.buttonCancelled();
      },
    };
    this.alertService.open(temp);


    this.tasksService.notes = "";
  }

  async buttonCancelled() {

    await this.tasksService.putTaskCancelled();
    await this.taskApiService.getTypesStateTask();

    if (this.tasksService.listTasksFinalized.length === 0) {
      this.tasksService.turnMsgAlertTask1 = true;
      this.tasksService.msgAlertTasks1 = "Ainda não se encontram tarefas concluídas"
    } else {
      this.tasksService.turnMsgAlertTask1 = false;
    }

    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length

    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res;
      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    await this.taskApiService.getTasksItemIdAtribuited().then(res => {
      this.tasksService.listTasks1 = res;
      // this.tasksService.visiteToDo = this.tasksService.listTasks1
      // this.tasksService.visiteToDo1 = this.tasksService.listTasks1.map(res => res.currentStatus)
      // this.tasksService.visiteToDo = this.tasksService.visiteToDo1.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      // console.log(      this.tasksService.visiteToDo)
      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')
      // this.tasksService.countVisits = this.tasksService.visiteToDo.length
      // console.log(this.tasksService.countVisits)
      // this.tasksService.countsToDo = this.tasksService.listTasks1.length - this.tasksService.countVisits


    })

    this.tasksService.visiteToDo = this.tasksService.listTasks1.concat(this.tasksService.listTasks2)
    console.log(this.tasksService.visiteToDo, 'lista final')


    console.log(this.tasksService.visiteToDo)
    console.log(this.tasksService.listTasks1)
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length
    console.log(this.tasksService.visiteToDo, 'pq0')
    this.tasksService.getColor(this.tasksService.selectedTask.id);


    this.router.navigate(['/tabs/tab1']);




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

    this.action3.open(temp);
  }


  closeNotes() {

  }


  modelChangeFn(e) {
    this.tasksService.notes = e;
    console.log(this.tasksService.notes);

  }

  close() {
    this.onNotes = true;
    this.tasksService.turnMessageCreateEdit = false;
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

    // console.log(this.tasksService.listTasks1[0].item.name, 'EEEENTTTRRROOU')
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length
    this.tasksService.countsToDo = this.tasksService.visiteToDo.length


    if (this.tasksService.visiteToDo.length === 0) {
      this.tasksService.turnMsgAlertTask = true;
      this.tasksService.msgAlertTasks = "Não existe mais tarefas"
    } else {
      this.tasksService.turnMsgAlertTask = false;
    }


    if (this.tasksService.visiteEfected.length === 0) {
      this.tasksService.turnMsgAlertTask1 = true;
      this.tasksService.msgAlertTasks1 = "Ainda não se encontram tarefas concluídas"
    } else {
      this.tasksService.turnMsgAlertTask1 = false;
    }


    this.router.navigate(['/tabs/tab1']);
    console.log([...this.tasksService.visiteEfected], "EFETUADAS")
    console.log([...this.tasksService.visiteToDo], "POR fazer")


  }

  postNote() {
    this.router.navigate(["/post-notes"])

  }

  editPost(task){
    console.log(task)
    this.tasksService.selectedPost = task
    this.onNotes = false;

    console.log(this.tasksService.selectedTask.id)
  }



  save(task) {


    if(task.currentStatus.id == "e6875497-3ad4-4121-b3aa-4efde5d12fb1"){
      return this.tasksService.turnMessageCreateEdit = true;
    }else {
      this.tasksService.timeHours();
      console.log(this.tasksService.selectedPost)
      this.tasksService.addNotes(this.tasksService.selectedPost);
      this.onNotes = true;
    }




  }

  async call() {
    this.tasksService.listContacts[0]?.value
    await CallNumber.call({ number: this.tasksService.listContacts[0]?.value, bypassAppChooser: false });
  }

  locationMaps() {

    this.router.navigate(['/google-maps'])
  }

  freeSale() {
    this.router.navigate(['/free-sale'])
  }

  initial() {



  }

  async suspend() {
    // this.router.navigate(["/tabs/tab1"]);
    const temp: ModalMessageModel = {
      showTip: false,
      title: "Quer continuar ?",
      description: "Ao continuar vai suspender a tarefa",
      state: "warning",
      leftButtonSize: "small",
      leftButtonType: "text",
      leftButtonText: "Voltar",
      showMiddleButton: false,
      rightButtonSize: "small",
      rightButtonType: "text",
      rightButtonText: "Suspender",
      rightButtonTesterProperty: "clickLeaveApp",
      rightButtonColor: "c-scale-12",
      rightButtonCallback: () => {
        this.buttonSuspend();
      },
    };
    this.alertService.open(temp);


    this.tasksService.notes = "";
  }


 async buttonSuspend() {
    await this.tasksService.putTaskSuspend();
    await this.taskApiService.getTypesStateTask();


    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res;
      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    await this.taskApiService.getTasksItemIdAtribuited().then(res => {
      this.tasksService.listTasks1 = res;
      // this.tasksService.visiteToDo = this.tasksService.listTasks1
      // this.tasksService.visiteToDo1 = this.tasksService.listTasks1.map(res => res.currentStatus)
      // this.tasksService.visiteToDo = this.tasksService.visiteToDo1.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      // console.log(      this.tasksService.visiteToDo)
      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')
      // this.tasksService.countVisits = this.tasksService.visiteToDo.length
      // console.log(this.tasksService.countVisits)
      // this.tasksService.countsToDo = this.tasksService.listTasks1.length - this.tasksService.countVisits


    })

    this.tasksService.visiteToDo = this.tasksService.listTasks1.concat(this.tasksService.listTasks2)
    console.log(this.tasksService.visiteToDo, 'lista final')


    console.log(this.tasksService.visiteToDo)
    console.log(this.tasksService.listTasks1)
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length
    console.log(this.tasksService.visiteToDo, 'pq0')
    this.tasksService.getColor(this.tasksService.selectedTask.id);

    this.router.navigate(["/tabs/tab1"]);



}
  async executed() {

    const temp: ModalMessageModel = {
      showTip: false,
      title: "Quer continuar ?",
      description: "Ao continuar vai iniciar a tarefa",
      state: "warning",
      leftButtonSize: "small",
      leftButtonType: "text",
      leftButtonText: "Voltar",
      showMiddleButton: false,
      rightButtonSize: "small",
      rightButtonType: "text",
      rightButtonText: "Iniciar",
      rightButtonTesterProperty: "clickLeaveApp",
      rightButtonColor: "c-scale-12",
      rightButtonCallback: () => {
        this.buttonExecuted();
      },
    };
    this.alertService.open(temp);


    this.tasksService.notes = "";

  }

  async buttonExecuted(){

    if(this.tasksService.listTasks2.length === 0 ) {

    this.tasksService.turnButton = true;
    console.log(this.tasksService.turnButton)
    await this.tasksService.putTaskExecuted();
    await this.taskApiService.getTypesStateTask();
    console.log(this.tasksService.selectedTask.id)


    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res;
      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    await this.taskApiService.getTasksItemIdAtribuited().then(res => {
      this.tasksService.listTasks1 = res;
      // this.tasksService.visiteToDo = this.tasksService.listTasks1
      // this.tasksService.visiteToDo1 = this.tasksService.listTasks1.map(res => res.currentStatus)
      // this.tasksService.visiteToDo = this.tasksService.visiteToDo1.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      // console.log(      this.tasksService.visiteToDo)
      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')
      // this.tasksService.countVisits = this.tasksService.visiteToDo.length
      // console.log(this.tasksService.countVisits)
      // this.tasksService.countsToDo = this.tasksService.listTasks1.length - this.tasksService.countVisits


    })

    this.tasksService.visiteToDo = this.tasksService.listTasks1.concat(this.tasksService.listTasks2)
    console.log(this.tasksService.visiteToDo, 'lista final')


    console.log(this.tasksService.visiteToDo)
    console.log(this.tasksService.listTasks1)
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length
    console.log(this.tasksService.visiteToDo, 'pq0')
    this.tasksService.getColor(this.tasksService.selectedTask.id);

    this.router.navigate(["/tabs/tab1"]);
  }else {
  return this.tasksService.msgWarningExecuted = true;
  }
}

  async finalized() {

    const temp: ModalMessageModel = {
      showTip: false,
      title: "Quer continuar ?",
      description: "Ao continuar vai finalizar a tarefa",
      state: "warning",
      leftButtonSize: "small",
      leftButtonType: "text",
      leftButtonText: "Voltar",
      showMiddleButton: false,
      rightButtonSize: "small",
      rightButtonType: "text",
      rightButtonText: "Finalizar",
      rightButtonTesterProperty: "clickLeaveApp",
      rightButtonColor: "c-scale-12",
      rightButtonCallback: () => {
        this.buttonFinalized();
      },
    };
    this.alertService.open(temp);


    this.tasksService.notes = "";

  }



  async buttonFinalized() {

    await this.tasksService.putTaskFinalize();
    await this.taskApiService.getTypesStateTask();

    if (this.tasksService.listTasksFinalized.length === 0) {
      this.tasksService.turnMsgAlertTask1 = true;
      this.tasksService.msgAlertTasks1 = "Ainda não se encontram tarefas concluídas"
    } else {
      this.tasksService.turnMsgAlertTask1 = false;
    }

    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length


    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res;
      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    await this.taskApiService.getTasksItemIdAtribuited().then(res => {
      this.tasksService.listTasks1 = res;
      // this.tasksService.visiteToDo = this.tasksService.listTasks1
      // this.tasksService.visiteToDo1 = this.tasksService.listTasks1.map(res => res.currentStatus)
      // this.tasksService.visiteToDo = this.tasksService.visiteToDo1.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      // console.log(      this.tasksService.visiteToDo)
      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')
      // this.tasksService.countVisits = this.tasksService.visiteToDo.length
      // console.log(this.tasksService.countVisits)
      // this.tasksService.countsToDo = this.tasksService.listTasks1.length - this.tasksService.countVisits


    })

    await this.taskApiService.getTasksItemIdFinalized().then(res => {
      this.tasksService.listTasksFinalized = res;
      console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
      this.tasksService.visiteEfected = this.tasksService.listTasksFinalized
      this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

      console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
    })


    this.tasksService.visiteToDo = this.tasksService.listTasks1.concat(this.tasksService.listTasks2)
    console.log(this.tasksService.visiteToDo, 'lista final')


    console.log(this.tasksService.visiteToDo)
    console.log(this.tasksService.listTasks1)
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length
    console.log(this.tasksService.visiteToDo, 'pq0')
    this.tasksService.getColor(this.tasksService.selectedTask.id);

    this.router.navigate(["/tabs/tab1"]);



    this.router.navigate(['/tabs/tab1']);

  }



}
