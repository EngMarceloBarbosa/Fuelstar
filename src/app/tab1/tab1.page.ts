import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


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

  constructor(private router: Router,private nav: NavController, private loc: Location) {}

  back(){
  //  this.loc.back();
   this.router.navigate(['/']);
  }


  definitions(){
  this.router.navigate(['tabs/tab4']);
  }
}

