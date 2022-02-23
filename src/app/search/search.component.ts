import { Component, OnInit } from '@angular/core';
import { ActionSheetModel, ActionSheetService } from 'niup-mobile-components-test';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {


  constructor(private actionSheetService : ActionSheetService ) { }


  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];



  ngOnInit() {}




}
