import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetModel, ActionSheetService, AlertService, ModalMessageModel } from '@nc-angular/library-mobile.stg';
import { TranslateService } from '@ngx-translate/core';
import { TasksService } from '../shared/services/tasks.service';
import { ContactsTaskService } from '../shared/http/contactsTask-api.service';
import { Contacts, Entity, InstancePatch, Tasks } from '../utils/models/tasks';
import { TaskApiService } from '../shared/http/task-api.service';
import { CallNumber } from 'capacitor-call-number';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { FormsService } from '../shared/services/forms.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Plugins } from '@capacitor/core';
const { Filesystem, DocumentViewer, FilesystemDirectory } = Plugins;
import { HttpClient } from '@angular/common/http';
import {FileOpener} from '@ionic-native/file-opener/ngx'

// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.page.html',
  styleUrls: ['./details-client.page.scss'],



})
export class DetailsClientPage implements OnInit {
  FilesystemDirectory:any;
  imgTecnhic1:any;
  formNumberStart:any;
  forNumbers:any;
  // pdfUrl = "https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf'
  formsFields = {
    structure: {
      optionFields: [
        {
          values: [
            {
              name: 'Tarefa 1'
            }
          ]
        }
      ],
      booleanFields: [
        {
          value: 'Sim'
        },
        {
          value: 'Não'
        }
      ],
      textFields: [
        {
          value: 'Anomalias encontradas'
        },
        {
          value: 'Pedido ao OVM - Porque'
        },
        {
          value: 'Trabalho finalizado - Porque'
        }
      ],
      dateFields: [
        {
          value: '2022-05-01T15:00:00'
        },
        {
          value: '2022-05-02T10:00:00'
        },
        {
          value: '2022-05-03T16:00:00'
        },
        {
          value: '2022-05-04T08:00:00'
        },
        {
          value: '2022-05-05T09:00:00'
        }
      ]
    }
  };




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
  pdfObj: any;
  pdfBase64:any;

  imageBolean = true;
  @ViewChild('search') myInput;
  showContent = true;
  logoData ;



  constructor(private translate: TranslateService, private file:File, private fileOpener: FileOpener, public plataform: Platform,  public tasksService: TasksService, private router: Router, private actionSheetService: ActionSheetService, private contactsTaskService: ContactsTaskService, public taskApiService: TaskApiService, private alertService: AlertService, public contactApiService: ContactsTaskService , private toastController: ToastController, public loadingController: LoadingController, public formsField:FormsService , private http: HttpClient) {



  }



  async ngOnInit() {


this.loadLocalAssetToBase64();

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
      if(res.length == 0){
        return;
      }else {
      this.tasksService.listContacts = res;
      console.log(this.tasksService.listContacts[0].id)
      this.tasksService.idContact = this.tasksService.listContacts[0].id
      this.tasksService.idContactId = this.tasksService.listContacts[0].contactId
      this.tasksService.idEntityId = this.tasksService.listContacts[0].entity.id

      console.log(this.tasksService.idContact)
      }
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
console.log(this.tasksService.selectedTask, 'TASK SELECIONADA')
    console.log(this.tasksService.notesTask, 'NOTAS DOS POSTS')
    console.log(this.tasksService.notesTask.id)
    // console.log(this.notesTask.tasks[0].note)







// this.tasksService.notesTasks1 =  this.tasksService.notesTask;
console.log(this.tasksService.notesTasks , 'NOTAS TASK 1')

this.loadingController.dismiss().then(() => {
  console.log('Loading spinner dismissed');
});

  }







  // PARA GUARDAR IMAGEM FORMULARIO  BASE 64 DATA

  loadLocalAssetToBase64(){
    this.http.get('./assets/img/logo_guimabombas.png', { responseType: 'blob'})
    .subscribe(res => {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoData = reader.result;
    console.log(this.logoData, 'BASE64 IMG11')
        //  this.logoData1 = this.logoData;

  }
     reader.readAsDataURL(res);

    })


    console.log(this.logoData, 'BASE64 IMG22')


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

