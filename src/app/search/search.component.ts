import { Component, OnInit } from '@angular/core';
import { ActionSheetService } from '@nc-angular/library-mobile';
import { TasksService } from '../tasks.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  testTask: any ;


  constructor(private actionSheetService : ActionSheetService, private tasksService: TasksService) { }


  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];



  ngOnInit() {

    this.tasksService.testTask$.subscribe(values => {
      this.testTask = values;
    });
  }




}
