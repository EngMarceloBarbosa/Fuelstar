import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetService, AlertService } from '@nc-angular/library-mobile.stg';
import { TranslateService } from '@ngx-translate/core';
import { ContactsTaskService } from '../shared/http/contactsTask-api.service';
import { TaskApiService } from '../shared/http/task-api.service';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-post-notes',
  templateUrl: './post-notes.page.html',
  styleUrls: ['./post-notes.page.scss'],
})
export class PostNotesPage implements OnInit {

  constructor(private translate: TranslateService, public tasksService: TasksService, private router: Router, private actionSheetService: ActionSheetService, private contactsTaskService: ContactsTaskService, public taskApiService: TaskApiService, private alertService: AlertService, public contactApiService: ContactsTaskService) {

  }


  ngOnInit() {
  }

  modelChangeFn(e){
    this.tasksService.postNotes = e;
    console.log(this.tasksService.postNotes);
  }


  close() {
    this.router.navigate(["/details-client"])
  }

  save(){
    this.tasksService.timeHours();
    this.tasksService.putNotes();
    this.tasksService.postNotes.detail.value = ""
  }

}
