import { Component, ViewChild } from '@angular/core';
import { Globals } from '@nc-angular/library-mobile.stg';
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { SplashScreenStateService } from './shared/services/splash-screen-state.service';
import { BackButtonEvent } from '@ionic/core';
import { Location } from '@angular/common';
import { BackButtonService } from './shared/services/backButton.service';
import { AlertController, IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from './shared/services/tasks.service';
import { environment } from 'src/environments/environment';
import { FormsService } from './shared/services/forms.service';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;

  allow: boolean = false;

  constructor(private globals: Globals, private translate: TranslateService, private splashScreenStateService: SplashScreenStateService, public backButtonService: BackButtonService, private platform: Platform, private location: Location, public navContrl: NavController,

    public router: Router,
    private alertService: AlertController,
    public tasksService:TasksService,

  ) {

    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.platform.is('android') || this.platform.is('ios')) {
        const path = this.location.prepareExternalUrl(this.location.path());
        if (path === '/tabs/tab1') {
          navigator['app'].exitApp();
        } else {
          history.go(-1);
          // Permitir que o comportamento padrão do botão "back" seja executado

        }
      }
    });



    //     this.platform.backButton.subscribeWithPriority(-1, () => {
    //   if (!this.routerOutlet.canGoBack()) {
    //     if(this.routerOutlet)
    //     // this.tasksService.handleBackButton();
    //     App.exitApp();
    //   }

    // });


    // console.log(this.tasksService.dataSave, '2');
    // console.log(this.tasksService.timeNew, )

    // if(this.tasksService.dataSave.substring(0,10) >= this.tasksService.timeNew && this.tasksService.dataSave != "" ){
    //   console.log('entrou Menu')
    //   this.router.navigate(["/tabs/tab1"])
    // }else{
    //   this.router.navigate(["/login"])
    //   console.log('entrou LOGIN')

    // }

    // Configurar o button

    // this.platform.backButton.subscribeWithPriority(0, () => {
    //   // Verifica se a página atual é a HomePage
    //   if (this.router.url === '/tabs/tab1') {
    //     // Chama o método para sair da aplicação
    //     navigator['app'].exitApp();
    //   } else {
    //     // Volta para a página anterior
    //     this.navContrl.back();
    //   }
    // });


    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        if(this.routerOutlet)
        if(this.router.url === '/tabs/tab1'){
        // this.tasksService.handleBackButton();
        App.exitApp();
      }}
    });


    // this.platform.backButton.subscribeWithPriority(0, () => {
    //   // Verifica se a página atual é a TabsPage
    //   if (this.routerOutlet && this.routerOutlet.canGoBack()) {
    //     // Se a página atual for uma página interna das abas, volta para a página anterior
    //     this.navContrl.back();
    //   } else if (this.router.url === '/tabs/home') {
    //     // Se a página atual for a página raiz das abas, verifica se há uma página anterior na pilha de navegação
    //     if (this.navContrl.getViews().length > 1) {
    //       // Se houver uma página anterior, volta para ela
    //       this.navContrl.back();
    //     } else {
    //       // Se não houver uma página anterior, sai da aplicação
    //       navigator['app'].exitApp();
    //     }
    //   }
    // });






//     this.platform.ready().then(()=>{
//       this.platform.backButton.subscribeWithPriority
//       (999999, ()=> {
//  const url = this.router['routerState'].snapshot.url;
//  console.log(url)
// if(url == "/free-sale" && this.tasksService.continue1 == false){
//   this.tasksService.continue1 = true;
//   this.location.back();
// }

//  if(url != "/login"){

//   this.location.back();

//  }else {
//   App.exitApp();
//  }
//       })
//     })

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
    // });´~




    this.translate.addLangs(['en_GB', 'fr_FR', 'pt_PT', 'es_EN', 'al_DL']);
    this.translate.setDefaultLang('pt_PT');
    this.globals.defaultImagePath = `./assets/images/`;
    this.globals.imagePath = `./assets/images/`;
  }


    async ngOnInit(): Promise<void> {





    setTimeout(() => {
      this.splashScreenStateService.stop();
    }, 4000);

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
