import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ActionSheetModel, ActionSheetService } from '@nc-angular/library-mobile.stg';
import { clientsTab } from '../shared/models/clients-tab1';
import { ProductService } from '../shared/services/product.service';
import { TasksService } from '../shared/services/tasks.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

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


  tests = clientsTab



  globalMessagesTranslations: any;
  loginMessagesTranslations: any;
  productsMessagesTranslations: any;

  constructor(private router: Router, private nav: NavController, private loc: Location, private tasksService: TasksService,
    private actionSheetService: ActionSheetService,
    private productService: ProductService,
    public toastController: ToastController) { }

  back() {
    //  this.loc.back();
    this.router.navigate(['/']);
  }


  detailsTasks(test: any) {

    if (test.id) {
      this.tasksService.listClient$.next(test);
      console.log(test);
      console.log("1 entrou");
    }
    if (test.id == 2) {
      console.log("2 entrou");
    }
    this.router.navigate(['/details-client'])
  }

  definitions() {
    const temp: ActionSheetModel = {
      titleText: "TRAJETO",
      titleTextColor: 'c-scale-12',
      titleTextSize: "small",
      iconHeader: 'icon_send',
      iconHeaderSize: 12,
      iconHeaderColor: 'c-scale-12',
    };

    this.actionSheetService.open(temp);
  }

  definitions1(){
    this.router.navigate(['settings'])
  }


  async send() {
    const toast = await this.toastController.create({
      header: 'Chegou ao destino de David Sanchez',
      message: '4765-400 | Braga - Guimar??es',
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

}

