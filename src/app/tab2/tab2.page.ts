import { Component } from '@angular/core';
import { Boxes } from './tab2';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {

  listBoxes: Boxes[] = [];

  pens: any[] = [{
  id: 1,
  name: 'Pen',
  price: 1.4,
  description: 'Userful for writing'
},
{
  id: 2,
  name: 'Pen2',
  price: 1.43,
  description: 'Userful for writing'
}];

  constructor() {}

}



