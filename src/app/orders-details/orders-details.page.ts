import { Component, Input, OnInit, Output } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActionSheetService, AlertService, ModalMessageModel } from '@nc-angular/library-mobile.stg';
import { FilterServiceService } from '../shared/filter-service.service';


@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.page.html',
  styleUrls: ['./orders-details.page.scss'],
})
export class OrdersDetailsPage implements OnInit {

  value1 = new Date();
value2 = new Date();
  badges: any;
  listProducts:any;
  onAdress: boolean = true;
  apllyFilterButtonDisabled: boolean = true;
dataChanged: boolean = false;
disabledChooseDate: boolean = false;
isOnActionButtons1: boolean = false;
isOnActionButtons2: boolean = false;
isOnActionButtons3: boolean = false;
selectedFilter: number = 0;
translateStrings:any;



  constructor( private loc: Location,private router: Router, private actionSheetService : ActionSheetService, public alertService: AlertService , public filterService: FilterServiceService , private tasksService: TasksService) { }

  ngOnInit() {

    this.tasksService.badge$
    .subscribe(res => {
      this.badges = res;
    }),
    this.tasksService.testTask1$
      .subscribe(product => {
        this.listProducts = product;

      })

  }

close()
{

}

continueButton(){
this.onAdress = false
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

}
