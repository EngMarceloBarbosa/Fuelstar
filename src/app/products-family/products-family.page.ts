import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetModel, ActionSheetService, AlertService, ModalMessageModel } from '@nc-angular/library-mobile.stg';
import { FilterServiceService } from '../shared/filter-service.service';
import { ItemApiService } from '../shared/http/item-api.service';
import { product } from '../shared/models/product-list';
import { ProductService } from '../shared/services/product.service';


import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-products-family',
  templateUrl: './products-family.page.html',
  styleUrls: ['./products-family.page.scss'],
})
export class ProductsFamilyPage implements OnInit {

  options: any;
  listProducts : any;
  // newProducts: {name: string; price:number}[]=[];
  newProducts:any[]=[];
  disabledChooseDate: boolean = false;
  value1 = new Date();
value2 = new Date();
apllyFilterButtonDisabled: boolean = true;
dataChanged: boolean = false;
isOnActionButtons1: boolean = false;
isOnActionButtons2: boolean = false;
isOnActionButtons3: boolean = false;
selectedFilter: number = 0;
translateStrings:any;
turnFocus:boolean = false;


  products2 = product ;

  constructor( private router: Router, public tasksService: TasksService,  private actionSheetService : ActionSheetService, public alertService: AlertService , public filterService: FilterServiceService,public itemApiService: ItemApiService, public productService:ProductService) { }

  ngOnInit() {


  }

  close(){

  }

  back(){
    this.router.navigate(['products']);

  }

  cardsClick(item){
    this.turnFocus = false;
      this.tasksService.productList.map((elem)=> {
        console.log(item.id)
        console.log(elem.id)
        if(elem.id == item.id){
       this.tasksService.quantity2 = elem.quantity
      }


      })
      // this.tasksService.productList.map((elem)=> {
      //   if(elem.id !== item.id) {
      //     this.tasksService.controlBadge = true;
      //   }
      //       })

      // console.log(this.tasksService.quantity2)
      // this.tasksService.controlBadge = false;


  this.tasksService.item = item;
  this.router.navigate(['products-details']);
  // this.tasksService.chooseProduct$.next(item);

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



  detailsTasks(test: any){
    if(test.id){
    this.tasksService.infoClient$.next(test);
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

search(){
this.turnFocus = true;
}

  searchDocument($event: string) {
    console.log($event)
    if ($event.length == 0) {
      this.tasksService.listsItems = this.tasksService.listItemsByType;
    } else {
      console.log(this.tasksService.listsItems)
      this.tasksService.listsItems = this.tasksService.listItemsByType.filter(
        doc =>
          doc.name?.trim().toLowerCase().includes($event.trim().toLowerCase())
      );

    }
  }

  orderName(item , type){
    if(type == 1){
      this.tasksService.listItemsByType = this.tasksService.listItemsByType.filter(item =>
        item.name?.trim().toLowerCase());
    }
    console.log(this.tasksService.listItemsByType)
  }



       /*    END DATE PICKER*/

       handleApplyFilter(){
        this.router.navigate(['/tabs/tab4'])
        }

}