    console.log(this.tasksService.turnTab3, 'estado do turnTab3')
    if(this.tasksService.turnTab3 == true){
      this.router.navigate(["tabs/tab3"]);
    }else{
    this.router.navigate(["tabs/tab1"]);
    this.tasksService.notes = "";
    this.tasksService.msgWarningExecuted  = false;
    }
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
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew )

      // this.tasksService.listTasks2 = res;
      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    await this.taskApiService.getTasksItemIdAtribuited().then(res => {
      this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew )

      // this.tasksService.listTasks1 = res;
      // this.tasksService.visiteToDo = this.tasksService.listTasks1
      // this.tasksService.visiteToDo1 = this.tasksService.listTasks1.map(res => res.currentStatus)
      // this.tasksService.visiteToDo = this.tasksService.visiteToDo1.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      // console.log(      this.tasksService.visiteToDo)
      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')
      // this.tasksService.countVisits = this.tasksService.visiteToDo.length
      // console.log(this.tasksService.countVisits)
      // this.tasksService.countsToDo = this.tasksService.listTasks1.length - this.tasksService.countVisits


    })

    await this.taskApiService.getTasksItemIdSuspend().then(res => {

      // this.tasksService.listTasksSuspended = res;
      this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


    })

    this.tasksService.visiteToDo = this.tasksService.listTasks1.concat(this.tasksService.listTasks2 ,  this.tasksService.listTasksSuspended)
    console.log(this.tasksService.visiteToDo, 'lista final')


    console.log(this.tasksService.visiteToDo)
    console.log(this.tasksService.listTasks1)
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length
    console.log(this.tasksService.visiteToDo, 'pq0')
    this.tasksService.getColor(this.tasksService.selectedTask.id);

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


    await this.taskApiService.getTasksItemIdSuspend().then(res => {

      // this.tasksService.listTasksSuspended = res;
      this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


    })


    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew )

      // this.tasksService.listTasks2 = res;
      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    await this.taskApiService.getTasksItemIdAtribuited().then(res => {
      // this.tasksService.listTasks1 = res;
      this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew )

      // this.tasksService.visiteToDo = this.tasksService.listTasks1
      // this.tasksService.visiteToDo1 = this.tasksService.listTasks1.map(res => res.currentStatus)
      // this.tasksService.visiteToDo = this.tasksService.visiteToDo1.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      // console.log(      this.tasksService.visiteToDo)
      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')
      // this.tasksService.countVisits = this.tasksService.visiteToDo.length
      // console.log(this.tasksService.countVisits)
      // this.tasksService.countsToDo = this.tasksService.listTasks1.length - this.tasksService.countVisits


    })
    await this.taskApiService.getTasksItemIdSuspend().then(res => {

      // this.tasksService.listTasksSuspended = res;
      this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


    })



    this.tasksService.visiteToDo = this.tasksService.listTasks1.concat(this.tasksService.listTasks2,  this.tasksService.listTasksSuspended)
    console.log(this.tasksService.visiteToDo, 'lista final')


    console.log(this.tasksService.visiteToDo)
    console.log(this.tasksService.listTasks1)
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length
    console.log(this.tasksService.visiteToDo, 'pq0')
    this.tasksService.getColor(this.tasksService.selectedTask.id);
    this.tasksService.msgWarningExecuted = false;
    this.presentSuccessToast();
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

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Executada com sucesso!',
      duration: 2000,
      position: 'top',
      color: 'primary',
    });
    toast.present();
  }

  async buttonExecuted(){

    // if(this.tasksService.listTasks2.length === 0 ) {

    // this.tasksService.turnButton = true;
    console.log(this.tasksService.turnButton)
    await this.tasksService.putTaskExecuted();
    await this.taskApiService.getTypesStateTask();
    console.log(this.tasksService.selectedTask.id)




    await this.taskApiService.getTasksItemIdAtribuited().then(res => {
      // this.tasksService.listTasks1 = res;
      this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew )

      // this.tasksService.visiteToDo = this.tasksService.listTasks1
      // this.tasksService.visiteToDo1 = this.tasksService.listTasks1.map(res => res.currentStatus)
      // this.tasksService.visiteToDo = this.tasksService.visiteToDo1.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      // console.log(      this.tasksService.visiteToDo)
      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')
      // this.tasksService.countVisits = this.tasksService.visiteToDo.length
      // console.log(this.tasksService.countVisits)
      // this.tasksService.countsToDo = this.tasksService.listTasks1.length - this.tasksService.countVisits


    })


    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew )

      // this.tasksService.listTasks2 = res;
      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })


    await this.taskApiService.getTasksItemIdSuspend().then(res => {

      // this.tasksService.listTasksSuspended = res;
      this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


    })

    await this.taskApiService.getTasksItemIdAtribuited().then(res => {
      // this.tasksService.listTasks1 = res;
      this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew )

      // this.tasksService.visiteToDo = this.tasksService.listTasks1
      // this.tasksService.visiteToDo1 = this.tasksService.listTasks1.map(res => res.currentStatus)
      // this.tasksService.visiteToDo = this.tasksService.visiteToDo1.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      // console.log(      this.tasksService.visiteToDo)
      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')
      // this.tasksService.countVisits = this.tasksService.visiteToDo.length
      // console.log(this.tasksService.countVisits)
      // this.tasksService.countsToDo = this.tasksService.listTasks1.length - this.tasksService.countVisits


    })

    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew )

      // this.tasksService.listTasks2 = res;
      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

     this.tasksService.visiteToDo = this.tasksService.listTasks1.concat(this.tasksService.listTasks2,  this.tasksService.listTasksSuspended)
    console.log(this.tasksService.visiteToDo, 'lista final')


    console.log(this.tasksService.visiteToDo)
    console.log(this.tasksService.listTasks1)
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length
    console.log(this.tasksService.visiteToDo, 'pq0')
    this.tasksService.getColor(this.tasksService.selectedTask.id);

    this.presentSuccessToast();
    this.router.navigate(["/tabs/tab1"]);
  // }
  // else {
  // return this.tasksService.msgWarningExecuted = true;
  // }
}


