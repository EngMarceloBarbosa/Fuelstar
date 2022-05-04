import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  constructor(private nav: NavController,  private loc: Location, public formBuilder: FormBuilder) { }

  ngOnInit() {
  }


  close(){
    this.loc.back();
  }

}
