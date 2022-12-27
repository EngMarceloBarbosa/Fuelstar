
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, ModalMessageModel } from '@nc-angular/library-mobile.stg';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { LoginApiService } from '../shared/http/login-api.service';
import { LoadingController } from '@ionic/angular';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { TasksService } from '../shared/services/tasks.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('formElement', { static: false }) formElement: NgForm;
  @ViewChild('inputEmail') inputEmail: ElementRef;


  alertMessagesTranslations: any;
  form: FormGroup;
  values: string;
  chave1: any[];
  alunos = [];
  globalMessagesTranslations: any;
  loginMessagesTranslations: any;
  event: any;
  toggleValue: any;
  checked: any;

  constructor(private router: Router,
    private loginApiService: LoginApiService,
    private alertService: AlertService,
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    public loadingController: LoadingController,
    public tasksService: TasksService
  ) {
  }

  ngOnInit() {


    this.translate.get('App').subscribe(res => {
      this.globalMessagesTranslations = res.Global;
      this.loginMessagesTranslations = res.Login;
      this.alertMessagesTranslations = res.AlertMessages;

    });





    this.form = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          // Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[a-z]{2,4}$|^[0-9]{16}$|^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[a-z]{2,4}/[A-Za-zA-Z0-9]+$|^[0-9]{16}/[a-zA-Z0-9]+$')
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          // Validators.minLength(6)
        ]]
    });

  }


  recoverME() {
    this.router.navigate(['/recover-password']);
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
      duration: 3500,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'

    });

    return await loading.present();
  }


  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  /*
       * "Form" Login credentials
       */


  /**
   * ForgoutPass Button click
   */

  forgotPasswordClick() {
    this.router.navigate(["/recoverPassword"])
  }

  /**
   * Sign In button Click
   */
  async signInClick() {

    this.presentLoadingWithOptions();

    const authentication = {
      username: this.email.value,
      password: this.password.value,
      productId: '00000000-0000-0000-0000-000000000003'
    };

    this.loginApiService.getLogin(authentication).then(res => {
      this.router.navigate(["/tabs/tab1"]);
      environment.token = res.accessToken;

      if (authentication.username === 'Admin') {
        console.log('entrou')
        this.tasksService.entityId = "00000000-0000-0000-0000-000000000001"
        this.tasksService.roleId = "00000000-0000-0000-0000-000000000001"
      } else {

        this.parseJwt();
      }

    })

      .catch((error: HttpErrorResponse) => {

        if (error.status === 401) {
          const temp: ModalMessageModel = {
            showTip: false,
            title: 'Password Errada',
            description: '',
            state: 'error',
            leftButtonSize: 'small',
            leftButtonType: 'text',
            leftButtonText: 'Cancel',
            leftButtonColor: 'c-scale-12',
            showMiddleButton: false,
            rightButtonSize: 'small',
            rightButtonType: 'text',
            rightButtonText: '',
            rightButtonTesterProperty: 'clickTryAgain',
            rightButtonColor: 'c-scale-12',
            rightButtonCallback: () => {
              this.router.navigate(['/login']);
            }
          };

          this.alertService.open(temp);
          setTimeout(() => {
            // this.loading = 'SingIn';
            this.form.reset();
          });
        } else {
          console.log(error, 'ERRO')
          const temp: ModalMessageModel = {

            showTip: false,
            title: this.alertMessagesTranslations.titleInternalServerFailed,
            description: this.alertMessagesTranslations.descriptionInternalServerFailed,
            state: 'error',
            leftButtonSize: 'small',
            leftButtonType: 'text',
            leftButtonText: '',
            showMiddleButton: false,
            rightButtonSize: 'small',
            rightButtonType: 'text',
            rightButtonText: this.alertMessagesTranslations.rigthButtonTryAgain,
            rightButtonTesterProperty: 'clickTryAgain',
            rightButtonColor: 'c-scale-12',

            rightButtonCallback: () => {
              this.router.navigate(['/login']);
            }
          };

          this.alertService.open(temp);
          setTimeout(() => {
            // this.loading = 'SingIn';
            this.form.reset();
          }, 200);
        }
      });
  }


  switch() {
    const temp: ModalMessageModel = {
      showTip: false,
      title: "Começar Turno ?",
      description: "with the shift started you can do delivery orders, sales, receipts and returns.",
      state: "warning",
      leftButtonSize: "small",
      leftButtonType: "text",
      leftButtonText: "Cancel",
      showMiddleButton: false,
      rightButtonSize: "small",
      rightButtonType: "text",
      rightButtonText: "Start",
      rightButtonTesterProperty: "clickLeaveApp",
      rightButtonColor: "c-scale-12",
      rightButtonCallback: () => {
        console.log('BOAS')
        this.checked = true;
        console.log(this.checked)
      },
      leftButtonCallback: () => {
        console.log('BOAS')
        this.checked = false;
        console.log(this.checked);
      }
    };
    this.alertService.open(temp);
  }


  toggle($event) {
    console.log($event)
    this.checked = $event

  }

  send($event: KeyboardEvent) {
    console.log($event)
    if ($event.key === 'Enter') {
      this.signInClick()
    }
  }

  parseJwt() {



    var base64Url = environment.token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(jsonPayload)

    const obj = JSON.parse(jsonPayload);
    const obj1 = JSON.parse(obj.unique_name)
    this.tasksService.entityId = obj1.user.entity.id
    this.tasksService.entityName = obj1.user.entity.firstName
    this.tasksService.entityLastname = obj1.user.entity.lastName

    this.tasksService.roleId = "00000000-0000-0000-0000-000000000002"
    console.log(this.tasksService.entityId)
    console.log(obj1)
    console.log(this.tasksService.roleId)
































  }


}

