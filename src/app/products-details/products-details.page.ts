import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.page.html',
  styleUrls: ['./products-details.page.scss'],
})
export class ProductsDetailsPage implements OnInit {
  listProducts: any;
  @Input() products2: any[]
  active:boolean = true;

  constructor( private router: Router, public toastController: ToastController, private tasksService: TasksService) { }


  ngOnInit() {
    this.tasksService.testTask1$
.subscribe(testTask1 => {
  this.listProducts = testTask1;
})

  }

async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'You add new product to cart "item xpto',
      message: 'Back to Articles list cart',
      position: 'top',
      color: 'light',
      duration: 2000,
      buttons: [
        {
          side: 'start',
          icon: 'cart',
          handler: () => {
            console.log('Cart Button Clicked');
          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  back(){
    this.router.navigate(['products-family']);
  }

  add(){

  }


  options(){
 this.active = false;
  }
}
