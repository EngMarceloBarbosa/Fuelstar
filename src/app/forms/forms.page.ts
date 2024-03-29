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


  notes1: any;
  notes2: any;

  sureOption: string;
  optionOVM: string;
  showReason = false;
  showReasonOvm = false;
  showDeslocation = true;

  dateFormsStep1 = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    dateOfTheDay: new FormControl('', [Validators.required]),
    departure: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    kilometers: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    registration: new FormControl('', [Validators.required]),

  });

  dateFormsStep2 = new FormGroup({
    materials: new FormControl(''),
    anomalias: new FormControl(''),
    trabalho: new FormControl('')
  });

  dateFormsStep3 = new FormGroup({
    sure: new FormControl('', [Validators.required]),
    reason: new FormControl(''),
    sureOVM: new FormControl(''),
    reasonOVM: new FormControl(''),
    initialDate: new FormControl(''),
    finalDate: new FormControl(''),
  });

  dateFormsStep4 = new FormGroup({
    signatures: new FormControl('')
  });

  finalForm = new FormGroup ({
   dateFormsStep1 : this.dateFormsStep1,
   dateFormsStep2 : this.dateFormsStep2,
   dateFormsStep3 : this.dateFormsStep3,
   dateFormsStep4 : this.dateFormsStep4,

  })

  submitted = false;
  startDate = new Date().toISOString();
  endDate = new Date().toISOString();

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
  constructor(private router: Router, public tasksService: TasksService, private fb: FormBuilder, private alertService: AlertService, private actionSheetService: ActionSheetService, private contactsTaskService: ContactsTaskService, public taskApiService: TaskApiService, public contactApiService: ContactsTaskService, private camera: Camera, private toastController: ToastController) {

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
      quality: 60,
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
  drawComplete1() {
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
    this.showReason = this.sureOption === 'no';
  }
  onSelectChange1() {
    this.showReasonOvm = this.optionOVM === 'no';
  }
  onSelectChange2() {
    this.showDeslocation = this.sureOption === 'Externa';
    this.submitted = false;
  }




  next() {

    this.submitted = false;
    if (this.dateFormsStep1.valid || (this.sureOption === 'Interna' && this.dateFormsStep1.value.dateOfTheDay != "")) {
      this.submitted = false;
      console.log(this.dateFormsStep1.value);
      if (this.dateFormsStep2.valid) {

        console.log(this.dateFormsStep2.value);
        if (this.dateFormsStep3.valid) {
          console.log(this.dateFormsStep3.value)
        }
        console.log(this.signatureImageClient)
        console.log(this.finalForm.value, 'Formulário FINAL ')

        if (this.currentStep === 3 && this.signatureImageClient != "" && this.signatureImageTecnic != "") {
          console.log('PASSOU PODE AVANÇAR ')
          console.log(this.signatureImageClient)


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



        } else {
          console.log('PREECNHA A ASSINATURA ')
        }
      }
      this.currentStep = Math.min(this.steps.length - 1, this.currentStep + 1);
      // You can also send the form data to your server here
    } else {
      this.submitted = true;
      console.log("form is invalid");
      // Check if any of the fields are empty
      if (this.dateFormsStep1.get('startDate').value === '') {
        console.log('Start date is required');
      }
      if (this.dateFormsStep1.get('endDate').value === '') {
        console.log('End date is required');
      }
      if (this.dateFormsStep1.get('departure').value === '') {
        console.log('Departure location is required');
      }
      if (this.dateFormsStep1.get('destination').value === '') {
        console.log('Destination location is required');
      }
    }
  }

  previous() {
    this.currentStep = Math.max(0, this.currentStep - 1);
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
    if (this.dateFormsStep1.valid) {
      this.submitted = false;
      console.log(this.dateFormsStep1.value);
      if (this.dateFormsStep2.valid) {

        console.log(this.dateFormsStep2.value);
        if (this.signatureImageClient != "") {
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
      if (this.dateFormsStep1.get('startDate').value === '') {
        console.log('Start date is required');
      }
      if (this.dateFormsStep1.get('endDate').value === '') {
        console.log('End date is required');
      }
      if (this.dateFormsStep1.get('departure').value === '') {
        console.log('Departure location is required');
      }
      if (this.dateFormsStep1.get('destination').value === '') {
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

}
