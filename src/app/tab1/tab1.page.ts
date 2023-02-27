import { Location } from '@angular/common';
import { AfterContentChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
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
  formsService: any;


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
    public formsField: FormsService,
    public contactApiService: ContactsTaskService,
    private platform: Platform,
    public formsFields: FormsService,

  ) {






  }


  handleRefresh(event) {
    setTimeout(async () => {


      this.tasksService.timeHours();



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



      await this.taskApiService.getTasksItemIdAtribuited().then(res => {



        this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

        console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')

      })
      // LISTA PARA BUSCAR OS DE ESTADO EM EXECUÇÃO

      await this.taskApiService.getTasksItemIdExecuted().then(res => {

        this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

        console.log(this.tasksService.listTasks2, 'Tarefas em execução')


      })

      await this.taskApiService.getTasksItemIdSuspend().then(res => {

        this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

        console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


      })

      await this.taskApiService.getTasksItemIdCancelled().then(res => {


        this.tasksService.listTasksCancelled = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

        console.log(this.tasksService.listTasksCancelled, 'Tarefas canceladas')


      })

      await this.taskApiService.getTasksItemIdFinalized().then(res => {
        console.log(res)

        this.tasksService.listTasksFinalized = res.filter(res => res.endDate !== null && res.endDate.substring(0, 10) == this.tasksService.timeNew)


        console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
        this.tasksService.visiteEfected = this.tasksService.listTasksFinalized.sort((a, b) => {
          const dateA = new Date(a.endDate);
          const dateB = new Date(b.endDate);
          if (dateA > dateB) {
            return -1;
          } else if (dateA < dateB) {
            return 1;
          } else {
            return 0;
          }
        });
        console.log(this.tasksService.visiteEfected, 'lista final');
        this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

        console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
      })





      await this.taskApiService.getTypesStateTask().then(res => {
        console.log(res)
        this.tasksService.typesState = res;

        console.log(this.tasksService.typesState)
        console.log(this.tasksService.typesState, 'Tipos de estado')
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

  ionViewWillEnter() { }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  async ngOnInit() {


    this.tasksService.timeHours();





    console.log(this.tasksService.time)
    console.log(this.tasksService.totalTime)
    console.log(this.tasksService.timeNew)
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





    await this.taskApiService.getTasksItemIdAtribuited().then(res => {
      console.log(res)
      this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)
      console.log(this.tasksService.listTasks1)

      console.log(this.tasksService.listTasks1, 'Tarefas Atribuidas')


    })
    // LISTA PARA BUSCAR OS DE ESTADO EM EXECUÇÃO

    await this.taskApiService.getTasksItemIdExecuted().then(res => {
      this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)


      console.log(this.tasksService.listTasks2, 'Tarefas em execução')


    })

    await this.taskApiService.getTasksItemIdSuspend().then(res => {

      this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

      console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


    })

    await this.taskApiService.getTasksItemIdCancelled().then(res => {

      this.tasksService.listTasksCancelled = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)
      console.log(this.tasksService.listTasksCancelled, 'Tarefas canceladas')


    })

    await this.taskApiService.getTasksItemIdFinalized().then(res => {
      this.tasksService.listTasksFinalized = res;
      console.log(this.tasksService.timeNew)
      console.log(this.tasksService.listTasksFinalized)
      this.tasksService.listTasksFinalized = res.filter(res => res.endDate !== null && res.endDate.substring(0, 10) == this.tasksService.timeNew)
      console.log(res)


      console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
      this.tasksService.visiteEfected = this.tasksService.listTasksFinalized.sort((a, b) => {
        const dateA = new Date(a.endDate);
        const dateB = new Date(b.endDate);

        console.log(dateA)
        console.log(dateB)
        if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        } else {
          return 0;
        }
      });

      this.tasksService.countVisits = this.tasksService.listTasksFinalized.length


      console.log(this.tasksService.visiteEfectedTest);

      console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
    })




    await this.taskApiService.getTypesStateTask().then(res => {
      console.log(res)
      this.tasksService.typesState = res;



      console.log(this.tasksService.typesState)
      console.log(this.tasksService.typesState, 'Tipos de estado')
    })




    console.log(this.tasksService.visiteToDo)
    console.log(this.tasksService.listTasks1)
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.countVisits)
    //LISTA TODO QUE é para fazer primeiro por Ordem dos estados (exe - atri- Final ) e depois por ordem alfabética

    this.tasksService.visiteToDo = [
      ...this.tasksService.listTasks2.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName)),
      ...this.tasksService.listTasks1.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName)),
      ...this.tasksService.listTasksSuspended.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName))
    ];
    console.log(this.tasksService.visiteToDo, 'lista final');


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


    // TRAZER O HISTORICO DAS TAREFAS FINALIZADAS PELO UTILIZADOR --------------------------------


    await this.taskApiService.getTasksItemIdFinalized().then(async res => {
      this.tasksService.listTasksFinalizedHistory = res;


      // this.tasksService.listTasksFinalizedHistory1  = this.tasksService.listTasksFinalizedHistory;

      // this.tasksService.listTasksFinalizedHistory
      console.log(this.tasksService.listTasksFinalizedHistory, 'HISTÓRICO DAS TAREFAS')




      this.tasksService.listTasksFinalizedHistory1 = this.tasksService.listTasksFinalizedHistory.map((res) => {
        return {
          ...res,
          endDate: res.endDate ? res.endDate.substring(0, 10) : "Sem data"
        };
      });

      await this.tasksService.sortedListHistoric();


    })


    console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
    this.tasksService.visiteEfected = this.tasksService.listTasksFinalized.sort((a, b) => {
      const dateA = new Date(a.endDate);
      const dateB = new Date(b.endDate);

      console.log(dateA)
      console.log(dateB)
      if (dateA > dateB) {
        return -1;
      } else if (dateA < dateB) {
        return 1;
      } else {
        return 0;
      }
    });

    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
    console.log(this.tasksService.listTasksFinalizedHistory1)
    console.log(this.tasksService.listTasksFinalizedHistory2)

    // ----------------------------------------------------------------------------------------------------------------

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
    await this.presentLoadingWithOptions();

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
        this.formsField.turnForm = false;

        // this.formsField.turnNoForms = false;
        // this.tasksService.turnCreatePost = true;
        // this.tasksService.turnEditPost = true;

      }
      // TAREFAS EM EXECUÇÃO
      if (test.currentStatus.id == "23d91faf-d13d-42b0-902b-2de5d49a31ee") {
        this.tasksService.turnButton = true;
        this.tasksService.turnButtonExecuted = false;
        this.tasksService.turnButtonResume = false;
        this.tasksService.finalized = true;
        this.formsField.turnForm = false;

        // this.formsField.turnNoForms = false;


        // this.tasksService.turnCreatePost = true;
        // this.tasksService.turnEditPost = true;

      }
      // TAREFAS SUSPENSAS
      if (test.currentStatus.id == "00bba7ce-f90b-4ebb-9478-777376f78e93") {
        this.tasksService.turnButtonResume = true;
        this.tasksService.turnButton = false;
        this.tasksService.turnButtonExecuted = false;
        this.tasksService.finalized = true;
        this.formsField.turnForm = false;
        // this.formsField.turnNoForms = false;

      }

      // TAREFAS FINALIZADAS
      if (test.currentStatus.id == "e6875497-3ad4-4121-b3aa-4efde5d12fb1") {
        this.tasksService.turnButton = false;
        this.tasksService.finalized = false;
        this.formsField.turnForm = true;
        this.tasksService.turnTab3 = false;



        // this.formsField.turnNoForms = true;

        await this.contactApiService.getNotesInstance(this.tasksService.selectedTask).then((res) => {
          // console.log(res)
          this.tasksService.notesTask = res
          console.log(this.tasksService.notesTask)
          this.tasksService.notesTask.tasks
          console.log(this.tasksService.notesTask.formInstances[0])

        })
        if (this.tasksService.notesTask.formInstances.length > 0) {
          let firstFormInstance = this.tasksService.notesTask.formInstances[0];
          console.log(firstFormInstance);
          await this.formsField.getFormsbyId(this.tasksService.notesTask.formInstances[0]).then((res) => {
            this.formsField.formGetById = res
            this.formsField.fileIdClient = this.formsField.formGetById.fields.fileFields[0].fileId
            this.formsField.fileIdTecnhic = this.formsField.formGetById.fields.fileFields[1].fileId
            console.log(this.formsField.formGetById)
            if (this.formsField.formGetById.fields.booleanFields[0].value == false) {
              this.formsField.formGetById.fields.booleanFields[0].value = 'SIM'
            } else {
              this.formsField.formGetById.fields.booleanFields[0].value = "NÃO"
            }
            if (this.formsField.formGetById.fields.booleanFields[1].value == false) {
              this.formsField.formGetById.fields.booleanFields[1].value = 'SIM'
            } else {
              this.formsField.formGetById.booleanFields[1].value = "NÃO"
            }



            this.formsField.structure = this.formsField.formGetById.fields
            console.log(this.formsField.structure);
            const strutureList = [
              {
                title: 'Tipo da Tarefa',
                fieldName: this.formsField.structure.optionFields[0].values[0].name
              },
              {
                title: 'Pedido ao OVM ?',
                fieldName: this.formsField.structure.booleanFields[0].value
              },
              {
                title: 'Pedido ao OVM - Porque ?',
                fieldName: this.formsField.structure.textFields[5].value
              },
              {
                title: 'Trabalho Finalizado ?',
                fieldName: this.formsField.structure.booleanFields[1].value
              },
              {
                title: 'Trabalho finalizado - Porque ?',
                fieldName: this.formsField.structure.textFields[5].value
              },
              {
                title: 'Data da Tarefa',
                fieldName: this.formsField.structure.dateFields[0].value.substring(0, 19).replace("T", " às ")
              },
              {
                title: 'Data de inicio da deslocação',
                fieldName: this.formsField.structure.dateFields[3]?.value?.substring(0, 19)?.replace("T", " às ")
              },
              {
                title: 'Data de fim da deslocação',
                fieldName: this.formsField.structure.dateFields[1]?.value?.substring(0, 19)?.replace("T", " às ")
              },
              {
                title: 'Data de inicio do trabalho',
                fieldName: this.formsField.structure.dateFields[4].value.substring(0, 19).replace("T", " às ")
              },
              {
                title: 'Data de fim do trabalho',
                fieldName: this.formsField.structure.dateFields[2].value.substring(0, 19).replace("T", " às ")
              },
              {
                title: 'Origem da deslocação',
                fieldName: this.formsField.structure.textFields[4].value
              },
              {
                title: 'Destino da deslocação',
                fieldName: this.formsField.structure.textFields[1].value
              },
              {
                title: 'Matricula',
                fieldName: this.formsField.structure.textFields[3].value
              },
              {
                title: 'Kilometros',
                fieldName: this.formsField.structure.decimalFields[0].value
              },

              {
                title: 'Anomalias encontradas',
                fieldName: this.formsField.structure.textFields[0].value
              },
              {
                title: 'Materias Aplicados',
                fieldName: this.formsField.structure.textFields[2].value
              },
              {
                title: 'Trabalho efetuado',
                fieldName: this.formsField.structure.textFields[6].value
              }
            ]



            this.formsField.structureList = strutureList



            console.log(this.formsField.formGetById, 'FORMULARIOS CORREPONDENETE A ESSE FORMID')
          })

          if (this.formsField.formGetById.fields.fileFields[0].fileId !== null && this.formsField.formGetById.fields.fileFields[1].fileId !== null) {



            await this.formsField.getFormsbyId(this.tasksService.notesTask.formInstances[0]).then(async (res) => {
              const formFields = res.fields.fileFields;
              const fieldIds = {};
              const fileValues = [];

              formFields.forEach((field) => {
                if (field.fieldId && field.fileId !== null) {
                  fieldIds[field.fieldId] = field.fileId;
                }
              });

              for (const fieldId in fieldIds) {
                const fileId = fieldIds[fieldId];
                await this.formsField.getImageById(fileId).then((res) => {
                  if (res.file !== null) {
                    fileValues.push(res.file);
                  }
                });
              }

              if (fileValues.length >= 2) {

                console.log(fileValues);

                this.formsField.image1 = 'data:image/png;base64,' + fileValues[2];
                this.formsField.image2 = 'data:image/png;base64,' + fileValues[3];
                this.formsField.image3 = 'data:image/png;base64,' + fileValues[4];
                this.formsField.image4 = 'data:image/png;base64,' + fileValues[5];
                this.formsField.image5 = 'data:image/png;base64,' + fileValues[6];
                this.formsField.image6 = 'data:image/png;base64,' + fileValues[7];
                this.formsField.image7 = 'data:image/png;base64,' + fileValues[8];
                this.formsField.image8 = 'data:image/png;base64,' + fileValues[9];
              }

              console.log(this.formsField.image1)
              console.log(this.formsField.image2)
              console.log(this.formsField.image3)
              console.log(this.formsField.image4)
              console.log(this.formsField.image5)
              console.log(this.formsField.image6)
              console.log(this.formsField.image7)
              console.log(this.formsField.image8)
            });

            await this.formsField.getImageById(this.formsField.fileIdClient).then((res) => {
              this.formsField.imgClient = res.file
              console.log(this.formsField.imgClient, ' IMAGEM CLIENTE')
              this.formsField.imgClient = 'data:image/png;base64,' + this.formsField.imgClient
              console.log(this.formsField.imgClient)

            })
            await this.formsField.getImageById(this.formsField.fileIdTecnhic).then((res) => {
              this.formsField.imgTecnhic = res.file
              this.formsField.imgTecnhic = 'data:image/png;base64,' + this.formsField.imgTecnhic

              console.log(this.formsField.imgTecnhic, ' IMAGEM TECNCO')
            })







          } else {
            console.log('tem campos vazios ')
          }
        } else {
          console.log("O array formInstances está vazio.");
        }

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
      // this.cardHeight = this.tasksService.visiteToDo.length * 44;
      // this.cardHeight1 = this.tasksService.visiteToDo.length * 7;
      virtualScroller.style.height = `${45}vh`;
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



  virtualScroller1() {
    setTimeout(() => {

      const virtualScroller = this.element.nativeElement.querySelector('.toDO1 nc-virtual-scroller')
      const scrollable = virtualScroller.querySelector('.scrollable-content')
      // this.cardHeight = this.tasksService.listTasks1.length * 44;
      // this.cardHeight1 = this.tasksService.listTasks1.length * 7;
      virtualScroller.style.height = `${45}vh`;
      scrollable.style.height = `${this.cardHeight}px`;


      console.log(scrollable.style.height)
      console.log(virtualScroller.style.height)

    }, 1);

  }

  filter(id) {
    if (id == 1) {
      this.tasksService.visiteToDo = [...this.tasksService.listTasks2.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName)),
      ...this.tasksService.listTasks1.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName)),
      ...this.tasksService.listTasksSuspended.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName))].filter(res => res.bulletName == "Entregas");
      console.log(this.tasksService.visiteToDo)

      this.tasksService.visiteEfected = this.tasksService.listTasksFinalized.sort((a, b) => {
        const dateA = new Date(a.endDate);
        const dateB = new Date(b.endDate);
        if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        } else {
          return 0;
        }
      }).filter(res => res.bulletName == "Entregas");
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
      this.tasksService.visiteToDo = [...this.tasksService.listTasks2.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName)),
      ...this.tasksService.listTasks1.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName)),
      ...this.tasksService.listTasksSuspended.sort((a, b) => a.entity.firstName.localeCompare(b.entity.firstName))].filter(res => res.bulletName == "Incidências");
      console.log(this.tasksService.visiteToDo)
      this.tasksService.visiteEfected = this.tasksService.visiteEfected = this.tasksService.listTasksFinalized.sort((a, b) => {
        const dateA = new Date(a.endDate);
        const dateB = new Date(b.endDate);
        if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        } else {
          return 0;
        }
      }).filter(res => res.bulletName == "Incidências");
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

