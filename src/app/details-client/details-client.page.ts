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
import { FileOpener } from '@ionic-native/file-opener/ngx'

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
  FilesystemDirectory: any;
  imgTecnhic1: any;
  formNumberStart: any;
  hasImages: any;
  forNumbers: any;
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
  pdfBase64: any;

  imageBolean = true;
  @ViewChild('search') myInput;
  showContent = true;
  logoData;



  constructor(private translate: TranslateService, private file: File, private fileOpener: FileOpener, public plataform: Platform, public tasksService: TasksService, private router: Router, private actionSheetService: ActionSheetService, private contactsTaskService: ContactsTaskService, public taskApiService: TaskApiService, private alertService: AlertService, public contactApiService: ContactsTaskService, private toastController: ToastController, public loadingController: LoadingController, public formsField: FormsService, private http: HttpClient) {



  }



  async ngOnInit() {

    this.tasksService.timeHours(); // fazer reloading as horas para obter novas datas


    // Este excerto de código é para validar se tem imagens , senao houver nenhuma imagem para mostrar para não mostrar a frase "IMAGES EM ANEXO"


    if (this.formsField.image1 == 'data:image/png;base64,undefined' && this.formsField.image2 == 'data:image/png;base64,undefined' && this.formsField.image3 == 'data:image/png;base64,undefined' && this.formsField.image4 == 'data:image/png;base64,undefined' && this.formsField.image5 == 'data:image/png;base64,undefined' && this.formsField.image6 == 'data:image/png;base64,undefined' && this.formsField.image7 == 'data:image/png;base64,undefined' && this.formsField.image8 == 'data:image/png;base64,undefined') {
      this.hasImages = false;
    } else {
      this.hasImages = true;

    }
    // -----------------------------------------------------------------------------------------------

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
      if (res.length == 0) {
        return;
      } else {
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
      console.log(this.tasksService.notesTask.tasks
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
    console.log(this.tasksService.notesTasks, 'NOTAS TASK 1')

    this.loadingController.dismiss().then(() => {
      console.log('Loading spinner dismissed');
    });

  }







  // PARA GUARDAR IMAGEM FORMULARIO  BASE 64 DATA

  loadLocalAssetToBase64() {
    this.http.get('./assets/img/logo_guimabombas.png', { responseType: 'blob' })
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
    if (this.tasksService.turnTab3 == true) {
      this.router.navigate(["tabs/tab3"]);
    } else {
      this.router.navigate(["tabs/tab1"]);
      this.tasksService.notes = "";
      this.tasksService.msgWarningExecuted = false;
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
        alert("Não tem permissão para Cancelar!");
        return;
        // this.buttonCancelled();
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
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

      // this.tasksService.listTasks2 = res;
      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    await this.taskApiService.getTasksItemIdAtribuited().then(res => {
      this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')


    })

    await this.taskApiService.getTasksItemIdSuspend().then(res => {

      this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


    })

    //LISTA TODO QUE é para fazer primeiro por Ordem dos estados (exe - atri- Final ) e depois por ordem alfabética

    this.tasksService.visiteToDo = [
      ...this.tasksService.listTasks2.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName)),
      ...this.tasksService.listTasks1.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName)),
      ...this.tasksService.listTasksSuspended.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName))
    ];
    console.log(this.tasksService.visiteToDo, 'lista final');



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

  editPost(task) {
    console.log(task)
    this.tasksService.selectedPost = task
    this.onNotes = false;

    console.log(this.tasksService.selectedTask.id)
  }



  save(task) {


    if (task.currentStatus.id == "e6875497-3ad4-4121-b3aa-4efde5d12fb1") {
      return this.tasksService.turnMessageCreateEdit = true;
    } else {
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


  goToSuspend(){
    this.router.navigate(["/suspend"])
  }

  async buttonSuspend() {
    await this.tasksService.putTaskSuspend();
    await this.taskApiService.getTypesStateTask();


    await this.taskApiService.getTasksItemIdSuspend().then(res => {


      this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


    })


    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    await this.taskApiService.getTasksItemIdAtribuited().then(res => {

      this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)


      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')


    })
    await this.taskApiService.getTasksItemIdSuspend().then(res => {


      this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


    })



    //LISTA TODO QUE é para fazer primeiro por Ordem dos estados (exe - atri- Final ) e depois por ordem alfabética

    this.tasksService.visiteToDo = [
      ...this.tasksService.listTasks2.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName)),
      ...this.tasksService.listTasks1.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName)),
      ...this.tasksService.listTasksSuspended.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName))
    ];
    console.log(this.tasksService.visiteToDo, 'lista final');


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
  async presentSuccessToastWarning() {
    const toast = await this.toastController.create({
      message: 'Nao tem permissão para Cancelar!',
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }

  async buttonExecuted() {


    console.log(this.tasksService.turnButton)
    await this.tasksService.putTaskExecuted();
    await this.taskApiService.getTypesStateTask();
    console.log(this.tasksService.selectedTask.id)




    await this.taskApiService.getTasksItemIdAtribuited().then(res => {

      this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)


      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')

    })


    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)


      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })


    await this.taskApiService.getTasksItemIdSuspend().then(res => {

      this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


    })

    await this.taskApiService.getTasksItemIdAtribuited().then(res => {

      this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')


    })

    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    //LISTA TODO QUE é para fazer primeiro por Ordem dos estados (exe - atri- Final ) e depois por ordem alfabética

    this.tasksService.visiteToDo = [
      ...this.tasksService.listTasks2.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName)),
      ...this.tasksService.listTasks1.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName)),
      ...this.tasksService.listTasksSuspended.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName))
    ];
    console.log(this.tasksService.visiteToDo, 'lista final');


    console.log(this.tasksService.visiteToDo)
    console.log(this.tasksService.listTasks1)
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length
    console.log(this.tasksService.visiteToDo, 'pq0')
    this.tasksService.getColor(this.tasksService.selectedTask.id);

    this.presentSuccessToast();
    this.router.navigate(["/tabs/tab1"]);

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

  async buttonResume() {

    console.log(this.tasksService.turnButton)
    await this.tasksService.putTaskExecuted();
    await this.taskApiService.getTypesStateTask();
    console.log(this.tasksService.selectedTask.id)


    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)


      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    await this.taskApiService.getTasksItemIdAtribuited().then(res => {

      this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')


    })


    await this.taskApiService.getTasksItemIdSuspend().then(res => {


      this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


    })


    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)


      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    //LISTA TODO QUE é para fazer primeiro por Ordem dos estados (exe - atri- Final ) e depois por ordem alfabética

    this.tasksService.visiteToDo = [
      ...this.tasksService.listTasks2.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName)),
      ...this.tasksService.listTasks1.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName)),
      ...this.tasksService.listTasksSuspended.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName))
    ];
    console.log(this.tasksService.visiteToDo, 'lista final');



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

  buttonFinalizedForms() {
    if (this.tasksService.selectedTask.currentStatus.id == "00bba7ce-f90b-4ebb-9478-777376f78e93") {
      this.tasksService.msgWarningExecuted = true;
    } else {
      setTimeout(() => {
        this.tasksService.msgWarningExecuted = false;

        this.router.navigate(["/forms"]);
      }, 200);
      setTimeout
    }

  }


  modelChangeFn(e) {
    this.tasksService.postNotes = e;
    console.log(this.tasksService.postNotes);

  }


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



    console.log(JSON.stringify(this.logoData))

    const docDefinition = {



      header: [

      ],

      content: [

        {
          stack: [

            [{ image: 'data:image/png;base64,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', width: 200, style: 'headerMaster' }],
            // console.log(JSON.parse(JSON.stringify(this.logoData))),
            { text: 'Rua da Portela nº1005 -4805-546 Vermil- Guimarães\n Telefones 252 928 580/1/2 -252 997 100 - Faz 252 991 848 \n E-mail: geral@guimabombas.com', width: 20, style: "textHeader" },


            { text: 'Ficha de Trabalho', style: 'header' },

            //       this.createTable(this.formsField.structureList)

            {
              style: "tableHeader",
              table: {
                headerRows: 1,
                body: [
                  [{ text: 'Cliente', bold: true, fontSize: 12, verticalAligment:'middle', width : 'auto' }, { text: (typeof this.clientDetails.entity.firstName === 'string') ? this.clientDetails.entity.firstName.trim() : '', fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Morada ', bold: true, fontSize: 12, verticalAlignment: 'middle' }, { text: this.tasksService.selectedTask.address.addressLine1 + '-' + this.tasksService.selectedTask.address.cityName + '-' + this.tasksService.selectedTask.address.postalCode, fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Técnico', bold: true, fontSize: 12 }, { text: this.tasksService.entityName, fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Data da Tarefa', bold: true, fontSize: 12 }, { text: this.formsField.structure.dateFields[0].value.substring(0, 10).replace("T", " às "), fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Tipo da Tarefa', bold: true, fontSize: 12 }, { text: this.formsField.structure.optionFields[0].values[0].name, fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Pedido ao OVM ?', bold: true, fontSize: 12 }, { text: this.formsField.structure.booleanFields[0].value, fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Pedido ao OVM - Porque ?', bold: true, fontSize: 12 }, { text: this.formsField.structure.textFields[5].value, fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Trabalho Finalizado ?', bold: true, fontSize: 12 }, { text: this.formsField.structure.booleanFields[1].value, fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Trabalho finalizado - Porque ?', bold: true, fontSize: 12 }, { text: this.formsField.structure.textFields[5].value, fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [
                    { text: 'Data de inicio da deslocação', bold: true, fontSize: 12 },
                    { text: this.formsField.structure.dateFields[3]?.value?.substring(0, 19)?.replace("T", " às "), fontSize: 12, verticalAlignment: 'middle', bold: false, margin: [0, 10, 0, 0] }
                  ],
                  [
                    { text: 'Data de fim da deslocação', bold: true, fontSize: 12 },
                    { text: this.formsField.structure.dateFields[1]?.value?.substring(0, 19)?.replace("T", " às "), fontSize: 12, verticalAlignment: 'middle', bold: false, margin: [0, 10, 0, 0] }
                  ],
                  [{ text: 'Matricula', bold: true, fontSize: 12 }, { text: this.formsField.structure.textFields[3].value, fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Origem', bold: true, fontSize: 12 }, { text: this.formsField.structure.textFields[4].value, fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Destino', bold: true, fontSize: 12 }, { text: this.formsField.structure.textFields[1].value, fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'kilometros', bold: true, fontSize: 12 }, { text: JSON.stringify(this.formsField.structure.decimalFields[0].value), fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Data de inicio do trabalho', bold: true, fontSize: 12 }, { text: this.formsField.structure.dateFields[4].value.substring(0, 19).replace("T", " às "), fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Data de fim do trabalho', bold: true, fontSize: 12 }, { text: this.formsField.structure.dateFields[2].value.substring(0, 19).replace("T", " às "), fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Anomalias encontradas', bold: true, fontSize: 12 }, { text: this.formsField.structure.textFields[0].value, fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Trabalho Efetuado', bold: true, fontSize: 12 }, { text: this.formsField.structure.textFields[6].value, fontSize: 12, verticalAlignment: 'middle', bold: false }],
                  [{ text: 'Materiais Aplicados', bold: true, fontSize: 12 }, { text: this.formsField.structure.textFields[2].value, fontSize: 12, verticalAlignment: 'middle', bold: false }],
                ].filter(row => row[1].text && typeof row[1].text === 'string' && row[1].text.trim() !== '' && row[1].text !== 'null'),
              },


            },

            {
              table: {
                widths: ['*', '*'],
                body: [
                  [
                    {
                      stack: [
                        { image: JSON.parse(JSON.stringify(this.formsField.imgClient)), width: 100, style: "textClient" },
                        { text: 'Assinatura do Cliente', width: 20, style: "textClient" }
                      ],
                      border: [false, false, false, false],
                      margin: [0, 0, 20, 0],
                    },
                    {
                      stack: [
                        { image: JSON.parse(JSON.stringify(this.formsField.imgTecnhic)), width: 100, style: 'textImage1' },
                        { text: 'Assinatura do Técnico', width: 20, style: { bold: true, } }
                      ],
                      border: [false, false, false, false],
                      margin: [20, 0, 0, 0],

                    }
                  ]
                ]
              }
            }
            ,
          ]
        },
        // OUTRA PAGINA

        {
          stack: [

            ...(this.hasImages ? [{ pageBreak: 'before', text: 'Imagens em ANEXO', width: 20, style: "header1" }] : []),


            {
              columns: [
                {
                  width: '*',
                  stack: [
                    {
                      image: JSON.parse(JSON.stringify(this.formsField.image1)),
                      width: 200,
                      style: "imageAnex1"
                    },
                    {
                      image: JSON.parse(JSON.stringify(this.formsField.image2)),
                      width: 200,
                      style: "imageAnex1"
                    },
                    {
                      image: JSON.parse(JSON.stringify(this.formsField.image3)),
                      width: 200,
                      style: "imageAnex1"
                    },
                    {
                      image: JSON.parse(JSON.stringify(this.formsField.image4)),
                      width: 200,
                      style: "imageAnex1"
                    }
                  ]
                    .filter(item => item.image !== 'data:image/png;base64,' + undefined)
                },
                {
                  width: '*',
                  stack: [
                    {
                      image: JSON.parse(JSON.stringify(this.formsField.image5)),
                      width: 200,
                      style: "imageAnex1"
                    },
                    {
                      image: JSON.parse(JSON.stringify(this.formsField.image6)),
                      width: 200,
                      style: "imageAnex1"
                    },
                    {
                      image: JSON.parse(JSON.stringify(this.formsField.image7)),
                      width: 200,
                      style: "imageAnex1"
                    },
                    {
                      image: JSON.parse(JSON.stringify(this.formsField.image8)),
                      width: 200,
                      style: "imageAnex1"
                    }

                  ]
                    .filter(item => item.image !== 'data:image/png;base64,' + undefined)
                },


              ]
            }

          ]
        }
      ],





      styles: {
        header: {
          fontSize: 20,
          bold: false,
          margin: [190, 5, 10, 10],
        },
        header1: {
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
          margin: [20, 20, 20, 20],
          verticalAlignment: 'middle',

        },
        headerMaster: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 20],
        },
        textHeader: {
          fontSize: 8,
          bold: false,
          margin: [250, -65, 0, 30],

        },

        // textImage: {
        //   bold: true,
        //   margin: [285, 0, 0, 40]
        // },
        // textImage1: {
        //   bold: true,
        //   margin: [300, -115, 0, 0]
        // },
        textClient: {
          bold: true,
          margin: [110, 0, 0, 0]

        },
        imageAnex: {
          margin: [20, 30, 0, 0]
        },
        imageAnex1: {
          margin: [20, 30, 0, 0]
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
        this.file.writeFile(this.file.dataDirectory, 'formulário' + JSON.stringify(formId) + '.pdf', blob, { replace: true }).then(fileEntry => {

          this.fileOpener.open(this.file.dataDirectory + 'formulário' + JSON.stringify(formId) + '.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download('formulário' + JSON.stringify(formId) + '.pdf');

    }
  }









}
