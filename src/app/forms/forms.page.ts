import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../shared/services/tasks.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {

  notes1:any;
  notes2:any;

sureOption: string;
  showReason = false;
  showReasonOvm= false;


  dateFormsStep1 = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    dateOfTheDay: new FormControl('', [Validators.required]),
    departure: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    kilometers: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    registration: new FormControl('', [Validators.required]),

  });

  dateFormsStep2 =  new FormGroup({
    materials: new FormControl(''),
    anomalias: new FormControl(''),
    trabalho: new FormControl('')
  });

  dateFormsStep3 =  new FormGroup({
    sure: new FormControl('', [Validators.required]),
    reason: new FormControl(''),
    sureOVM: new FormControl(''),
    reasonOVM: new FormControl(''),
    initialDate:  new FormControl(''),
    finalDate:  new FormControl(''),
  });

  dateFormsStep4 =  new FormGroup({
    signatures: new FormControl('')
  });

  submitted = false;
  startDate = new Date().toISOString();
  endDate = new Date().toISOString();

  today = new Date().toISOString();
  steps = [
    { label: 'Passo 1' },
    { label: 'Passo 2' },
    { label: 'Passo 3' },
    { label: 'Passo 4' }
  ];
  form: FormGroup;
  currentStep = 0;

  constructor(private router: Router, public tasksService: TasksService, private fb: FormBuilder) {

   }

   submit() {
    console.log(this.form.value);
  }

  ngOnInit() {
  }

  back() {
    this.router.navigate(["/details-client"]);

  }

  onSelectChange() {
    this.showReason = this.sureOption === 'no';
  }
  onSelectChange1() {
    this.showReasonOvm = this.sureOption === 'no';
  }




  next() {

    this.submitted = false;
    if (this.dateFormsStep1.valid) {
      this.submitted = false;
      console.log(this.dateFormsStep1.value);
      if(this.dateFormsStep2.valid){

        console.log(this.dateFormsStep2.value);
        if(this.dateFormsStep3.valid){
          console.log(this.dateFormsStep3.value);

        }
      }
      this.currentStep = Math.min(this.steps.length - 1, this.currentStep + 1);
      // You can also send the form data to your server here
    } else {
      this.submitted = true;
      console.log("form is invalid");
      // Check if any of the fields are empty
      if (this.dateFormsStep1.get('startDate').value === '') {
        console.log('Start date is required');
      }
      if (this.dateFormsStep1.get('endDate').value === '') {
        console.log('End date is required');
      }
      if (this.dateFormsStep1.get('departure').value === '') {
        console.log('Departure location is required');
      }
      if (this.dateFormsStep1.get('destination').value === '') {
        console.log('Destination location is required');
      }
    }
  }

  previous() {
    this.currentStep = Math.max(0, this.currentStep - 1);
  }





// BOTÃO PARA VER O FORM DA DESLOCAÇÃO


onSubmit() {
  this.submitted = false;
    if (this.dateFormsStep1.valid) {
      this.submitted = false;
      console.log(this.dateFormsStep1.value);
      if(this.dateFormsStep2.valid){

        console.log(this.dateFormsStep2.value);
        if(this.dateFormsStep3.valid){

        }
      }
      // You can also send the form data to your server here
    } else {
      this.submitted = true;
      console.log("form is invalid");
      // Check if any of the fields are empty
      if (this.dateFormsStep1.get('startDate').value === '') {
        console.log('Start date is required');
      }
      if (this.dateFormsStep1.get('endDate').value === '') {
        console.log('End date is required');
      }
      if (this.dateFormsStep1.get('departure').value === '') {
        console.log('Departure location is required');
      }
      if (this.dateFormsStep1.get('destination').value === '') {
        console.log('Destination location is required');
      }
    }
  }

  modelChangeFn(e) {
    this.notes1 = e;
    console.log(this.notes1);

  }
  modelChangeFn1(e) {
    this.notes2 = e;
    console.log(this.notes2);

  }
  modelChangeFn2(e) {
    this.notes2 = e;
    console.log(this.notes2);

  }

}
