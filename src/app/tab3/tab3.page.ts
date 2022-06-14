






import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetModel, ActionSheetService, AlertService, ModalMessageModel } from '@nc-angular/library-mobile.stg';
import { FilterServiceService } from '../shared/filter-service.service';
import { TasksService } from "../tasks.service";
import { Tasks } from '../utils/models/tab2';
import {  tasksTest } from '../utils/models/tasks';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {



@ViewChild('searchFocus') searchFocus:ElementRef;

isOnColor = true;
// listBoxes: Boxes[] = [];
listTasks: Tasks[] = [];
isShown = false;
value1 = new Date();
value2 = new Date();
apllyFilterButtonDisabled: boolean = true;
dataChanged: boolean = false;
disabledChooseDate: boolean = false;
isOnActionButtons1: boolean = false;
isOnActionButtons2: boolean = false;
isOnActionButtons3: boolean = false;
selectedFilter: number = 0;
translateStrings:any;

listBoxes1: any[] = [{
}];


tests: tasksTest[] = [

{
title:'boas',
date: '23-23-1982',
id: 1,
name: 'Joao',
price: 1.4,
description: 'Work hard '
},
{
title:'boas',
date: '23-23-1982',
id: 2,
name: 'Gustavo',
price: 1.43,
description: 'No one is like you'
},
{
title:'boas',
date: '23-23-1982',
id: 3,
name: 'Antonio',
price: 1.43,
description: 'Always you'
},
{
title:'boas',
date: '23-23-1982',
id: 4,
name: 'Leo',
price: 1.43,
description: 'Nothing really matters'
},
{
title:'boas',
date: '23-23-1982',
id: 5,
name: 'Joao',
price: 1.33,
description: 'just do it'
},
{
title:'boas',
date: '23-23-1982',
id: 6,
name: 'Berto',
price: 1.633,
description: 'Be smart'
},
{
title:'boas',
date: '23-23-1982',
id: 7,
name: 'Sapo',
price: 16.3,
description: 'Nothing new'
},
{
title:'boas',
date: '23-23-1982',
id: 8,
name: 'Benfica',
price: 19,
description: 'Be powerful'
},
{
title:'boas',
date: '23-23-1982',
id: 9,
name: 'Micolli',
price: 21,
description: 'be wonderful'
},
{
title:'boas',
date: '23-23-1982',
id: 10,
name: 'Boas',
price: 21,
description: 'eficiente'
}
];


constructor(private router: Router, private actionSheetService : ActionSheetService, public alertService: AlertService , public filterService: FilterServiceService , private tasksService: TasksService ) {
}


ngOnInit() {

  }

  filterClick(){

  const temp: ActionSheetModel = {
  titleText: 'Filters',
  titleTextColor: 'c-scale-12',
  titleTextSize: 'large',
  iconHeader: 'icon_filter',
  iconHeaderSize: 16,
  iconHeaderColor: 'c-scale-12',
  rightButtonShow: true,
  rightButtonText: 'Aplicar filtros',
  rightButtonColor: 'primary',
  rightButtonCallback : ()=> {
    this.handleApplyFilter();
  },
  middleButtonShow: false,
  leftButtonShow: true,
  leftButtonText: 'Apagar',
  leftButtonColor: 'c-scale-12',
  closeButtonShow: true,
  closeButtonColor: 'c-scale-12'
  };

  this.actionSheetService.open(temp);
  }

  searchClick(){
      this.searchFocus.nativeElement.focus();
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



 /* START DATE PICKER */

currentDateFormat(date: any, format: string = "yyyy-mmmm-dd"): any {
const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
return format
  .replace("yyyy", date.getFullYear())
  .replace("mmmm", pad(date.getMonth() + 1))
  .replace("dd", pad(date.getDate()));
}

formatIt(date: Date, form: string) {
const pad = (n: number) => (n < 10 ? `0${n}` : n);
const dateStr = `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${pad(date.getFullYear())}`;

if (form === "yyyy-mmmm-dd") {
  return dateStr;
}
return `${dateStr}`;
}

FromDate(fromDate:any) {
console.log("iiiiiiiiiiiiiiiiiiiiii");
if (fromDate > this.value2) {
  const temp: ModalMessageModel = {
    showTip: false,
    title: "Ups!!",
    description: "End date cannot be less than the start date.",
    state: "warning",
    leftButtonSize: "small",
    leftButtonType: "text",
    leftButtonText: "",
    showMiddleButton: false,
    rightButtonSize: "small",
    rightButtonColor: "c-scale-12",
    rightButtonType: "text",
    rightButtonText: "Ok",
    rightButtonTesterProperty: "click-from-ok"
  };

  this.alertService.open(temp);
} else {
  this.value1 = fromDate;
  this.apllyFilterButtonDisabled = !this.disabledChooseDate;
  this.filterService.startDate = this.value1;
  this.dataChanged = true;
}
}

async UntilDate(untilDate:any) {
console.log("opoooooooooooooooooooo");
if (
  untilDate.setHours(0, 0, 0, 0) < this.value1.setHours(0, 0, 0, 0) &&
  this.value1.setHours(0, 0, 0, 0) > untilDate.setHours(0, 0, 0, 0)
) {
  const temp: ModalMessageModel = {
    showTip: false,
    title: "Ups!!",
    description: "End date can't be less than the start date.",
    state: "warning",
    leftButtonSize: "small",
    leftButtonType: "text",
    leftButtonText: "",
    showMiddleButton:false,
    rightButtonSize: "small",
    rightButtonType: "text",
    rightButtonText: "Ok",
    rightButtonTesterProperty: "click-until-ok",
    rightButtonColor: "c-scale-12",
  };

  this.alertService.open(temp);
} else {
  this.value2 = untilDate;
  this.apllyFilterButtonDisabled = !this.disabledChooseDate;
  this.filterService.endDate = this.value2;
  this.dataChanged = true;
}

}

       /*    END DATE PICKER*/

handleApplyFilter(){
this.router.navigate(['/tabs/tab4'])
}

}