async resume() {

  const temp: ModalMessageModel = {
    showTip: false,
    title: "Quer retomar ?",
    description: "Ao continuar vai retomar a tarefa",
    state: "warning",
    leftButtonSize: "small",
    leftButtonType: "text",
    leftButtonText: "Voltar",
    showMiddleButton: false,
    rightButtonSize: "small",
    rightButtonType: "text",
    rightButtonText: "Retomar",
    rightButtonTesterProperty: "clickLeaveApp",
    rightButtonColor: "c-scale-12",
    rightButtonCallback: () => {
      this.buttonResume();
    },
  };
  this.alertService.open(temp);


  this.tasksService.notes = "";

}

async buttonResume(){
  // if(this.tasksService.listTasks2.length === 0 ) {

    // this.tasksService.turnButtonResume = true;
    console.log(this.tasksService.turnButton)
    await this.tasksService.putTaskExecuted();
    await this.taskApiService.getTypesStateTask();
    console.log(this.tasksService.selectedTask.id)


    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew )

      // this.tasksService.listTasks2 = res;
      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    await this.taskApiService.getTasksItemIdAtribuited().then(res => {
      // this.tasksService.listTasks1 = res;
      this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew )

      // this.tasksService.visiteToDo = this.tasksService.listTasks1
      // this.tasksService.visiteToDo1 = this.tasksService.listTasks1.map(res => res.currentStatus)
      // this.tasksService.visiteToDo = this.tasksService.visiteToDo1.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      // console.log(      this.tasksService.visiteToDo)
      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')
      // this.tasksService.countVisits = this.tasksService.visiteToDo.length
      // console.log(this.tasksService.countVisits)
      // this.tasksService.countsToDo = this.tasksService.listTasks1.length - this.tasksService.countVisits


    })


    await this.taskApiService.getTasksItemIdSuspend().then(res => {

      // this.tasksService.listTasksSuspended = res;
      this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


    })


    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew )

      // this.tasksService.listTasks2 = res;
      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    this.tasksService.visiteToDo = this.tasksService.listTasks1.concat(this.tasksService.listTasks2, this.tasksService.listTasksSuspended)
    console.log(this.tasksService.visiteToDo, 'lista final')


    console.log(this.tasksService.visiteToDo)
    console.log(this.tasksService.listTasks1)
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length
    console.log(this.tasksService.visiteToDo, 'pq0')
    this.tasksService.getColor(this.tasksService.selectedTask.id);
    this.tasksService.msgWarningExecuted = false;
this.presentSuccessToast();
    this.router.navigate(["/tabs/tab1"]);
  // }
  // else {
  // return this.tasksService.msgWarningExecuted = true;
  // }
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
        this.buttonFinalizedForms();
      },
    };
    this.alertService.open(temp);


    this.tasksService.notes = "";

  }

  buttonFinalizedForms(){
    if(this.tasksService.selectedTask.currentStatus.id == "00bba7ce-f90b-4ebb-9478-777376f78e93"){
      this.tasksService.msgWarningExecuted = true;
    }else {
    setTimeout(() => {
      this.tasksService.msgWarningExecuted = false;

      this.router.navigate(["/forms"]);
    }, 200);
    setTimeout
  }

  }



