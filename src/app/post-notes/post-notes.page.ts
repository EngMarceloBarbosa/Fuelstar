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
    this.tasksService.turnMessageCreate = false;
    this.router.navigate(["/details-client"])

  }

  save(task){

    console.log(task)
    console.log(task.currentStatus.id)

  if(task.currentStatus.id == "e6875497-3ad4-4121-b3aa-4efde5d12fb1"){
    return this.tasksService.turnMessageCreate = true;
  }else {
    this.tasksService.timeHours();
    this.tasksService.putNotes();
    this.tasksService.postNotes.detail.value = ""
    console.log('PODE SER ')
    this.router.navigate(['/details-client'])
  }
  }

}
