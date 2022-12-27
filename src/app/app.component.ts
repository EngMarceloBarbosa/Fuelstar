import { Component, ViewChild } from '@angular/core';
import { Globals } from '@nc-angular/library-mobile.stg';
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { SplashScreenStateService } from './shared/services/splash-screen-state.service';
import { BackButtonEvent } from '@ionic/core';
import { Location } from '@angular/common';
import { BackButtonService } from './shared/services/backButton.service';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from './shared/services/tasks.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;

  allow: boolean = false;

  constructor(private globals: Globals, private translate: TranslateService, private splashScreenStateService: SplashScreenStateService, public backButtonService: BackButtonService, private platform: Platform, private location: Location,

    public router: Router,
    private alertService: AlertController,
    public tasksService:TasksService
  ) {


    this.platform.ready().then(()=>{
      this.platform.backButton.subscribeWithPriority
      (999999, ()=> {
 const url = this.router['routerState'].snapshot.url;
 console.log(url)
if(url == "/free-sale" && this.tasksService.continue1 == false){
  this.tasksService.continue1 = true;
  this.location.back();
}

 if(url != "/login"){

  this.location.back();

 }else {
  App.exitApp();
 }
      })
    })

    // App.addListener('backButton', () =>
    // {
    //   if (this.location.isCurrentPathEqualTo('/login'))
    //   {
    //     navigator['app'].exitApp();
    //   }
    //   else
    //   {
    //     this.location.back();
    //   }
    // });


    this.translate.addLangs(['en_GB', 'fr_FR', 'pt_PT', 'es_EN', 'al_DL']);
    this.translate.setDefaultLang('pt_PT');
    this.globals.defaultImagePath = `./assets/images/`;
    this.globals.imagePath = `./assets/images/`;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.splashScreenStateService.stop();
    }, 5000);

    // this.platform.backButton.subscribeWithPriority(-1, () => {
    //   if (!this.routerOutlet.canGoBack()) {
    //     // this.tasksService.handleBackButton();
    //     App.exitApp();
    //   }
    // });

  }






  // async backButtonEvent(){
  //   this.platform.backButton.subscribeWithPriority(10, () => {
  //     this.backButtonAlert();
  //   })

  // }

  // async backButtonAlert(){
  //   const alert = await this.alertService.create({
  //     message: 'Ypu just pressed the BAck Button'
  //   })
  //   await alert.present();
  // }

}
