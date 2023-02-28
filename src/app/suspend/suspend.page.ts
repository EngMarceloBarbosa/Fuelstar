import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActionSheetService, AlertService } from '@nc-angular/library-mobile.stg';
import { ContactsTaskService } from '../shared/http/contactsTask-api.service';
import { TaskApiService } from '../shared/http/task-api.service';
import { FormsService } from '../shared/services/forms.service';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-suspend',
  templateUrl: './suspend.page.html',
  styleUrls: ['./suspend.page.scss'],
})
export class SuspendPage implements OnInit {

  constructor(private router: Router, private toastController: ToastController, public formsFields: FormsService, public tasksService: TasksService, public taskApiService : TaskApiService) { }

  ngOnInit() {
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

  back(){
    this.router.navigate(['/details-client'])
  }

  modelChangeFn(e){
  this.tasksService.noteSuspend = e

  console.log(this.tasksService.noteSuspend.detail.value)
  }



async save() {
  if(this.tasksService.noteSuspend.length == 0){
console.log('não entrou ')
  }else{
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
  this.tasksService.noteSuspend = "";
  this.presentSuccessToast();

  this.router.navigate(["/tabs/tab1"])
;

  }
}

}