//   async buttonFinalized() {
//     console.log(JSON.parse(JSON.stringify(this.tasksService.notesTask)));
//     let data: InstancePatch = new InstancePatch(this.tasksService.notesTask);
//     console.log(data, 'lista data')

//     if(this.tasksService.selectedTask.currentStatus.id == "00bba7ce-f90b-4ebb-9478-777376f78e93"){
//       this.tasksService.msgWarningExecuted = true;
//     }else {
//       console.log(data, 'lista data')

//     await this.tasksService.putTaskFinalize();

//     // const updateTask2 = [{

//     //  entityRoleId: this.tasksService.notesTask.entityRoles[1].entityRoleId,
//     //   isParticipant: this.tasksService.notesTask.entityRoles[1].isParticipant,
//     //   isMain: this.tasksService.notesTask.entityRoles[1].isMain,
//     //   entityRoleName: this.tasksService.notesTask.entityRoles[1].entity.id,
//     // }]
//     // const updateTask3 = {
//     //   documentInstances1: this.tasksService.selectedTask.id,
//     //   documentType: '0'
//     // }

//     // const updateTask1 = {

//     //   name: this.tasksService.selectedTask.name,
//     //   description: this.tasksService.selectedTask.description,
//     //   note:this.tasksService.selectedTask.note,
//     //   isImportant: this.tasksService.selectedTask.isImportant,
//     //   projectId:this.tasksService.selectedTask.projectId,
//     //   itemId: this.tasksService.selectedTask.item,
//     //   address: this.tasksService.selectedTask.address,
//     //   documentInstances1: updateTask3,
//     //   entities: updateTask2,
//     //   tags:null,
//     //   estimatedStartDate: this.tasksService.selectedTask.estimatedStartDate,
//     //   startDate: this.tasksService.selectedTask.startDate,
//     //   estimatedEndDate: this.tasksService.totalTime,
//     //   endDate : this.tasksService.selectedTask.endDate,
//     //   formInstances: null
//     // }

// // console.log(updateTask1)

// const updateTaskPatch = {
// ...data,
// endDate: this.tasksService.totalTime,
// estimatedStartDate:this.tasksService.notesTask.estimatedStartDate,
//       startDate:this.tasksService.notesTask.estimatedStartDate,
//       estimatedEndDate: this.tasksService.notesTask.estimatedEndDate
// }


//     // const updateTask = {


//     //   endDate:this.tasksService.totalTime,
//     // }

// console.log(this.tasksService.notesTask, 'COPIA DA LISTA')
//     console.log(updateTaskPatch, 'LISTA MANDADA ')
//     console.log(this.tasksService.notesTask.id, 'ID DA LISTA ')

//     await this.taskApiService.updateTasksItemIdFinalizedDates(this.tasksService.notesTask.id, updateTaskPatch ).then(res => {
//       this.tasksService.updateTask = res;
//     console.log( this.tasksService.updateTask, 'UPDATE TASK SELECIONADA')
//     } )

//     await this.contactApiService.getNotesInstance(this.tasksService.selectedTask).then(res => {
//       this.tasksService.notesTask = res;
//       console.log( this.tasksService.notesTask, 'versão atualizada')
//     })
//     await this.taskApiService.getTasksItemIdFinalized().then(res => {
//       this.tasksService.listTasksFinalized = res;
//       this.tasksService.listTasksFinalized = res.filter(res => res.endDate !==  null && res.endDate.substring(0,10) == this.tasksService.timeNew  )


//       console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
//       this.tasksService.visiteEfected = this.tasksService.listTasksFinalized
//       this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

//       console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
//     })








//     await this.taskApiService.getTypesStateTask();


//     this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

//     console.log(this.tasksService.countVisits)

//     this.tasksService.countsToDo = this.tasksService.visiteToDo.length





//     await this.taskApiService.getTasksItemIdExecuted().then(res => {
//       // this.tasksService.listTasks2 = res;
//       this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew )

//       console.log(this.tasksService.listTasks2, 'Tarefas em execução')


//     })

//     await this.taskApiService.getTasksItemIdAtribuited().then(res => {
//       // this.tasksService.listTasks1 = res;
//       this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew )

//       // this.tasksService.visiteToDo = this.tasksService.listTasks1
//       // this.tasksService.visiteToDo1 = this.tasksService.listTasks1.map(res => res.currentStatus)
//       // this.tasksService.visiteToDo = this.tasksService.visiteToDo1.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
//       // console.log(      this.tasksService.visiteToDo)
//       console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')
//       // this.tasksService.countVisits = this.tasksService.visiteToDo.length
//       // console.log(this.tasksService.countVisits)
//       // this.tasksService.countsToDo = this.tasksService.listTasks1.length - this.tasksService.countVisits


