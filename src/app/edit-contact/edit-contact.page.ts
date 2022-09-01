import { ClassField, ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, NgForm ,Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit, OnChanges {

  @ViewChild('formElement', { static: false }) formElement: NgForm;
  @ViewChild('inputEmail') inputEmail: ElementRef;

  clientDetails: any;
  filters: FormGroup
  form: FormGroup;



  @Input() prop: number = 0;
  // valuePhone: any;

  constructor(public formBuilder: FormBuilder, public tasksService: TasksService, private router:Router,) { }

  ngOnInit() {
    this.tasksService.infoClient$
    .subscribe(client => {
      this.clientDetails = client;
    })




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


  ngOnChanges(  changes: SimpleChanges) {
    console.log(changes)


    }


  signInClick(){


  }

  // change(event, id){
  //   if (id == 1) {
  //     this.valuePhone = event;
  //   }
  // }

  close(){
    this.router.navigate(['/details-client'])
  }

  modelChangeFn(number,e){
    // this.filters.patchValue({
    //   phoneNumber: e?.value[0]?.id ?? null
    // });
    if(number == 1) {
this.tasksService.contactNumber= e;
console.log(this.tasksService.contactNumber);
    }
    if(number == 2) {
      this.tasksService.email = e;
      console.log( this.tasksService.email, "BOAS");
    }

    var form = {
      phone: this.tasksService.contactNumber,
      email: this.tasksService.email

    }

    console.log(form);
  }




  save(){

    if (this.tasksService.contactDetail.invalid) {
      this.tasksService.isSubmitted = true;
      }


    this.tasksService.validateEmail(this.tasksService.email);
console.log(this.tasksService.contactNumber.length )
console.log(this.tasksService.validatorEmail)
    if(this.tasksService.validatorEmail == true || this.tasksService.contactNumber.length == 0 ){
return;
    }else {
      this.tasksService.putPhoneNumber();
      // this.tasksService.value$.next(this.value);
      this.router.navigate(["/details-client"])

    }


  }

}
