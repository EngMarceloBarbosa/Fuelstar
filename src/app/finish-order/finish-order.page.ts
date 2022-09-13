import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClassificationApiService } from '../shared/http/classifications-api.service';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.page.html',
  styleUrls: ['./finish-order.page.scss'],
})
export class FinishOrderPage implements OnInit {

  listProducts: any[] = [];
  listValue1:any;
  listProducts1:any;

  constructor(  public tasksService: TasksService,     public toastController: ToastController, public router:Router, public classificationApi:ClassificationApiService) { }

  ngOnInit( ) {

this.classificationApi.getClassification().then((res)=> {
  this.tasksService.listClassifications = res;
  console.log(  this.tasksService.listClassifications)
})
  }

   async finish(){
    this.tasksService.productList = [];
    this.tasksService.quantity1 = [];
    this.tasksService.quantity2 = [];
    this.tasksService.selectedMethod = "";
    const toast = await this.toastController.create({
      header: 'Nova encomenda Registada',
      message: 'Order nº1927',
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

  this.router.navigate(['/tabs/tab1'])
  }

  clear(){

  }

  close(){

  }
}
