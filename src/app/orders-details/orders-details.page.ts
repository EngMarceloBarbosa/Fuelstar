import { Component, Input, OnInit, Output } from '@angular/core';
import { TasksService } from '../shared/services/tasks.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActionSheetModel, ActionSheetService, AlertService, ModalMessageModel } from '@nc-angular/library-mobile.stg';
import { FilterServiceService } from '../shared/filter-service.service';
import { TranslateService } from '@ngx-translate/core';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { ProductService } from '../shared/services/product.service';
import { throwError } from 'rxjs';
import { PaymentMethodApiService } from '../shared/http/paymentMethods.service';


@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.page.html',
  styleUrls: ['./orders-details.page.scss'],
})
export class OrdersDetailsPage implements OnInit {

  value1 = new Date();
  value2 = new Date();
  listProducts: any[] = [];
  onAdress: boolean = true;
  apllyFilterButtonDisabled: boolean = true;
  dataChanged: boolean = false;
  disabledChooseDate: boolean = false;
  isOnActionButtons1: boolean = false;
  isOnActionButtons2: boolean = false;
  isOnActionButtons3: boolean = false;
  deleteState: boolean = true;
  deleteStateNext: boolean = false;
  selectedFilter: number = 0;
  translateStrings: any;
  name: any = "Boas"
  selectedValue: any;
  onPayment: boolean = false;

  productList: any[] = [];
  key: any;
  continueState: boolean = true;
  clearState: boolean = false;
  finishstate: boolean = false;
  onAdressNew: boolean = false;
  globalMessagesTranslations: any;
  deleteMessagesTranslations: any;
  productsMessagesTranslations: any;
  badgeOn: boolean = false;
  selectedList: any[] = [];
  checkedProduct: any;
  ammountNew: any = 1;
  ammountNew1: any;
  ammountId: any;


  constructor(private loc: Location, private router: Router, private actionSheetService: ActionSheetService, public alertService: AlertService, public filterService: FilterServiceService, private tasksService: TasksService, private translate: TranslateService, private productService: ProductService, public paymentMethodsApiService: PaymentMethodApiService) { }

  ngOnInit() {

    this.translate.get('App').subscribe(res => {
      this.globalMessagesTranslations = res.Global;
      this.deleteMessagesTranslations = res.Delete;
      this.productsMessagesTranslations = res.ProductDetails;

    })

    this.paymentMethodsApiService.getPaymentMethod().then(res => {
      this.tasksService.paymentMethods = res;
      console.log(this.tasksService.paymentMethods)
    })



    // this.tasksService.badge$
    //   .subscribe(res => {
    //     this.badges = res;
    //   }),
    // this.tasksService.chooseProduct$
    //   .subscribe(product => {
    //     this.listProducts = product;

    //   }),
    // this.tasksService.listProductsNew$
    //   .subscribe(testTask3 => {
    //     this.list = testTask3;
    //     console.log(this.list, "TESTE")
    //   }),
    // this.tasksService.valueTotal$
    //   .subscribe(testTask4 => {
    //     this.tasksService.listValue = testTask4;
    //     console.log(this.tasksService.listValue, "ENTROU")
    //   })

  }

  close() {
    this.router.navigate(['products-details']);
    console.log(this.tasksService.badge, "BADGES")
    console.log(this.tasksService.productList, "LISTA")


  }

  continueButton() {
    this.onAdressNew = true;
    this.onAdress = false
    this.deleteStateNext = true;
    this.deleteState = false;
  }

