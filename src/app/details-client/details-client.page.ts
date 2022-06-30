import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.page.html',
  styleUrls: ['./details-client.page.scss'],
})
export class DetailsClientPage implements OnInit {




  clientDetails: any;
  value: any;
  @Input() prop: number = 0;

  constructor( private translate: TranslateService,     private tasksService: TasksService, private router:Router) { }

  ngOnInit() {



    this.tasksService.listClient$
      .subscribe(client => {
        this.clientDetails = client;
      }),
      this.tasksService.value$
      .subscribe(value => {
        this.value = value;
      })

  }


  clickTab(event: any) {

  }

  editContact(){
    this.tasksService.listClient$.next(this.clientDetails)
    this.router.navigate(["/edit-contact"])
  }





}
