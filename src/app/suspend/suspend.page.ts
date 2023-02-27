import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActionSheetService, AlertService } from '@nc-angular/library-mobile.stg';
import { ContactsTaskService } from '../shared/http/contactsTask-api.service';
import { TaskApiService } from '../shared/http/task-api.service';
import { FormsService } from '../shared/services/forms.service';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-suspend',
  templateUrl: './suspend.page.html',
  styleUrls: ['./suspend.page.scss'],
})
export class SuspendPage implements OnInit {

  constructor(private router: Router,public loadingController: LoadingController, private changeDetectorRef: ChangeDetectorRef, public tasksService: TasksService, private fb: FormBuilder, private alertService: AlertService, private actionSheetService: ActionSheetService, private contactsTaskService: ContactsTaskService, public taskApiService: TaskApiService, public contactApiService: ContactsTaskService, private camera: Camera, private toastController: ToastController, public formsFields: FormsService) { }

  ngOnInit() {
  }


  back(){
    this.router.navigate(['/details-client'])
  }


}
