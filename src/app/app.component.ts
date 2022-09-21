import { Component, ViewChild } from '@angular/core';
import { Globals } from '@nc-angular/library-mobile.stg';
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { SplashScreenStateService } from './shared/services/splash-screen-state.service';
import { BackButtonEvent } from '@ionic/core';

import { BackButtonService } from './shared/services/backButton.service';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;

  allow: boolean = false;

  constructor(private globals: Globals, private translate: TranslateService, private splashScreenStateService: SplashScreenStateService, public backButtonService: BackButtonService, private platform: Platform,

    public router: Router
  ) {

    this.translate.addLangs(['en_GB', 'fr_FR', 'pt_PT', 'es_EN', 'al_DL']);
    this.translate.setDefaultLang('pt_PT');
    this.globals.defaultImagePath = `./assets/images/`;
    this.globals.imagePath = `./assets/images/`;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.splashScreenStateService.stop();
    }, 5000);

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        this.handleBackButton();
        App.exitApp();
      }
    });
  }


  handleBackButton() {
    const currentPage = this.router.url;
    const id = currentPage;
    return this.router.navigate([currentPage]);

  }


}
