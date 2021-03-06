
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, ModalMessageModel } from '@nc-angular/library-mobile.stg';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { LoginApiService } from '../shared/http/login-api.service';





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

  constructor(private router: Router,
    private loginApiService: LoginApiService,
    private alertService: AlertService,
    public formBuilder: FormBuilder,
    public translate: TranslateService,
  ) {
  }

  ngOnInit() {

    this.translate.get('App').subscribe(res => {
      this.globalMessagesTranslations = res.Global;
      this.loginMessagesTranslations = res.Login;

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
  signInClick() {
    // this.loading = 'loading';

    const authentication = {
      username: this.email.value,
      password: this.password.value,
      productId: '00000000-0000-0000-0000-000000000003'
    };

    this.loginApiService.getLogin(authentication).then(res => {

      environment.token = res.accessToken;
      this.router.navigate(["/tabs/tab1"]);

    })
      .catch((error: HttpErrorResponse) => {

        if (error.status === 401) {
          const temp: ModalMessageModel = {
            showTip: false,
            title: 'WRONG PASSWORD',
            description: '',
            state: 'error',
            leftButtonSize: 'small',
            leftButtonType: 'text',
            leftButtonText: '',
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




}

