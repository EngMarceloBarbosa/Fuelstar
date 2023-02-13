import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../shared/services/tasks.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad';
import { ActionSheetService, AlertService, ModalMessageModel } from '@nc-angular/library-mobile.stg';
import { ContactsTaskService } from '../shared/http/contactsTask-api.service';
import { TaskApiService } from '../shared/http/task-api.service';
import { InstancePatch } from '../utils/models/tasks';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import { FormsService } from '../shared/services/forms.service';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {

  @ViewChild('signature1') public signaturePad: SignaturePad;
  @ViewChild('signature2') public signaturePad1: SignaturePad;

  signaturePadOptions: Object = {
    'minWidth': 5,
    'canvasWidth': 210,
    'canvasHeight': 210
  };

  public signatureImageClient: string = "";
  public signatureImageTecnic: string = "";

  image4:any;
  notes1: any;
  notes2: any;
idOption:any;
  sureOption: boolean;
  optionOVM: boolean;
  typeOption:string;
  showReason = false;
  showReasonOvm = false;
  showDeslocation = true;






  submitted = false;
  submitted3 = false;
  startDate = new Date().toISOString();
  endDate = new Date().toISOString();
  startDateJob = new Date().toISOString();
  endDateJob = new Date().toISOString();

  today = new Date().toISOString();
  steps = [
    { label: 'Passo 1' },
    { label: 'Passo 2' },
    { label: 'Passo 3' },
    { label: 'Passo 4' }
  ];


  form: FormGroup;
  currentStep = 0;
  // selectedImage: string;
  selectedImages = []
  rows: string[][] = [];
  constructor(private router: Router, public tasksService: TasksService, private fb: FormBuilder, private alertService: AlertService, private actionSheetService: ActionSheetService, private contactsTaskService: ContactsTaskService, public taskApiService: TaskApiService, public contactApiService: ContactsTaskService, private camera: Camera, private toastController: ToastController, public formsFields: FormsService) {

  }




  ngOnInit() {


  }

  // ngAfterViewInit() {
  //   // this.signaturePad is now available
  //   // this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
  //   this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  // }

  selectImages() {
    const options: CameraOptions = {
      quality: 15,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

      this.selectedImages.push('data:image/jpeg;base64,' + imageData);
      console.log(this.selectedImages)
      this.groupImages();
    }, (err) => {
      console.log(err);
    });
  }

  groupImages() {
    this.rows = [];
    for (let i = 0; i < this.selectedImages.length; i += 3) {
      this.rows.push(this.selectedImages.slice(i, i + 3));
    }
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


  drawComplete() {
    console.log('ENTROU AQUI')
    this.signatureImageClient = this.signaturePad.toDataURL();
    console.log(this.signatureImageClient)
  }
  drawComplete1(e) {
console.log(e, 'aqui 3')
    console.log('ENTROU AQUI')
    this.signatureImageTecnic = this.signaturePad1.toDataURL();
    console.log(this.signatureImageTecnic)
  }

  drawClear() {
    this.signaturePad.clear();
    this.signatureImageClient = "";
  }
  drawClear1() {
    this.signaturePad1.clear();
    this.signatureImageTecnic = "";
  }


  canvasResize() {
    let canvas = document.querySelector('canvas');
    console.log(window.innerHeight);
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight - (0.19 * window.innerHeight)
  }

  drawStart() {
    console.log('begin drawing');
  }



  submit() {
    console.log(this.form.value);
  }


  back() {
    this.router.navigate(["/details-client"]);

  }

  onSelectChange() {

    this.showReason = this.formsFields.dateFormsStep3.value.sure == "false"
    console.log(    this.showReason)
    // this.sureOption === 'no'


  }
  onSelectChange1() {
    this.showReasonOvm = this.formsFields.dateFormsStep3.value.sureOVM == "true"
    // this.showReasonOvm =false;


  }
  onSelectChange2() {
    this.showDeslocation = this.typeOption === 'Externa';
    this.submitted = false;

    if(this.typeOption === 'Externa'){
      this.idOption = "00000000-0000-0000-0003-000000000002"
    }
    if(this.typeOption === 'Interna'){
      this.idOption = "00000000-0000-0000-0003-000000000001"
    }
  }




  async next() {

    console.log(this.formsFields.dateFormsStep1.value.dateOfTheDay)
    console.log(this.formsFields.dateFormsStep1)

    this.submitted = false;
    if (this.formsFields.dateFormsStep1.valid || (this.formsFields.dateFormsStep1.value.type === 'Interna' && this.formsFields.dateFormsStep1.value.dateOfTheDay != "")) {
      this.submitted = false;
      console.log(this.formsFields.dateFormsStep1.value);
      if (this.formsFields.dateFormsStep2.valid) {

        console.log(this.formsFields.dateFormsStep2.value);
        if (this.formsFields.dateFormsStep3.valid) {
          console.log(this.formsFields.dateFormsStep3.value)
        }
        console.log(this.signatureImageClient)
        console.log(this.formsFields.finalForm.value, 'Formulário FINAL ')

        if (this.currentStep === 3 && this.signatureImageClient != "" && this.signatureImageTecnic != "") {
          console.log('PASSOU PODE AVANÇAR ')
          console.log(this.signatureImageClient)

          const forms = {
            formId: "DB6F3078-8B55-4628-861A-81F56CF57D7D",
            fields: {
              dateFields : [
                {
                fieldId: "00000000-0000-0000-0000-000000000002",
                value: this.formsFields.dateFormsStep1.value.dateOfTheDay

                },
                {
                  fieldId: "00000000-0000-0000-0000-000000000004",
                  value : this.formsFields.dateFormsStep1.value.startDate

                },
                {
                  fieldId: "00000000-0000-0000-0000-000000000005",
                  value : this.formsFields.dateFormsStep1.value.endDate

                },
                {
                  fieldId: "00000000-0000-0000-0000-000000000017",
                  value : this.formsFields.dateFormsStep3.value.initialDate

                },
                {
                  fieldId: "00000000-0000-0000-0000-000000000018",
                  value : this.formsFields.dateFormsStep3.value.finalDate

                }


              ],
              booleanFields : [
                {
                  fieldId: "00000000-0000-0000-0000-000000000015",
                  value : this.formsFields.dateFormsStep3.value.sure
                },
                {
                  fieldId: "00000000-0000-0000-0000-000000000013",
                  value : this.formsFields.dateFormsStep3.value.sureOVM
                }
              ],
              textFields : [
                {
                  fieldId: "00000000-0000-0000-0000-000000000006",
                  value : this.formsFields.dateFormsStep1.value.departure
                },
                {
                  fieldId: "00000000-0000-0000-0000-000000000007",
                  value : this.formsFields.dateFormsStep1.value.destination
                },
                {
                  fieldId: "00000000-0000-0000-0000-000000000009",
                  value : this.formsFields.dateFormsStep1.value.registration
                },
                {
                  fieldId: "00000000-0000-0000-0000-000000000014",
                  value : this.formsFields.dateFormsStep3.value.reason
                },
                {
                  fieldId: "00000000-0000-0000-0000-000000000016",
                  value : this.formsFields.dateFormsStep3.value.reason
                },
                {
                  fieldId: "00000000-0000-0000-0000-000000000010",
                  value : this.formsFields.dateFormsStep2.value.materials
                },
                {
                  fieldId: "00000000-0000-0000-0000-000000000011",
                  value : this.formsFields.dateFormsStep2.value.anomalias
                },
                {
                  fieldId: "00000000-0000-0000-0000-000000000012",
                  value : this.formsFields.dateFormsStep2.value.trabalho
                },

              ],
              optionFields: [
                {
                  fieldId: "00000000-0000-0000-0000-000000000003",
                  values : [
                    {
                      id: this.idOption,
                      name: this.formsFields.dateFormsStep1.value.type
                    }
                  ]
                }
              ],
              decimalFields: [
                {
                  fieldId: "00000000-0000-0000-0000-000000000008",
                  value : this.formsFields.dateFormsStep1.value.kilometers
                }
              ]

            }

          }


          console.log(forms, 'O QUE FOI MANDADO')
console.log( this.formsFields.dateFormsStep1.value.dateOfTheDay, 'valor do dia ');
          await this.formsFields.postForms(forms).then((res)=> {

            this.tasksService.formsSave = res
            this.formsFields.idForm = res.id

            console.log(       this.formsFields.idForm)



            console.log(res, 'FOI GRAVADO')
           })

           await this.formsFields.submitForms(this.formsFields.idForm).then((res)=> {
            this.formsFields.formsSubmit = res;
            console.log(this.formsFields.formsSubmit)
           })
           const formId = [

            this.formsFields.idForm


          ]
          console.log(formId)
           await this.formsFields.PostsubmitForms( formId, this.tasksService.selectedTask.id).then((res)=> {
            console.log(res)

            this.formsFields.postFormsAfterProcess = res;
           })


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
          this.alertService.open(temp);4


          this.tasksService.notes = "";



        } else {
          console.log('PREECNHA A ASSINATURA ')
        }
      }
      // if(this.currentStep == 0 ) {
      // this.currentStep = Math.min(this.steps.length - 1, this.currentStep + 1);
      // console.log(this.currentStep)
      // }
      //   if(this.currentStep == 1 && this.formsFields.dateFormsStep2.valid){
      // this.currentStep = Math.min(this.steps.length - 1, this.currentStep + 1);
      // console.log(this.currentStep)
      //   }
      //   if(this.currentStep == 2 && this.formsFields.dateFormsStep3.valid){
      //     this.currentStep = Math.min(this.steps.length - 1, this.currentStep + 1);
      //     console.log(this.currentStep)
      //       }

      if (this.currentStep == 0) {

          this.currentStep = Math.min(this.steps.length - 1, this.currentStep + 1);
          console.log(this.currentStep);

      } else if (this.currentStep == 1) {
        if (this.formsFields.dateFormsStep2.valid) {
          this.currentStep = Math.min(this.steps.length - 1, this.currentStep + 1);
          console.log(this.currentStep);
        }
      } else if (this.currentStep == 2) {
        if (this.formsFields.dateFormsStep3.valid) {

          this.currentStep = Math.min(this.steps.length - 1, this.currentStep + 1);
          console.log(this.currentStep);
          this.submitted3 = false;
        }else{
          this.submitted3 = true;
        }
      }


      console.log(this.currentStep )
      // You can also send the form data to your server here
    } else {
      this.submitted = true;

      console.log("form is invalid");
      // Check if any of the fields are empty
      if (this.formsFields.dateFormsStep1.get('startDate').value === '') {
        console.log('Start date is required');
      }
      if (this.formsFields.dateFormsStep1.get('endDate').value === '') {
        console.log('End date is required');
      }
      if (this.formsFields.dateFormsStep1.get('departure').value === '') {
        console.log('Departure location is required');
      }
      if (this.formsFields.dateFormsStep1.get('destination').value === '') {
        console.log('Destination location is required');
      }
    }
  }

  previous() {
    this.currentStep = Math.max(0, this.currentStep - 1);
    console.log(this.currentStep)
  }



  async buttonFinalized() {
    console.log(JSON.parse(JSON.stringify(this.tasksService.notesTask)));
    let data: InstancePatch = new InstancePatch(this.tasksService.notesTask);
    console.log(data, 'lista data')

    if (this.tasksService.selectedTask.currentStatus.id == "00bba7ce-f90b-4ebb-9478-777376f78e93") {
      this.tasksService.msgWarningExecuted = true;
    } else {
      console.log(data, 'lista data')

      await this.tasksService.putTaskFinalize();

      // const updateTask2 = [{

      //  entityRoleId: this.tasksService.notesTask.entityRoles[1].entityRoleId,
      //   isParticipant: this.tasksService.notesTask.entityRoles[1].isParticipant,
      //   isMain: this.tasksService.notesTask.entityRoles[1].isMain,
      //   entityRoleName: this.tasksService.notesTask.entityRoles[1].entity.id,
      // }]
      // const updateTask3 = {
      //   documentInstances1: this.tasksService.selectedTask.id,
      //   documentType: '0'
      // }

      // const updateTask1 = {

      //   name: this.tasksService.selectedTask.name,
      //   description: this.tasksService.selectedTask.description,
      //   note:this.tasksService.selectedTask.note,
      //   isImportant: this.tasksService.selectedTask.isImportant,
      //   projectId:this.tasksService.selectedTask.projectId,
      //   itemId: this.tasksService.selectedTask.item,
      //   address: this.tasksService.selectedTask.address,
      //   documentInstances1: updateTask3,
      //   entities: updateTask2,
      //   tags:null,
      //   estimatedStartDate: this.tasksService.selectedTask.estimatedStartDate,
      //   startDate: this.tasksService.selectedTask.startDate,
      //   estimatedEndDate: this.tasksService.totalTime,
      //   endDate : this.tasksService.selectedTask.endDate,
      //   formInstances: null
      // }

      // console.log(updateTask1)

      const updateTaskPatch = {
        // ...data,
        endDate: this.tasksService.totalTimeZ,
        estimatedStartDate: this.tasksService.notesTask.estimatedStartDate,
        startDate: this.tasksService.notesTask.estimatedStartDate,
        estimatedEndDate: this.tasksService.notesTask.estimatedEndDate
      }



      // const updateTask = {

      //   estimatedStartDate:this.tasksService.notesTask.estimatedStartDate,
      //   startDate:this.tasksService.notesTask.estimatedStartDate,
      //   endDate:this.tasksService.totalTime,
      //   estimatedEndDate: this.tasksService.notesTask.estimatedEndDate
      // }
      console.log(this.tasksService.notesTask, 'COPIA DA LISTA')
      console.log(updateTaskPatch, 'LISTA MANDADA ')
      console.log(this.tasksService.notesTask.id, 'ID DA LISTA ')

      await this.taskApiService.updateTasksItemIdFinalizedDates(this.tasksService.notesTask.id, updateTaskPatch).then(res => {
        this.tasksService.updateTask = res;
        console.log(this.tasksService.updateTask, 'UPDATE TASK SELECIONADA')
      })

      await this.contactApiService.getNotesInstance(this.tasksService.selectedTask).then(res => {
        this.tasksService.notesTask = res;
        console.log(this.tasksService.notesTask, 'versão atualizada')
      })
      await this.taskApiService.getTasksItemIdFinalized().then(res => {
        this.tasksService.listTasksFinalized = res;
        console.log(this.tasksService.listTasksFinalized)
        this.tasksService.listTasksFinalized = res.filter(res => res.endDate !== null && res.endDate.substring(0, 10) == this.tasksService.timeNew)


        console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
        this.tasksService.visiteEfected = this.tasksService.listTasksFinalized
        this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

        console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
      })








      await this.taskApiService.getTypesStateTask();


      this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

      console.log(this.tasksService.countVisits)

      this.tasksService.countsToDo = this.tasksService.visiteToDo.length





      await this.taskApiService.getTasksItemIdExecuted().then(res => {
        // this.tasksService.listTasks2 = res;
        this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

        console.log(this.tasksService.listTasks2, 'Tarefas em execução')


      })

      await this.taskApiService.getTasksItemIdAtribuited().then(res => {
        // this.tasksService.listTasks1 = res;
        this.tasksService.listTasks1 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

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
        this.tasksService.listTasksSuspended = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

        console.log(this.tasksService.listTasksSuspended, 'Tarefas Suspensas')


      })

      await this.taskApiService.getTasksItemIdFinalized().then(res => {
        // this.tasksService.listTasksFinalized = res;
        console.log(this.tasksService.listTasksFinalized)
        this.tasksService.listTasksFinalized = res.filter(res => res.endDate !== null && res.endDate.substring(0, 10) == this.tasksService.timeNew)

        console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
        this.tasksService.visiteEfected = this.tasksService.listTasksFinalized
        this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

        console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
      })

      await this.taskApiService.getTasksItemIdExecuted().then(res => {
        // this.tasksService.listTasks2 = res;
        this.tasksService.listTasks2 = res.filter(res => res.estimatedStartDate.substring(0, 10) == this.tasksService.timeNew || res.estimatedStartDate.substring(0, 10) < this.tasksService.timeNew)

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


      if (this.tasksService.visiteToDo.length === 0) {
        this.tasksService.turnMsgAlertTask = true;
        this.tasksService.msgAlertTasks = "Não existe Tarefas"
      } else {
        this.tasksService.turnMsgAlertTask = false;
      }


      if (this.tasksService.listTasksFinalized.length === 0) {
        this.tasksService.turnMsgAlertTask1 = true;
        this.tasksService.msgAlertTasks1 = "Ainda não se encontram tarefas concluídas"
      } else {
        this.tasksService.turnMsgAlertTask1 = false;
      }
      this.tasksService.msgWarningExecuted = false;

      this.router.navigate(["/tabs/tab1"]);

    }

    this.presentSuccessToast();

  }


  // BOTÃO PARA VER O FORM DA DESLOCAÇÃO


  onSubmit() {
    this.submitted = false;
    if (this.formsFields.dateFormsStep1.valid) {
      this.submitted = false;
      console.log(this.formsFields.dateFormsStep1.value);
      if (this.formsFields.dateFormsStep2.valid) {

        console.log(this.formsFields.dateFormsStep2.value);
        if (this.signatureImageClient != "") {



          //Form Data

      //     let form = new FormData();

      // form.append('FirstName', this.tasksService.valueFirstName);

//VER ISTO
          // this.formsFields.putImageForms(this.tasksService.selectedTask.id, )
          console.log('PASSOU PODE AVANÇAR ')
        } else {
          console.log('PREECNHA A ASSINATURA ')
        }
      }
      // You can also send the form data to your server here
    } else {
      this.submitted = true;
      console.log("form is invalid");
      // Check if any of the fields are empty
      if (this.formsFields.dateFormsStep1.get('startDate').value === '') {
        console.log('Start date is required');
      }
      if (this.formsFields.dateFormsStep1.get('endDate').value === '') {
        console.log('End date is required');
      }
      if (this.formsFields.dateFormsStep1.get('departure').value === '') {
        console.log('Departure location is required');
      }
      if (this.formsFields.dateFormsStep1.get('destination').value === '') {
        console.log('Destination location is required');
      }
    }
  }

  modelChangeFn(e) {
    this.notes1 = e;
    console.log(this.notes1);

  }
  modelChangeFn1(e) {
    this.notes2 = e;
    console.log(this.notes2);

  }
  modelChangeFn2(e) {
    this.notes2 = e;
    console.log(this.notes2);

  }

  modelChangeFn3(e){
    this.image4 = e;
    console.log(this.image4);
  }



}
