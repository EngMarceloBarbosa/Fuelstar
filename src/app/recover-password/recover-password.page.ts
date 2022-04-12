import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  @ViewChild('formElement', { static: false }) formElement: NgForm;
  @ViewChild('inputEmail') inputEmail: ElementRef;


  alertMessagesTranslations: any;
  form: FormGroup;

  constructor(private router: Router, private nav: NavController, private loc: Location, public formBuilder: FormBuilder) { }

  ngOnInit() {


    this.form = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          // Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[a-z]{2,4}$|^[0-9]{16}$|^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[a-z]{2,4}/[A-Za-zA-Z0-9]+$|^[0-9]{16}/[a-zA-Z0-9]+$')
        ]
      ]
    });
  }

  close() {
    this.loc.back();
  }

  get email() {
    return this.form.get('email');
  }


  signInClick() {
    // this.loading = 'loading';

    const authentication = {
      username: this.email.value,
      productId: '00000000-0000-0000-0000-000000000003'
    };

  }


  sendMe() {

    //this.loc.back();
    this.router.navigate(['tabs/tab1']);
  }
}
