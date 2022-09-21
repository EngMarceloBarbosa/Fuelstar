import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Injectable } from '@angular/core';

import { Router } from "@angular/router";





// import { Router } from "@angular/router";
// import { NavController, Platform } from "@ionic/angular";
// import { Injectable } from "@angular/core";
// import { Location } from "@angular/common";
// import { TranslateService } from "@ngx-translate/core";
// import { AlertService, ModalMessageModel } from "@nc-angular/library-mobile.stg";
@Injectable({
  providedIn: "root",
})
export class BackButtonService {
  alertMessagesTranslations: any;
  constructor(


  ) {


    }


  onInit(){

  }


  }

//   handleBackButton() {
//     const currentPage = this.router.url;
//     const id = currentPage;
//     this.translate.get("AlertMessages").subscribe((res) => (this.alertMessagesTranslations = res));
//     if (currentPage.includes("login") || currentPage.includes("carousel")) {
//       return this.backButtonAlertLeave();
//     }
//     if (currentPage.includes("home") || currentPage.includes("change-system")) {
//       return this.backButtonAlert();
//     }
//     if (currentPage.includes("filters") || currentPage.length <= 1) return this.navCtrl.back();
//     if (
//       currentPage.includes("entity-docs") ||
//       currentPage.includes("doc-details") ||
//       currentPage.includes("rec-details") ||
//       currentPage.length <= 1
//     ) {
//       // let history = this.currentAccountService.historyRoutes$.getValue();
//       // if (history.length == 1) {
//       //   return;
//       }
//       if (history.length == 2) {
//         this.navCtrl.navigateBack(history[0].route[0]);
//         this.currentAccountService.historyRoutes$.next(history.slice(0, history.length - 1));
//       }
//       if (history.length > 2) {
//         let rout = history[history.length - 2];
//         this.currentAccountService.historyRoutes$.next(history.slice(0, history.length - 1));
//         rout.hasOwnProperty("params") ? this.navCtrl.navigateBack(rout.route[0], rout.params) : this.navCtrl.navigateBack(rout.route[0]);
//       }
//       return;
//     }
//     if (!currentPage.includes("tabs/dashboard") && !currentPage.includes("my-finance")) {
//       return this.router.navigate(["/tabs/dashboard"]);
//     }
//     if (currentPage.includes("my-finance/current-account") || currentPage.includes("my-finance/options")) {
//       return this.router.navigate(["/my-finance/dashboard"]);
//     }
//     if (currentPage.includes("tabs/dashboard") || currentPage.includes("my-finance/dashboard")) {
//       return this.backButtonAlert();
//     }
//   }
//   /*
//    * Alerts for backButton event
//    */
//   backButtonAlertLeave() {
//     const temp: ModalMessageModel = {
//       showTip: false,
//       title: this.alertMessagesTranslations.titleLeaveApp,
//       description: this.alertMessagesTranslations.descriptionLeaveApp,
//       state: "leave-app",
//       leftButtonSize: "small",
//       leftButtonType: "text",
//       leftButtonText: this.alertMessagesTranslations.leftButtonStay,
//       leftButtonTesterProperty: "clickStayApp",
//       showMiddleButton:false,
//       rightButtonSize: "small",
//       rightButtonType: "text",
//       rightButtonText: this.alertMessagesTranslations.rigthButtonLeave,
//       rightButtonTesterProperty: "clickLeaveApp",
//       rightButtonColor: "c-scale-12",
//       rightButtonCallback: () => {
//         navigator["app"].exitApp();
//       },
//     };
//     this.alertService.open(temp);
//   }
//   // backButtonAlert() {
//   //   const temp: ModalMessageModel = {
//   //     showTip: false,
//   //     title: this.alertMessagesTranslations.titleLogout,
//   //     description: this.alertMessagesTranslations.descriptionLogout,
//   //     state: "warning",
//   //     leftButtonSize: "small",
//   //     leftButtonType: "text",
//   //     leftButtonText: this.alertMessagesTranslations.leftButtonStay,
//   //     leftButtonTesterProperty: "clickStay",
//   //     showMiddleButton:false,
//   //     rightButtonSize: "small",
//   //     rightButtonType: "text",
//   //     rightButtonText: this.alertMessagesTranslations.rigthButtonLogout,
//   //     rightButtonTesterProperty: "clickLogout",
//   //     rightButtonColor: "c-scale-12",
//   //     rightButtonCallback: () => {
//   //       this.router.navigate(["/login"]);
//   //       //clear data services
//   //       this.loginService.loginResult$.next(null);
//   //       this.currentAccountService.filterAlarm$.next(0);
//   //       this.currentAccountService.startDate$.next(new Date());
//   //       this.currentAccountService.endDate$.next(new Date());
//   //       this.currentAccountService.chosenState$.next([]);
//   //       this.currentAccountService.selectedDocFilter$.next([]);
//   //       this.currentAccountService.allFilters$.next({
//   //         paid: false,
//   //         pending: false,
//   //         expired: false,
//   //         opened:false,
//   //         dateCheck: false,
//   //         startDate: null,
//   //         endDate: null,
//   //         docTypes: [],
//   //       });
//   //       this.currentAccountService.deleteDocumentFilter = false;
//   //       this.currentAccountService.existFilter = false;
//   //       this.loginService.currentView$.next("login");
//   //       this.loginService.loginResult$.next([]);
//   //       this.loginService.finalize$.next([]);
//   //       this.loginService.selectEntityRelationTo$.next([]);
//   //     },
//   //   };
//   //   this.alertService.open(temp);
//   // }
// }