  continueButton1() {
    this.onPayment = true;
    this.finishstate = true;
    this.deleteStateNext = false;
    this.onAdressNew = false;
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
    console.log(this.ammountNew);


    this.tasksService.ammountNew$.next(this.ammountNew);
    this.tasksService.ammountId$.next(id)
    console.log(id)
    const temp: ActionSheetModel = {
      titleText: this.productsMessagesTranslations.titleActionSheet,
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

  carChangeEvent(event) {

  }


  deleteNavigation() {
    this.deleteState = false
    this.clearState = true
    this.selectedList = [...this.tasksService.productList]

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

  checked(select) {
    // this.selectedList = this.list
    const index = this.selectedList.findIndex(el => select.id === el.id);
    if (index > -1) {
    } else {
      this.selectedList = [...this.selectedList, select]
    }
    console.log(this.selectedList)
  }


  clearAllButton() {
    console.log(this.selectedList)
    // this.list = this.selectedList;

    this.selectedList.map(element => {
      this.tasksService.productList = this.tasksService.productList.filter(item => item.id !== element.id)
    })
    this.selectedList = []




    console.log(this.tasksService.productList)


  }

  onChange($event) {
    console.log($event.target.checked);
    this.checkedProduct = $event.target.checked;
  }

  // onChange1($e,number){

  //   if(number == 1){
  //     this.tasksService.checkedMethod = $e.target.checked;
  //     console.log(    this.tasksService.checkedMethod)
  //   }
  //   if(number == 2){
  //     this.tasksService.checkedMethod2 = $e.target.checked;
  //     console.log(    this.tasksService.checkedMethod2)
  //   }
  //   if(number == 3){
  //     this.tasksService.checkedMethod3 = $e.target.checked;
  //     console.log(    this.tasksService.checkedMethod3)
  //   }
  // }



  deleteProduct(key: number) {
    console.log(this.tasksService.productList, 'INICIO')
    this.tasksService.productList.map((element, index) => {
      if (element.id == key)
        this.tasksService.productList.splice(index, 1)
      console.log(this.tasksService.productList, 'FIM')
      console.log(this.tasksService.totalValueRequest, 'COMECÇO');
      console.log(element.totalValueItem, 'MEIO');
      this.productService.totalValueOrder();
      // this.tasksService.totalValueRequest = this.tasksService.totalValueRequest - element.totalValueItem;



    });


    if (this.tasksService.productList == []) {
      this.router.navigate(['/products-family'])

    }

    // console.log(this.list)
    // // console.log(item)
    // const newArray = [];
    // this.list.map((element) =>{
    //   console.log(element.id)
    //   if(element.id !== item){
    //     this.list.push(element);
    //   }else {
    //     this.list.slice(item,element);
    //   }

    // })
    this.tasksService.badge = 0;
    this.badgeOn = true;
    console.log(this.tasksService.productList);
  }

  finishButton() {

    // this.tasksService.paymentMethods.map(ele => this.tasksService.checkedMethod.id == ele.id)
    //   this.tasksService.checkedMethod


    // let array = this.tasksService.paymentMethods.map(ele => {
    //   return {
    //     ...ele,
    //     checked: this.name
    //   }

    // })
    // console.log(array)
    this.router.navigate(['/finish-order']);
  }

  addMoreProducts() {
    this.router.navigate(['/products']);
  }

  choose(number) {
    if (number == 1) {

    }



  }


  onChanged(e) {
    console.log(e)
    this.ammountNew = e;
    console.log(this.ammountNew);
  }


  addQuantity() {

    this.tasksService.ammountId$
      .subscribe(testTask1 => {
        this.ammountId = testTask1;
      })

    console.log(this.ammountId)

    console.log(this.ammountNew)
    const index = this.tasksService.productList.findIndex(el => this.ammountId === el.id);
    console.log(index)
    // this.tasksService.productList.length[0].push(this.ammountNew);
    if (index > -1) {

      console.log(index)
      console.log(this.tasksService.productList)

      //       this.tasksService.productList[index].quantity =this.ammountNew;
      // this.tasksService.productList[index].totalValueItem = this.tasksService.productList[index].price * this.tasksService.productList[index].quantity;

      this.tasksService.productList[index].quantity = this.ammountNew;
      this.tasksService.productList[index].totalValueItem = this.tasksService.productList[index].price * this.tasksService.productList[index].quantity;
      this.tasksService.totalValueRequest = this.tasksService.productList[index].totalValueItem
      this.productService.totalValueOrder();
    } else {
    }
    console.log(this.tasksService.productList)
  }

  back() {
    this.router.navigate(['orders']);
    // this.badges = ""
    // this.tasksService.badgeEmpty$.next(this.badges);


  }
  backToProducts() {

    this.tasksService.productList = [];
    console.log(this.tasksService.productList)
    this.router.navigate(['products-family']);
    this.deleteState = true;
    this.clearState = false;
  }

  backOrders() {
    this.onAdressNew = true;
    this.onPayment = false;
    this.deleteStateNext = true;
    this.finishstate = false;
  }



  checkValue(event) {
    console.log(event.detail.value)

  }

  print(event) {
    console.log('Selected value: ', this.selectedValue);
  }


  changeRadio(selected) {
    this.tasksService.selectedMethod = selected;



  }
}
