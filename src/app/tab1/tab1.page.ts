import { Location } from '@angular/common';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { AfterContentChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, LoadingController, NavController, ToastController } from '@ionic/angular';
import { ActionSheetModel, ActionSheetService } from '@nc-angular/library-mobile.stg';
import { SwiperComponent } from 'swiper/angular';
import { ContactsTaskService } from '../shared/http/contactsTask-api.service';
import { TaskApiService } from '../shared/http/task-api.service';
import { clientsTab } from '../shared/models/clients-tab1';
import { FormsService } from '../shared/services/forms.service';
import { ProductService } from '../shared/services/product.service';
import { TasksService } from '../shared/services/tasks.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterContentChecked {


  @ViewChild('toDO', { static: true }) toDo
  @ViewChild('light-bar', { static: true }) color
  @ViewChild('toDO1', { static: true }) toDo1
  @ViewChild('action1', { static: false }) action1
  @ViewChild('action2', { static: false }) action2
  @ViewChild('swiper') swiper: SwiperComponent;
  @ViewChild('slide', { static: false }) slide: IonSlides
  @ViewChild('action1') input: ElementRef;


  positionSlide: any = 0;
  change = false;
  check = true;
  cardHeight = 0;
  cardHeight1 = 0;
  turnAction = false;
  name: string = "Jimmy Smyth";

  position: any[] = [
    {
      name1: 'Joao',
      position1: 'operator',
    },
    {
      name1: 'Marco',
      position1: 'operator',
    }
  ];

  visits: any = "Visitas para hoje"
  addTrimmer: boolean = true;
  result: string;

  tests = clientsTab
  globalMessagesTranslations: any;
  loginMessagesTranslations: any;
  productsMessagesTranslations: any;


  slideOpts = {
    initialSlide: 0,
    speed: 300
  };


  constructor(
    private router: Router,
    private nav: NavController,
    private loc: Location,
    public tasksService: TasksService,
    private actionSheetService: ActionSheetService,
    private productService: ProductService,
    public toastController: ToastController,
    public taskApiService: TaskApiService,
    public contactsTaskService: ContactsTaskService,
    private element: ElementRef,
    public loadingController: LoadingController,
    public formsField : FormsService,
   public  contactApiService: ContactsTaskService
  ) {






  }

  handleRefresh(event) {
    setTimeout(async () => {
      console.log(this.tasksService.time)
    console.log(this.tasksService.totalTime)
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length


    // this.tasksService.handleBackButton();

    console.log(this.positionSlide)



    console.log(this.tasksService.toDo)
    await this.contactsTaskService.getEntities().then(res => {
      console.log(res)
      this.tasksService.listClients = res;
    })
    this.tasksService.allDocumentsFilter = this.tasksService.listClients


    await this.contactsTaskService.getEntitiesClients().then(res => {
      console.log(res)
      this.tasksService.listClients1 = res;
      console.log(this.tasksService.listClients1)
    })
    this.tasksService.allDocumentsFilter = this.tasksService.listClients









    // await this.taskApiService.getTasks().then(res => {
    //   console.log(res)
    //   this.tasksService.listTasks = res;
    //   console.log(this.tasksService.visiteToDo)

    //   this.tasksService.countVisits  = this.tasksService.visiteToDo.length
    //   console.log(this.tasksService.countVisits)
    //   this.tasksService.countsToDo =  this.tasksService.listTasks.length-this.tasksService.countVisits
    // })


    await this.taskApiService.getTasksItemIdAtribuited().then(res => {
      // this.tasksService.listTasks1 = res;


       this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0,10)== this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew)

      // this.tasksService.visiteToDo = this.tasksService.listTasks1
      // this.tasksService.visiteToDo1 = this.tasksService.listTasks1.map(res => res.currentStatus)
      // this.tasksService.visiteToDo = this.tasksService.visiteToDo1.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      // console.log(      this.tasksService.visiteToDo)
      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')
      // this.tasksService.countVisits = this.tasksService.visiteToDo.length
      // console.log(this.tasksService.countVisits)
      // this.tasksService.countsToDo = this.tasksService.listTasks1.length - this.tasksService.countVisits


    })
    // LISTA PARA BUSCAR OS DE ESTADO EM EXECUÇÃO

    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      // this.tasksService.listTasks2 = res;
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    await this.taskApiService.getTasksItemIdSuspend().then(res => {

      // this.tasksService.listTasksSuspended = res;
      this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


    })

    await this.taskApiService.getTasksItemIdCancelled().then(res => {

      // this.tasksService.listTasksCancelled = res;
      this.tasksService.listTasksCancelled = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasksCancelled, 'Tarefas canceladas')


    })

    await this.taskApiService.getTasksItemIdFinalized().then(res => {
      console.log(res)
      // this.tasksService.listTasksFinalized = res;

      this.tasksService.listTasksFinalized = res.filter(res => res.endDate !==  null && res.endDate.substring(0,10) == this.tasksService.timeNew  )


      console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
      this.tasksService.visiteEfected = this.tasksService.listTasksFinalized
      this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

      console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
    })





    await this.taskApiService.getTypesStateTask().then(res => {
      console.log(res)
      this.tasksService.typesState = res;
      // console.log(      this.tasksService.listTasks1)
      // console.log(  this.tasksService.typesState[].initialStatusId, 'tyPESTATE')
      //       this.tasksService.visiteToDo = this.tasksService.listTasks1.filter(res => res.currentStatus)
      //       console.log(this.tasksService.visiteToDo, '1')
      //       this.tasksService.visiteToDo = this.tasksService.visiteToDo.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      // console.log(  this.tasksService.visiteToDo , '2')
      // this.tasksService.typesState  =  this.tasksService.listTasks1.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      // this.tasksService.typesState = res;
      // console.log(this.tasksService.typesState, 'Atribuido, typestate')




      // console.log(this.tasksService.listTasksById)
      // this.tasksService.typesState = this.tasksService.listTasksById.currentStatus.filter(res => res.id = "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      console.log(this.tasksService.typesState)
      console.log(this.tasksService.typesState, 'Tipos de estado')
    })

    this.tasksService.visiteToDo = this.tasksService.listTasks1.concat(this.tasksService.listTasks2, this.tasksService.listTasksSuspended )
    console.log(this.tasksService.visiteToDo, 'lista final')


    console.log(this.tasksService.visiteToDo)
    console.log(this.tasksService.listTasks1)
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length
    console.log(this.tasksService.visiteToDo, 'pq0')

    // this.tasksService.test = this.tasksService.visiteToDo.map((res) => res.currentStatus)
    // console.log(this.tasksService.test)
    // this.tasksService.test = this.tasksService.test.map((res) => {
    //   console.log(res.id)
    //   if (res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af") {

    //     // document.documentElement.style.setProperty('.light-bar', 'red')

    //     // console.log('entrou')
    //     // this.tasksService.turnColor = true;
    //   }

    //   if (res.id == "23d91faf-d13d-42b0-902b-2de5d49a31ee") {
    //     // document.getElementById("myH2").style.color = "##6495ED"
    //     // this.tasksService.turnColor = false;
    //   }
    // })


    // console.log(this.tasksService.turnColor, 'atribudo')
    // console.log(this.tasksService.turnColorOrange, 'execução ')

    this.randomNumber(1, 1000);
    this.virtualScroller();
    this.virtualScroller1();
    this.registration();


    if (this.tasksService.listTasksFinalized.length === 0) {
      this.tasksService.turnMsgAlertTask1 = true;
      this.tasksService.msgAlertTasks1 = "Ainda não se encontram tarefas concluídas"
    } else {
      this.tasksService.turnMsgAlertTask1 = false;
    }

    if (this.tasksService.visiteToDo.length === 0) {
      this.tasksService.turnMsgAlertTask = true;
      this.tasksService.msgAlertTasks = "Não existe Tarefas"
    } else {
      this.tasksService.turnMsgAlertTask = false;
    }





    console.log(this.tasksService.countVisits, 'visitas feitas')
    console.log(this.tasksService.countsToDo, 'visitas por fazer ')

    console.log(this.tasksService.visiteToDo, 'pq')
    console.log(this.tasksService.visiteEfected)



      event.target.complete();
    }, 2000);
  };

  ionViewWillEnter() {}

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  async ngOnInit() {




    console.log(this.tasksService.time)
    console.log(this.tasksService.totalTime)
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length


    // this.tasksService.handleBackButton();

    console.log(this.positionSlide)



    console.log(this.tasksService.toDo)
    await this.contactsTaskService.getEntities().then(res => {
      console.log(res)
      this.tasksService.listClients = res;
    })
    this.tasksService.allDocumentsFilter = this.tasksService.listClients


    await this.contactsTaskService.getEntitiesClients().then(res => {
      console.log(res)
      this.tasksService.listClients1 = res;
      console.log(this.tasksService.listClients1)
    })
    this.tasksService.allDocumentsFilter = this.tasksService.listClients









    // await this.taskApiService.getTasks().then(res => {
    //   console.log(res)
    //   this.tasksService.listTasks = res;
    //   console.log(this.tasksService.visiteToDo)

    //   this.tasksService.countVisits  = this.tasksService.visiteToDo.length
    //   console.log(this.tasksService.countVisits)
    //   this.tasksService.countsToDo =  this.tasksService.listTasks.length-this.tasksService.countVisits
    // })


    await this.taskApiService.getTasksItemIdAtribuited().then(res => {
      console.log(res)
      this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew )
        console.log(this.tasksService.listTasks1)

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
    // LISTA PARA BUSCAR OS DE ESTADO EM EXECUÇÃO

    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew)

      // this.tasksService.listTasks2 = res;
      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    await this.taskApiService.getTasksItemIdSuspend().then(res => {
      // this.tasksService.listTasksSuspended = res;
      this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


    })

    await this.taskApiService.getTasksItemIdCancelled().then(res => {
      // this.tasksService.listTasksCancelled = res;
      this.tasksService.listTasksCancelled = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0,10) < this.tasksService.timeNew)
      console.log(this.tasksService.listTasksCancelled, 'Tarefas canceladas')


    })

    await this.taskApiService.getTasksItemIdFinalized().then(res => {
      this.tasksService.listTasksFinalized = res;
      console.log(this.tasksService.timeNew)
      console.log(this.tasksService.listTasksFinalized)
      this.tasksService.listTasksFinalized = res.filter(res => res.endDate !==  null && res.endDate.substring(0,10) == this.tasksService.timeNew )
console.log(res)
      // this.tasksService.listTasksFinalized = res.filter(res => res.estimatedEndDate.substring(0,10) == this.tasksService.timeNew || res.estimatedEndDate != null )
      // this.tasksService.listTasksFinalized = res.filter(res => res.estimatedStartDate.substring(0,10) == this.tasksService.timeNew || this.tasksService.notesTask.statusHistory.filter(res => res.statusStartDate == "this.tasksService.timeNew") )


      console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
      this.tasksService.visiteEfected = this.tasksService.listTasksFinalized
      this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

      console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
    })




    await this.taskApiService.getTypesStateTask().then(res => {
      console.log(res)
      this.tasksService.typesState = res;
      // console.log(      this.tasksService.listTasks1)
      // console.log(  this.tasksService.typesState[].initialStatusId, 'tyPESTATE')
      //       this.tasksService.visiteToDo = this.tasksService.listTasks1.filter(res => res.currentStatus)
      //       console.log(this.tasksService.visiteToDo, '1')
      //       this.tasksService.visiteToDo = this.tasksService.visiteToDo.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      // console.log(  this.tasksService.visiteToDo , '2')
      // this.tasksService.typesState  =  this.tasksService.listTasks1.filter(res => res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      // this.tasksService.typesState = res;
      // console.log(this.tasksService.typesState, 'Atribuido, typestate')




      // console.log(this.tasksService.listTasksById)
      // this.tasksService.typesState = this.tasksService.listTasksById.currentStatus.filter(res => res.id = "28b097a1-2834-4c9f-b1c6-6b2f316401af")
      console.log(this.tasksService.typesState)
      console.log(this.tasksService.typesState, 'Tipos de estado')
    })

    this.tasksService.visiteToDo = this.tasksService.listTasks1.concat(this.tasksService.listTasks2,this.tasksService.listTasksSuspended )
    console.log(this.tasksService.visiteToDo, 'lista final')


    console.log(this.tasksService.visiteToDo)
    console.log(this.tasksService.listTasks1)
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)

    this.tasksService.countsToDo = this.tasksService.visiteToDo.length
    console.log(this.tasksService.visiteToDo, 'pq0')

    // this.tasksService.test = this.tasksService.visiteToDo.map((res) => res.currentStatus)
    // console.log(this.tasksService.test)
    // this.tasksService.test = this.tasksService.test.map((res) => {
    //   console.log(res.id)
    //   if (res.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af") {

    //     // document.documentElement.style.setProperty('.light-bar', 'red')

    //     // console.log('entrou')
    //     // this.tasksService.turnColor = true;
    //   }

    //   if (res.id == "23d91faf-d13d-42b0-902b-2de5d49a31ee") {
    //     // document.getElementById("myH2").style.color = "##6495ED"
    //     // this.tasksService.turnColor = false;
    //   }
    // })


    // console.log(this.tasksService.turnColor, 'atribudo')
    // console.log(this.tasksService.turnColorOrange, 'execução ')

    this.randomNumber(1, 1000);
    this.virtualScroller();
    this.virtualScroller1();
    this.registration();


    if (this.tasksService.listTasksFinalized.length === 0) {
      this.tasksService.turnMsgAlertTask1 = true;
      this.tasksService.msgAlertTasks1 = "Ainda não se encontram tarefas concluídas"
    } else {
      this.tasksService.turnMsgAlertTask1 = false;
    }

    if (this.tasksService.visiteToDo.length === 0) {
      this.tasksService.turnMsgAlertTask = true;
      this.tasksService.msgAlertTasks = "Não existe Tarefas"
    } else {
      this.tasksService.turnMsgAlertTask = false;
    }





    console.log(this.tasksService.countVisits, 'visitas feitas')
    console.log(this.tasksService.countsToDo, 'visitas por fazer ')

    console.log(this.tasksService.visiteToDo, 'pq')
    console.log(this.tasksService.visiteEfected)



    this.loadingController.dismiss().then(() => {
      console.log('Loading spinner dismissed');
    });

  }


  ngAfterViewInit() {

    console.log(this.input)
    // console.log(this.input1)
  }


  randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max)
    this.tasksService.random = Math.floor(Math.random() * (max - min)) + min;
    console.log(this.tasksService.random)
  }



  back() {
    //  this.loc.back();
    this.router.navigate(['/']);
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
      duration: 1500,
      message: 'Please wait...',
      translucent: false,
      cssClass: 'custom-class custom-loading'

    });

    return await loading.present();
  }




  async selectedTask(test: any) {
    await  this.presentLoadingWithOptions();

    this.tasksService.msgWarningExecuted = false;
    this.tasksService.instanceId = test.id
    this.tasksService.selectedTask = test
    console.log(this.tasksService.instanceId, 'instanceID')
    console.log(test)
    if (test.id) {
      // TAREFAS ATRIBUIDAS
      if (test.currentStatus.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af") {
        this.tasksService.turnButtonExecuted = true;
        this.tasksService.turnButton = false;
        this.tasksService.turnButtonResume = false;
        this.tasksService.finalized = true;
        // this.tasksService.turnCreatePost = true;
        // this.tasksService.turnEditPost = true;

      }
      // TAREFAS EM EXECUÇÃO
      if (test.currentStatus.id == "23d91faf-d13d-42b0-902b-2de5d49a31ee") {
        this.tasksService.turnButton = true;
        this.tasksService.turnButtonExecuted = false;
        this.tasksService.turnButtonResume = false;
        this.tasksService.finalized = true;

        // this.tasksService.turnCreatePost = true;
        // this.tasksService.turnEditPost = true;

      }
      // TAREFAS SUSPENSAS
      if(test.currentStatus.id == "00bba7ce-f90b-4ebb-9478-777376f78e93") {
        this.tasksService.turnButtonResume = true;
        this.tasksService.turnButton = false;
        this.tasksService.turnButtonExecuted = false;
        this.tasksService.finalized = true;

      }

      // TAREFAS FINALIZADAS
      if (test.currentStatus.id == "e6875497-3ad4-4121-b3aa-4efde5d12fb1") {
        this.tasksService.turnButton = false;
        this.tasksService.finalized = false;
        this.formsField.turnForm = true;

        await this.contactApiService.getNotesInstance(this.tasksService.selectedTask).then((res) => {
      // console.log(res)
      this.tasksService.notesTask = res
      console.log(this.tasksService.notesTask)
      this.tasksService.notesTask.tasks
      console.log(   this.tasksService.notesTask.tasks
        )
        console.log(this.tasksService.notesTask.formInstances[0].id)

    })
    // if (this.tasksService.notesTask.formInstances.length > 0) {
    //   let firstFormInstance = this.tasksService.notesTask[0].formInstances[0].id;
    //   console.log(firstFormInstance.id);
    //   await this.formsField.getFormsbyId(firstFormInstance.id).then((res)=> {
    //     this.formsField.formGetById = res
    //     console.log(this.formsField.formGetById, 'FORMULARIOS CORREPONDENETE A ESSE FORMID')
    //   })
    // } else {
    //   console.log("O array formInstances está vazio.");
    // }

        // this.tasksService.turnCreatePost = false;
        // this.tasksService.turnEditPost = false;
      }
      this.tasksService.infoClient$.next(test);
      console.log(test);
      console.log("1 entrou");
    }
    if (test.id == 2) {
      console.log("2 entrou");
    }

    // this.presentLoadingWithOptions();
    this.tasksService.turnTab3 = false;
    this.router.navigate(['/details-client'])
  }

  definitions() {

    this.turnAction = false;

    console.log(this.input)
    const temp: ActionSheetModel = {
      titleText: "TRAJETO",
      titleTextColor: 'c-scale-12',
      titleTextSize: "small",
      iconHeader: 'icon_send',
      iconHeaderSize: 12,
      iconHeaderColor: 'c-scale-12',
    };
    // this.actionSheetService.open(temp);
    this.action1?.open(temp);
    console.log(this.action1)
    console.log(this.input)

  }

  definitions1() {
    this.router.navigate(['settings'])
  }

  async send() {
    const toast = await this.toastController.create({
      header: 'Chegou ao destino de David Sanchez',
      message: '4765-400 | Braga - Guimarães',
      position: 'top',
      color: 'light',
      duration: 1000,
      buttons: [
        {
          side: 'start',
          icon: 'pin',
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          side: 'end',
          icon: 'close',
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    await toast.present();


  }

  boxDone() {

    this.visits = "Visitas efectuadas"
    this.tasksService.toDo = false
    console.log(this.tasksService.toDo)
    if (this.tasksService.visiteEfected.length === 0) {
      this.tasksService.turnMsgAlertTask = true;
      this.tasksService.msgAlertTasks = "Ainda não se encontram tarefas concluídas"
    } else {
      this.tasksService.turnMsgAlertTask = false;
    }

    this.virtualScroller();

  }

  boxToDo() {
    this.visits = "Visitas para hoje"
    this.tasksService.toDo = true
    console.log(this.tasksService.toDo)

    if (this.tasksService.visiteToDo.length === 0) {
      this.tasksService.turnMsgAlertTask = true;
      this.tasksService.msgAlertTasks = "Não existe mais tarefas"
    } else {
      this.tasksService.turnMsgAlertTask = false;
    }

    this.virtualScroller();

  }



  localization() {
    this.tasksService.turnAllSpots = true;
    this.router.navigate(['/google-maps'])


  }


  registration() {
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length
    this.tasksService.countsToDo = this.tasksService.visiteToDo.length
    console.log(this.tasksService.listTasks)
  }

  virtualScroller() {
    setTimeout(() => {



      const virtualScroller = this.element.nativeElement.querySelector('.toDO nc-virtual-scroller')
      const scrollable = virtualScroller.querySelector('.scrollable-content')
      this.cardHeight = this.tasksService.visiteToDo.length * 44;
      this.cardHeight1 = this.tasksService.visiteToDo.length * 8.3;
      virtualScroller.style.height = `${43}vh`;
      scrollable.style.height = `${this.cardHeight}px`;
      console.log(scrollable.style.height)
      console.log(virtualScroller.style.height)

    }, 1);

  }

  operationType() {

    this.turnAction = true;
    const temp1: ActionSheetModel = {
      titleText: "FILTER BY",
      titleTextColor: 'c-scale-12',
      titleTextSize: 'large',
      iconHeader: 'icon_options',
      iconHeaderSize: 16,
      iconHeaderColor: 'c-scale-12',
      rightButtonShow: true,
      rightButtonText: 'Aplicar filtros',
      rightButtonColor: 'primary',

    };

    // this.actionSheetService.open(temp1);
    this.action2?.open(temp1);
  }


  // slideChange(event){




  // }


  slideChanged() {


    this.virtualScroller1();

    console.log(this.positionSlide)
    this.slide.getActiveIndex().then(index => {
      console.log(index)

      this.positionSlide = index

    })
    console.log(this.change)





    if (this.positionSlide == 0) {
      this.change = true;
    }
    if (this.positionSlide == 1) {
      this.change = false;
    }



  }








  // slideChanged1(){

  //   this.slides.nativeElement.getActiveIndex().then(index => {
  //     console.log(index);
  //  });



  // }



  // ionSlideTransitionStart(){
  //   this.change = false;
  // }



  virtualScroller1() {
    setTimeout(() => {

      const virtualScroller = this.element.nativeElement.querySelector('.toDO1 nc-virtual-scroller')
      const scrollable = virtualScroller.querySelector('.scrollable-content')
      this.cardHeight = this.tasksService.listTasks1.length * 44;
      this.cardHeight1 = this.tasksService.listTasks1.length * 8.3;
      virtualScroller.style.height = `${45}vh`;
      scrollable.style.height = `${this.cardHeight}px`;


      console.log(scrollable.style.height)
      console.log(virtualScroller.style.height)

    }, 1);

  }

  filter(id) {
    if (id == 1) {
      this.tasksService.visiteToDo = this.tasksService.listTasks1.concat(this.tasksService.listTasks2,  this.tasksService.listTasksSuspended).filter(res => res.bulletName == "Entregas");
      console.log(this.tasksService.visiteToDo)
      this.tasksService.visiteEfected = this.tasksService.listTasksFinalized.filter(res => res.bulletName == "Entregas");
      this.tasksService.countVisits = this.tasksService.visiteEfected.length
      this.tasksService.countsToDo = this.tasksService.visiteToDo.length
      this.tasksService.operation = "Entregas"
      if (this.tasksService.visiteEfected.length === 0) {
        this.tasksService.turnMsgAlertTask1 = true;
        this.tasksService.msgAlertTasks1 = "Ainda não se encontram Entregas concluídas"
      } else {
        this.tasksService.turnMsgAlertTask1 = false;
      }

      if (this.tasksService.visiteToDo.length === 0) {
        this.tasksService.turnMsgAlertTask = true;
        this.tasksService.msgAlertTasks = "Não existe Entregas por fazer"
      } else {
        this.tasksService.turnMsgAlertTask = false;
      }



      this.action2.onClickCloseButton();
    }
    if (id == 2) {
      console.log(this.tasksService.visiteToDo)
      console.log(this.tasksService.listTasks1)
      console.log(this.tasksService.listTasksFinalized)
      this.tasksService.visiteToDo = this.tasksService.listTasks1.concat(this.tasksService.listTasks2,  this.tasksService.listTasksSuspended).filter(res => res.bulletName == "Incidências");
      this.tasksService.visiteEfected = this.tasksService.listTasksFinalized.filter(res => res.bulletName == "Incidências");
      console.log(this.tasksService.visiteToDo)
      this.tasksService.operation = "Incidências"
      this.tasksService.countVisits = this.tasksService.listTasksFinalized.length
      this.tasksService.countsToDo = this.tasksService.visiteToDo.length
      console.log(this.tasksService.visiteToDo)
      if (this.tasksService.visiteEfected.length === 0) {
        this.tasksService.turnMsgAlertTask1 = true;
        this.tasksService.msgAlertTasks1 = "Ainda não se encontram incidências concluídas"
      } else {
        this.tasksService.turnMsgAlertTask1 = false;
      }

      if (this.tasksService.visiteToDo.length === 0) {
        this.tasksService.turnMsgAlertTask = true;
        this.tasksService.msgAlertTasks = "Não existe Incidências por fazer"
      } else {
        this.tasksService.turnMsgAlertTask = false;
      }

      this.action2.onClickCloseButton();
    }
    if (id == 3) {
      this.tasksService.operation = "Tarefas"
      this.action2.onClickCloseButton();
    }
    if (id == 4) {
      this.tasksService.operation = "Recebimentos"
      this.action2.onClickCloseButton();
    }
    if (id == 5) {
      this.tasksService.operation = "Devoluções"
      this.action2.onClickCloseButton();
    }
  }



}