//     })
//     await this.taskApiService.getTasksItemIdSuspend().then(res => {

//       // this.tasksService.listTasksSuspended = res;
//       this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew)

//       console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


//     })

//     await this.taskApiService.getTasksItemIdFinalized().then(res => {
//       this.tasksService.listTasksFinalized = res;
//       console.log(this.tasksService.listTasksFinalized)
//       this.tasksService.listTasksFinalized = res.filter( res => res.endDate !==  null && res.endDate.substring(0,10) == this.tasksService.timeNew  )

//       console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
//       this.tasksService.visiteEfected = this.tasksService.listTasksFinalized
//       this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

//       console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
//     })

//     await this.taskApiService.getTasksItemIdExecuted().then(res => {
//       // this.tasksService.listTasks2 = res;
//       this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew  )

//       console.log(this.tasksService.listTasks2, 'Tarefas em execução')


//     })



//     this.tasksService.visiteToDo = this.tasksService.listTasks1.concat(this.tasksService.listTasks2,  this.tasksService.listTasksSuspended)
//     console.log(this.tasksService.visiteToDo, 'lista final')


//     console.log(this.tasksService.visiteToDo)
//     console.log(this.tasksService.listTasks1)
//     this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

//     console.log(this.tasksService.countVisits)

//     this.tasksService.countsToDo = this.tasksService.visiteToDo.length
//     console.log(this.tasksService.visiteToDo, 'pq0')
//     this.tasksService.getColor(this.tasksService.selectedTask.id);


//     if (this.tasksService.visiteToDo.length === 0) {
//       this.tasksService.turnMsgAlertTask = true;
//       this.tasksService.msgAlertTasks = "Não existe Tarefas"
//     } else {
//       this.tasksService.turnMsgAlertTask = false;
//     }


//         if (this.tasksService.listTasksFinalized.length === 0) {
//       this.tasksService.turnMsgAlertTask1 = true;
//       this.tasksService.msgAlertTasks1 = "Ainda não se encontram tarefas concluídas"
//     } else {
//       this.tasksService.turnMsgAlertTask1 = false;
//     }
//     this.tasksService.msgWarningExecuted = false;

//     this.router.navigate(["/tabs/tab1"]);

//   }
// }

// send($event: KeyboardEvent){
//   console.log($event)
//   if ($event.key === 'Enter') {
//     this.save(this.tasksService.selectedTask)
//   }
// }


modelChangeFn(e ){
  this.tasksService.postNotes = e;
    console.log(this.tasksService.postNotes);

}
// async createPdf() {
//   const docDefinition = {
//     content: [
//       { text: 'Ficha de Trabalho', style: 'header' },
//       this.createTable(this.formsField.structureList)
//     ],
//     styles: {
//       header: {
//         fontSize: 18,
//         bold: true
//       },
//       subheader: {
//         fontSize: 14,
//         bold: true,
//         margin: [0, 15, 0, 0]
//       },
//       tableExample: {
//         margin: [0, 5, 0, 15]
//       },
//       tableHeader: {
//         bold: true,
//         fontSize: 13,
//         color: 'black'
//       }
//     }
//   };
//   pdfMake.createPdf(docDefinition).download();
// }

createTable(data) {
  let table = [];
  table.push([{ text: 'Título', style: 'tableHeader' }, { text: 'Valor', style: 'tableHeader' }]);
  data.forEach(item => {
    table.push([item.title, item.fieldName]);
  });
  return {
    style: 'tableExample',
    table: {
      body: table
    }
  };
}






