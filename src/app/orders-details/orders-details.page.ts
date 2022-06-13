import { Component, Input, OnInit, Output } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActionSheetModel, ActionSheetService, AlertService, ModalMessageModel } from '@nc-angular/library-mobile.stg';
import { FilterServiceService } from '../shared/filter-service.service';
import { element } from 'protractor';


@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.page.html',
  styleUrls: ['./orders-details.page.scss'],
})
export class OrdersDetailsPage implements OnInit {

  value1 = new Date();
  value2 = new Date();
  badges: any;
  listProducts: any[] = [];
  onAdress: boolean = true;
  apllyFilterButtonDisabled: boolean = true;
  dataChanged: boolean = false;
  disabledChooseDate: boolean = false;
  isOnActionButtons1: boolean = false;
  isOnActionButtons2: boolean = false;
  isOnActionButtons3: boolean = false;
  deleteState:boolean = true;
  selectedFilter: number = 0;
  translateStrings: any;
  list;
  listValue: any;
  productList: any[] = [];
  key: any;

  selectedList :any[]= [];
  checkedProduct: any;

  constructor(private loc: Location, private router: Router, private actionSheetService: ActionSheetService, public alertService: AlertService, public filterService: FilterServiceService, private tasksService: TasksService) { }

  ngOnInit() {

    this.tasksService.badge$
      .subscribe(res => {
        this.badges = res;
      }),
      this.tasksService.testTask1$
        .subscribe(product => {
          this.listProducts = product;

        }),
      this.tasksService.testTask3$
        .subscribe(testTask3 => {
          this.list = testTask3;
        }),
      this.tasksService.testTask4$
        .subscribe(testTask4 => {
          this.listValue = testTask4;
          console.log(this.listValue, "ENTROU")
        })

  }

  close() {
    this.router.navigate(['products-details']);
  }

  continueButton() {
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

  FromDate(fromDate: any) {
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

  async UntilDate(untilDate: any) {
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
        showMiddleButton: false,
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


  edit(id) {
    console.log(id)

      const temp: ActionSheetModel = {
        titleText: 'Options',
        titleTextColor: 'c-scale-12',
        titleTextSize: 'large',
        iconHeader: 'icon_options',
        iconHeaderSize: 16,
        iconHeaderColor: 'c-scale-12',
        rightButtonShow: false,
        middleButtonShow: false,
        leftButtonShow: false,
        closeButtonShow: true,
        closeButtonColor: 'c-scale-12'
      };

      this.actionSheetService.open(temp);


  }

  options() {

  }

  carChangeEvent (event) {

  }


  deleteNavigation() {

    this.deleteState = false;


    // this.router.navigate(['delete-page']);
    // this.tasksService.testTask3$.next(this.list);
    // this.tasksService.testTask4$.next(this.listValue);
    // this.tasksService.testTask1$.next(this.listProducts)
    // this.listProducts.map((element) => {
    //   if (element.id === this.listProducts[].id) {
    //     console.log("entrou no if")
    //     newArray.slice(element);
    //   }
    // });

  }

  checked(select){

    const index = this.selectedList.findIndex(el =>select.id === el.id);
    if(index > 0  ) {
      this.selectedList.splice(index,1)
    }else {
      this.selectedList = [...this.selectedList, select]
    }
    console.log(this.selectedList)
  }


  clearAllButton(){
 this.list = [];
  }

  onChange($event){
    console.log($event.target.checked);
    this.checkedProduct = $event.target.checked;

  }


  deleteProduct(item){

    console.log(this.list)
    console.log(item)
    const newArray = [];
    this.list.map((element) =>{
      console.log(element)
      if(element.id !== this.list[item]){
        this.list.slice(item, element);
      }
    })
    console.log(this.list);
  }

}
