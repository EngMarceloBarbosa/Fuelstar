






import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetModel, ActionSheetService, AlertService, ModalMessageModel } from '@nc-angular/library-mobile.stg';
import { FilterServiceService } from '../shared/filter-service.service';
import { TaskApiService } from '../shared/http/task-api.service';
import { clientsTab } from '../shared/models/clients-tab1';
import { TasksService } from "../shared/services/tasks.service";
import { Tasks } from '../utils/models/tab2';

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
searchTask:any;
listBoxes1: any[] = [{
}];
dateInstance:any;

tests = clientsTab





constructor(private router: Router, private actionSheetService : ActionSheetService, public alertService: AlertService , public filterService: FilterServiceService , public tasksService: TasksService, public taskApiService: TaskApiService ) {
}

handleRefresh(event) {
  setTimeout(async () => {

    await this.taskApiService.getTasksItemIdFinalized().then(res => {
      this.tasksService.listTasksFinalizedHistory  = res;


      // this.tasksService.listTasksFinalizedHistory1  = this.tasksService.listTasksFinalizedHistory;

    // this.tasksService.listTasksFinalizedHistory
    console.log(  this.tasksService.listTasksFinalizedHistory, 'HISTÓRICO DAS TAREFAS')


    console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
    this.tasksService.visiteEfected = this.tasksService.listTasksFinalized
    this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

    console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
  })


  this.tasksService.listTasksFinalizedHistory1 = this.tasksService.listTasksFinalizedHistory;


  console.log(this.tasksService.listTasksFinalizedHistory1)


    event.target.complete();
  }, 2000);
};


async ngOnInit() {



      await this.taskApiService.getTasksItemIdFinalized().then(res => {
        this.tasksService.listTasksFinalizedHistory  = res;


        // this.tasksService.listTasksFinalizedHistory1  = this.tasksService.listTasksFinalizedHistory;

      // this.tasksService.listTasksFinalizedHistory
      console.log(  this.tasksService.listTasksFinalizedHistory, 'HISTÓRICO DAS TAREFAS')


      console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
      this.tasksService.visiteEfected = this.tasksService.listTasksFinalized
      this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

      console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
    })


    this.tasksService.listTasksFinalizedHistory1 = this.tasksService.listTasksFinalizedHistory;


    console.log(this.tasksService.listTasksFinalizedHistory1)
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


filterByData($event: string){
console.log(  this.tasksService.listTasksFinalizedHistory1
  )  // this.tasksService.turnSearch = true;
  // console.log( this.tasksService.allDocumentsFilter)
  console.log($event)
  this.searchTask = $event
  if ($event.length == 0) {
   this.tasksService.listTasksFinalizedHistory1  = this.tasksService.listTasksFinalizedHistory;
  } else {
    this.tasksService.listTasksFinalizedHistory1  = this.tasksService.listTasksFinalizedHistory;
    // console.log(   this.tasksService.allDocumentsFilter)
    // console.log(this.tasksService.listClients1)
    this.tasksService.listTasksFinalizedHistory1  = this.tasksService.listTasksFinalizedHistory.filter(
      doc =>
        doc.endDate?.trim().toLowerCase().includes($event.trim().toLowerCase()) ||
        doc.entity.firstName?.trim().toLowerCase().includes($event.trim().toLowerCase())
        );

      }

      console.log(  this.tasksService.listTasksFinalizedHistory1  , '1'      )
      console.log(  this.tasksService.listTasksFinalizedHistory  , '0'    )


}

selectedTask(test: any) {
  this.tasksService.turnTab3 = true
  this.tasksService.msgWarningExecuted = false;
  this.tasksService.instanceId = test.id
  this.tasksService.selectedTask = test
  console.log(this.tasksService.instanceId, 'instanceID')
  console.log(test)
  if (test.id) {
    // TAREFAS ATRIBUIDAS
    if (test.currentStatus.id == "28b097a1-2834-4c9f-b1c6-6b2f316401af") {
      this.tasksService.turnButtonExecuted = true;
      this.tasksService.turnButton = false;
      this.tasksService.turnButtonResume = false;
      this.tasksService.finalized = true;
      // this.tasksService.turnCreatePost = true;
      // this.tasksService.turnEditPost = true;

    }
    // TAREFAS EM EXECUÇÃO
    if (test.currentStatus.id == "23d91faf-d13d-42b0-902b-2de5d49a31ee") {
      this.tasksService.turnButton = true;
      this.tasksService.turnButtonExecuted = false;
      this.tasksService.turnButtonResume = false;
      this.tasksService.finalized = true;
      // this.tasksService.turnCreatePost = true;
      // this.tasksService.turnEditPost = true;

    }
    // TAREFAS SUSPENSAS
    if(test.currentStatus.id == "00bba7ce-f90b-4ebb-9478-777376f78e93") {
      this.tasksService.turnButtonResume = true;
      this.tasksService.turnButton = false;
      this.tasksService.turnButtonExecuted = false;
      this.tasksService.finalized = true;

    }

    // TAREFAS FINALIZADAS
    if (test.currentStatus.id == "e6875497-3ad4-4121-b3aa-4efde5d12fb1") {
      this.tasksService.turnButton = false;
      this.tasksService.finalized = false;
      // this.tasksService.turnCreatePost = false;
      // this.tasksService.turnEditPost = false;
    }
    this.tasksService.infoClient$.next(test);
    console.log(test);
    console.log("1 entrou");
  }
  if (test.id == 2) {
    console.log("2 entrou");
  }

  // this.presentLoadingWithOptions();

  this.router.navigate(['/details-client'])
}



}
