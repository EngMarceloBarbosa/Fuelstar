import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TasksService } from '../tasks.service';
import { tasksTest } from '../utils/models/tasks';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  name: string = "Jimmy Smyth";
  position:any[]=[
    {
      name1:'Joao',
      position1: 'operator',
    },
    {
      name1:'Marco',
      position1: 'operator',
    }
  ];


  tests: tasksTest[] = [

    {
      title:'boas',
      date: '23-23-1982',
      id: 1,
      name: 'Joao',
      price: 1.4,
      description: 'Lisboa '
    },
    {
      title:'boas',
      date: '23-23-1982',
      id: 2,
      name: 'Gustavo',
      price: 1.43,
      description: 'Porto'
    },
    {
      title:'boas',
      date: '23-23-1982',
      id: 3,
      name: 'Antonio',
      price: 1.43,
      description: 'Régua'
    },
    {
      title:'boas',
      date: '23-23-1982',
      id: 3,
      name: 'Rega',
      price: 1.43,
      description: 'Capital'
    },
    {
      title:'boas',
      date: '23-23-1982',
      id: 3,
      name: 'Couto',
      price: 1.43,
      description: 'Algarve'
    },
    {
      title:'boas',
      date: '23-23-1982',
      id: 3,
      name: 'Pedro',
      price: 1.43,
      description: 'Lousada'
    },
  ]

  constructor(private router: Router,private nav: NavController, private loc: Location, private tasksService: TasksService) {}

  back(){
  //  this.loc.back();
   this.router.navigate(['/']);
  }


  detailsTasks(test: any){
    if(test.id){
    this.tasksService.listClient$.next(test);
    console.log(test);
    console.log("1 entrou");
    }
    if(test.id == 2) {
      console.log("2 entrou");
    }
    this.router.navigate(['/search'])
  }

  definitions(){
  this.router.navigate(['/settings']);
  }
}

