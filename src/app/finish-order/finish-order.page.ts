import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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

  constructor(  public tasksService: TasksService,     public toastController: ToastController, public router:Router) { }

  ngOnInit( ) {

    // this.tasksService.chooseProduct$
    // .subscribe(product => {
    //   this.listProducts1 = product;

    // }),
    // this.tasksService.listProductsNew$
    //     .subscribe(testTask3 => {
    //       this.listProducts = testTask3;
    //     }),
        // this.tasksService.valueTotal$
        // .subscribe(valueTotal => {
        //   this.listValue1 = valueTotal;
        //   console.log(this.listValue1, "ENTROU NO FINISH")
        // }),
        // console.log(this.listProducts)
  }

   async finish(){
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