generatePdf() {


  const docDefinition = {



    header: [

    ],

    content: [



      [{ image: JSON.parse(JSON.stringify(this.logoData)) , width: 200, style: 'headerMaster' }],
      {text:'Rua da Portela nº1005 -4805-546 Vermil- Guimarães\n Telefones 252 928 580/1/2 -252 997 100 - Faz 252 991 848 \n E-mail: geral@guimabombas.com' ,width:20 ,style:"textHeader"},


          { text: 'Ficha de Trabalho', style: 'header' },

//       this.createTable(this.formsField.structureList)

      {
        style: "tableHeader",
        table: {
          headerRows: 1,
          body: [
            [{ text: 'Cliente', bold: true }, { text: this.clientDetails.entity.firstName }],
            [{ text: 'Morada ', bold: true }, { text: this.tasksService.selectedTask.address.addressLine1 + this.tasksService.selectedTask.address.cityName + this.tasksService.selectedTask.address.postalCode }],
            [{ text: 'Técnico', bold: true }, { text: this.tasksService.entityName }],
            [{ text: 'Tipo da Tarefa', bold: true }, { text: this.formsField.structure.optionFields[0].values[0].name }],
            [{ text: 'Pedido ao OVM ?', bold: true }, { text: this.formsField.structure.booleanFields[0].value }],
            [{ text: 'Pedido ao OVM - Porque ?', bold: true }, { text: this.formsField.structure.textFields[5].value }],
            [{ text: 'Trabalho Finalizado ?', bold: true }, { text: this.formsField.structure.booleanFields[1].value }],
            [{ text: 'Trabalho finalizado - Porque ?', bold: true }, { text: this.formsField.structure.textFields[5].value }],
            [{ text: 'Data da Tarefa', bold: true }, { text: this.formsField.structure.dateFields[0].value.substring(0,10).replace("T", " às ") }],
            [{ text: 'Data de inicio da deslocação', bold: true }, { text: this.formsField.structure.dateFields[3].value.substring(0,19).replace("T", " às ") }],
            [{ text: 'Data de fim da deslocação', bold: true }, { text: this.formsField.structure.dateFields[1].value.substring(0,19).replace("T", " às ") }],
            [{ text: 'Data de inicio do trabalho', bold: true }, { text: this.formsField.structure.dateFields[4].value.substring(0,19).replace("T", " às ") }],
            [{ text: 'Data de fim do trabalho', bold: true }, { text: this.formsField.structure.dateFields[2].value.substring(0,19).replace("T", " às ") }],
            [{ text: 'Anomalias encontradas', bold: true }, { text: this.formsField.structure.textFields[0].value }],
            [{ text: 'Materiais Aplicados', bold: true }, { text: this.formsField.structure.textFields[2].value }],
            [{ text: 'Trabalho Efetuado', bold: true }, { text: this.formsField.structure.textFields[6].value }],
            [{ text: 'Matricula', bold: true }, { text: this.formsField.structure.textFields[3].value }],
            [{ text: 'kilometros', bold: true }, { text: this.formsField.structure.decimalFields[0].value }],
            [{ text: 'Origem', bold: true }, { text: this.formsField.structure.textFields[4].value }],
            [{ text: 'Destino', bold: true }, { text: this.formsField.structure.textFields[1].value }],
          ]
        }

      },

      [{image: JSON.parse(JSON.stringify(this.formsField.imgClient)), width: 100, style: "textClient"  }],
      {text:'Assinatura do Cliente' ,width:20, style: "textClient"  },
      [{image: JSON.parse(JSON.stringify(this.formsField.imgTecnhic)), width: 100, style: 'textImage1' }],
      {text:'Assinatura do Técnico' ,width:20, style: "textImage" },

    ],
    styles: {
      header: {
      fontSize: 18,
      bold: true,
      margin: [190, 0, 10, 0],
      },
      subheader: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 5], // left- top-right-bottom
      },
      tableExample: {
      margin: [0, 5, 0, 15],
      },
      tableHeader: {
      bold: true,
      fontSize: 13,
      color: 'black',
      margin: [20, 20 , 20 , 30],
      },
      headerMaster: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 40],
      },
      textHeader: {
        fontSize: 8,
        bold: false,
        margin: [250, -80, 0, 40],

      },

      textImage: {
        bold: true,
        margin: [285, 0, 0, 0]
      },
      textImage1: {
        bold: true,
        margin: [300, -115, 0, 0]
      },
      textClient:{
        bold: true,
        margin: [110, 0, 0, 0]

      }
      },
      };
      this.pdfObj = pdfMake.createPdf(docDefinition);


    const formId = this.tasksService.selectedTask.id

        // pdfDocGenerator.getBasdownloadPdf() {
    if (this.plataform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var utf8 = new Uint8Array(buffer);
        var binaryArray = utf8.buffer;
        var blob = new Blob([binaryArray], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'formulário'+ JSON.stringify(formId)+'.pdf', blob, { replace: true }).then(fileEntry => {

           this.fileOpener.open(this.file.dataDirectory +  'formulário'+ JSON.stringify(formId)+'.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download('formulário'+ JSON.stringify(formId)+'.pdf');

    }
    }









}
