import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, ModalMessageModel } from '@nc-angular/library-mobile.stg';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  alertMessagesTranslations:any;
  loginMessagesTranslations:any;
  productsMessagesTranslations:any;
  headerfixed: boolean = false;
  isBottom: boolean;
  checked:any;

  @HostListener('window:scroll', [])
  onScroll(): void {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
      this.isBottom = true;
      console.log( window.innerHeight, 'entrou aqui')
    }else{
      this.isBottom = false;
      console.log('entrou 421')
    }
    console.log(window.innerHeight);
    console.log(window.scrollY);
  }

  constructor( private router: Router, private alertService: AlertService, public tasksService:TasksService) { }

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
    this.tasksService.visiteEfected = []
    this.alertService.open(temp);

  }

  exitApp(){
    this.router.navigate(['/']);
  }

  change(){

    const temp: ModalMessageModel = {
      showTip: false,
      title: "Want to change account?",
      description: "You will leave this relation to enter with a new one. I will new to insert password.",
      state: "warning",
      leftButtonSize: "small",
      leftButtonType: "text",
      leftButtonText: "Cancel",
      showMiddleButton:false,
      rightButtonSize: "small",
      rightButtonType: "text",
      rightButtonText: "Change Account",
      rightButtonTesterProperty: "clickLeaveApp",
      rightButtonColor: "c-scale-12",
      rightButtonCallback: () => {
        this.exitApp1();
      },
    };
    this.alertService.open(temp);


  }

  exitApp1(){
    console.log('BOAS')
    this.checked = true;
    console.log(this.checked)

  }




  switch(){
    const temp: ModalMessageModel = {
      showTip: false,
      title: "Start shift ?",
      description: "with the shift started you can do delivery orders, sales, receipts and returns.",
      state: "warning",
      leftButtonSize: "small",
      leftButtonType: "text",
      leftButtonText: "Cancel",
      showMiddleButton:false,
      rightButtonSize: "small",
      rightButtonType: "text",
      rightButtonText: "Start",
      rightButtonTesterProperty: "clickLeaveApp",
      rightButtonColor: "c-scale-12",
      rightButtonCallback: () => {
        this.exitApp1();
      },
      leftButtonCallback: () => {
        console.log('BOAS')
        this.checked = false;
        console.log(this.checked);
      }
    };
    this.alertService.open(temp);

  }

  toggle($event){
    console.log($event)
        this.checked = $event

  }

}
