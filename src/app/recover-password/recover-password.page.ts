import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  constructor(private router: Router,private nav: NavController, private loc: Location ) { }

  ngOnInit() {

  }

  close(){

    this.loc.back();
  }


  sendMe(){

  //this.loc.back();
    this.router.navigate(['tabs/tab1']);
  }

}
