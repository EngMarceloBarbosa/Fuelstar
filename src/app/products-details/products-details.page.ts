
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActionSheetModel, ActionSheetService } from '@nc-angular/library-mobile.stg';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.page.html',
  styleUrls: ['./products-details.page.scss'],
})
export class ProductsDetailsPage implements OnInit {
  listProducts: any;
  @Input() products2: any[]
  active: boolean = true;

  constructor(private router: Router, public toastController: ToastController, private tasksService: TasksService, private actionSheetService : ActionSheetService) { }


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


  back() {
    this.router.navigate(['products-family']);
  }

  add() {

  }


  options() {
    const temp: ActionSheetModel = {
      titleText: 'Options',
      titleTextColor: 'c-scale-12',
      titleTextSize: 'large',
      iconHeader: 'icon_options',
      iconHeaderSize: 16,
      iconHeaderColor: 'c-scale-12',
      rightButtonShow: true,
      rightButtonText: 'Aplicar filtros',
      rightButtonColor: 'primary',
      rightButtonCallback : ()=> {
        this.handleApplyFilter();
      },
      middleButtonShow: false,
      leftButtonShow: true,
      leftButtonText: 'Apagar',
      leftButtonColor: 'c-scale-12',
      closeButtonShow: true,
      closeButtonColor: 'c-scale-12'
      };

      this.actionSheetService.open(temp);
  }

  handleApplyFilter(){
    this.router.navigate(['/tabs/tab4'])
    }
}
