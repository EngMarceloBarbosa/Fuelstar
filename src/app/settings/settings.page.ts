import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, ModalMessageModel } from '@nc-angular/library-mobile.stg';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  alertMessagesTranslations:any;
  loginMessagesTranslations:any;
  productsMessagesTranslations:any;

  constructor( private router: Router, private alertService: AlertService) { }

  ngOnInit() {
  }


  back(){
    this.router.navigate(['/tabs/tab1']);
  }

  logout(){
    const temp: ModalMessageModel = {
      showTip: false,
      title: "Do you want to logout?",
      description: "You will exit this account and be able to login with other credentials.",
      state: "warning",
      leftButtonSize: "small",
      leftButtonType: "text",
      leftButtonText: "Cancel",
      showMiddleButton:false,
      rightButtonSize: "small",
      rightButtonType: "text",
      rightButtonText: "Logout",
      rightButtonTesterProperty: "clickLeaveApp",
      rightButtonColor: "c-scale-12",
      rightButtonCallback: () => {
        this.exitApp();
      },
    };
    this.alertService.open(temp);

  }

  exitApp(){
    this.router.navigate(['/']);
  }


  change(){

  }
}
