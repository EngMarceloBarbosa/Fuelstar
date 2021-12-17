import { Component } from '@angular/core';
import { Boxes } from './tab2';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {

  listBoxes: Boxes[] = [];
  listBoxes1: any[] = [{
  }];


  tests: any[] = [{
  id: 1,
  name: 'Joao',
  price: 1.4,
  description: 'Userful for writing'
},
{
  id: 2,
  name: 'Gustavo',
  price: 1.43,
  description: 'Userful for writing'
},
{
  id: 3,
  name: 'Antonio',
  price: 1.43,
  description: 'Userful for writing'
},
{
  id: 4,
  name: 'Leo',
  price: 1.43,
  description: 'Userful for writing'
},
{
  id: 5,
  name: 'Joao',
  price: 1.33,
  description: 'Userful for writing'
},
{
  id: 6,
  name: 'Berto',
  price: 1.633,
  description: 'Userful for writing'
},
{
  id: 7,
  name: 'Sapo',
  price: 16.3,
  description: 'Userful for writing'
}
];

constructor() {
}


}



