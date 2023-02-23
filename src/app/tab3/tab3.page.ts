






import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetModel, ActionSheetService, AlertService, ModalMessageModel } from '@nc-angular/library-mobile.stg';
import { FilterServiceService } from '../shared/filter-service.service';
import { ContactsTaskService } from '../shared/http/contactsTask-api.service';
import { TaskApiService } from '../shared/http/task-api.service';
import { clientsTab } from '../shared/models/clients-tab1';
import { FormsService } from '../shared/services/forms.service';
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





constructor(private router: Router, public  contactApiService: ContactsTaskService, public formsField: FormsService, private actionSheetService : ActionSheetService, public alertService: AlertService , public filterService: FilterServiceService , public tasksService: TasksService, public taskApiService: TaskApiService ) {
}

handleRefresh(event) {
  setTimeout(async () => {

    await this.taskApiService.getTasksItemIdFinalized().then(res => {
      this.tasksService.listTasksFinalizedHistory = res;


      // this.tasksService.listTasksFinalizedHistory1  = this.tasksService.listTasksFinalizedHistory;

      // this.tasksService.listTasksFinalizedHistory
      console.log(this.tasksService.listTasksFinalizedHistory, 'HISTÓRICO DAS TAREFAS')


      console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
      this.tasksService.visiteEfected = this.tasksService.listTasksFinalized
      this.tasksService.countVisits = this.tasksService.listTasksFinalized.length

      console.log(this.tasksService.listTasksFinalized, 'Tarefas Finalizadas')
    })

    this.tasksService.listTasksFinalizedHistory1 = this.tasksService.listTasksFinalizedHistory.map((res) => {
      return {
        ...res,
        endDate: res.endDate ? res.endDate.substring(0, 10) : "Sem data"
      };
    });

    await this.tasksService.sortedListHistoric();


    console.log(this.tasksService.listTasksFinalizedHistory1)
    console.log(this.tasksService.listTasksFinalizedHistory2)


    event.target.complete();
  }, 2000);
};


async ngOnInit() {


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


  async filterByData($event: string){
console.log(  this.tasksService.listTasksFinalizedHistory1
  )  // this.tasksService.turnSearch = true;
  // console.log( this.tasksService.allDocumentsFilter)
  console.log($event)
  this.searchTask = $event
  if ($event.length == 0) {
    this.tasksService.listTasksFinalizedHistory1 = this.tasksService.listTasksFinalizedHistory.map((res) => {
      return {
        ...res,
        endDate: res.endDate ? res.endDate.substring(0, 10) : "Sem data"
      };
    });
    await this.tasksService.sortedListHistoric();
  } else {
    this.tasksService.listTasksFinalizedHistory2 = this.tasksService.listTasksFinalizedHistory.map((res) => {
      return {
        ...res,
        endDate: res.endDate ? res.endDate.substring(0, 10) : "Sem data"
      };
    });
    await this.tasksService.sortedListHistoric();
    // console.log(   this.tasksService.allDocumentsFilter)
    // console.log(this.tasksService.listClients1)
    this.tasksService.sortedList  = this.tasksService.listTasksFinalizedHistory2.filter(
      doc =>
        doc.endDate?.trim().toLowerCase().includes($event.trim().toLowerCase()) ||
        doc.entity.firstName?.trim().toLowerCase().includes($event.trim().toLowerCase())
        );

      }

      console.log(  this.tasksService.listTasksFinalizedHistory1  , '1'      )
      console.log(  this.tasksService.listTasksFinalizedHistory  , '0'    )


}

  async selectedTask(test: any) {
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
      this.tasksService.turnTab3 = true;
      this.formsField.turnForm = true;
      // this.tasksService.turnCreatePost = false;
      // this.tasksService.turnEditPost = false;
      await this.contactApiService.getNotesInstance(this.tasksService.selectedTask).then((res) => {
        // console.log(res)
        this.tasksService.notesTask = res
        console.log(this.tasksService.notesTask)
        this.tasksService.notesTask.tasks
          console.log(this.tasksService.notesTask.formInstances[0])

      })
      if (this.tasksService.notesTask.formInstances.length > 0) {
        let firstFormInstance = this.tasksService.notesTask.formInstances[0];
        console.log(firstFormInstance);
        await this.formsField.getFormsbyId(this.tasksService.notesTask.formInstances[0]).then((res)=> {
          this.formsField.formGetById = res
          this.formsField.fileIdClient = this.formsField.formGetById.fields.fileFields[0].fileId
          this.formsField.fileIdTecnhic = this.formsField.formGetById.fields.fileFields[1].fileId
          console.log(this.formsField.formGetById)
          if(this.formsField.formGetById.fields.booleanFields[0].value == false){
            this.formsField.formGetById.fields.booleanFields[0].value  = 'SIM'
          }else {
            this.formsField.formGetById.fields.booleanFields[0].value = "NÃO"
          }
          if(this.formsField.formGetById.fields.booleanFields[1].value == false){
            this.formsField.formGetById.fields.booleanFields[1].value  = 'SIM'
          }else {
            this.formsField.formGetById.booleanFields[1].value = "NÃO"
          }



          this.formsField.structure = this.formsField.formGetById.fields
          console.log(this.formsField.structure);
           const strutureList = [
            {
              title: 'Tipo da Tarefa',
              fieldName : this.formsField.structure.optionFields[0].values[0].name
            },
            {
              title: 'Pedido ao OVM ?',
              fieldName : this.formsField.structure.booleanFields[0].value
            },
            {
              title: 'Pedido ao OVM - Porque ?',
              fieldName : this.formsField.structure.textFields[5].value
            },
            {
              title: 'Trabalho Finalizado ?',
              fieldName : this.formsField.structure.booleanFields[1].value
            },
            {
              title: 'Trabalho finalizado - Porque ?',
              fieldName : this.formsField.structure.textFields[5].value
            },
            {
              title: 'Data da Tarefa',
              fieldName : this.formsField.structure.dateFields[0].value.substring(0,19).replace("T", " às ")
            },
            {
              title: 'Data de inicio da deslocação',
              fieldName: this.formsField.structure.dateFields[3]?.value?.substring(0, 19)?.replace("T", " às ")
            },
            {
              title: 'Data de fim da deslocação',
              fieldName: this.formsField.structure.dateFields[1]?.value?.substring(0, 19)?.replace("T", " às ")
            },
            {
              title: 'Data de inicio do trabalho',
              fieldName : this.formsField.structure.dateFields[4].value.substring(0,19).replace("T", " às ")
            },
            {
              title: 'Data de fim do trabalho',
              fieldName : this.formsField.structure.dateFields[2].value.substring(0,19).replace("T", " às ")
            },
            {
              title: 'Origem da deslocação',
              fieldName : this.formsField.structure.textFields[4].value
            },
            {
              title: 'Destino da deslocação',
              fieldName : this.formsField.structure.textFields[1].value
            },
            {
              title: 'Matricula',
              fieldName : this.formsField.structure.textFields[3].value
            },
            {
              title: 'Kilometros',
              fieldName : this.formsField.structure.decimalFields[0].value
            },

            {
              title: 'Anomalias encontradas',
              fieldName : this.formsField.structure.textFields[0].value
            },
            {
              title: 'Materias Aplicados',
              fieldName : this.formsField.structure.textFields[2].value
            },
            {
              title: 'Trabalho efetuado',
              fieldName : this.formsField.structure.textFields[6].value
            }
           ]



         this.formsField.structureList = strutureList



          console.log(this.formsField.formGetById, 'FORMULARIOS CORREPONDENETE A ESSE FORMID')
        })

        if( this.formsField.formGetById.fields.fileFields[0].fileId !== null &&  this.formsField.formGetById.fields.fileFields[1].fileId !== null) {



          await this.formsField.getFormsbyId(this.tasksService.notesTask.formInstances[0]).then(async (res) => {
            const formFields = res.fields.fileFields;
            const fieldIds = {};
            const fileValues = [];

            formFields.forEach((field) => {
              if (field.fieldId && field.fileId !== null) {
                fieldIds[field.fieldId] = field.fileId;
              }
            });

            for (const fieldId in fieldIds) {
              const fileId = fieldIds[fieldId];
              await this.formsField.getImageById(fileId).then((res) => {
                if (res.file !== null) {
                  fileValues.push(res.file);
                }
              });
            }

            if (fileValues.length >= 2) {


              this.formsField.image1 = 'data:image/png;base64,' +fileValues[2];
              this.formsField.image2 = 'data:image/png;base64,'+fileValues[3];
              this.formsField.image3 = 'data:image/png;base64,'+fileValues[4];
              this.formsField.image4 = 'data:image/png;base64,'+fileValues[5];
              this.formsField.image5 = 'data:image/png;base64,'+fileValues[6];
            }

            console.log(    this.formsField.image1 )
            console.log(    this.formsField.image2)
            console.log(    this.formsField.image3)
          });

        await this.formsField.getImageById(this.formsField.fileIdClient).then((res)=> {
          this.formsField.imgClient = res.file
          console.log(      this.formsField.imgClient, ' IMAGEM CLIENTE')
          this.formsField.imgClient = 'data:image/png;base64,'+ this.formsField.imgClient
          console.log(this.formsField.imgClient)

        })
        await this.formsField.getImageById(this.formsField.fileIdTecnhic).then((res)=> {
          this.formsField.imgTecnhic = res.file
          this.formsField.imgTecnhic = 'data:image/png;base64,'+ this.formsField.imgTecnhic

          console.log(      this.formsField.imgTecnhic, ' IMAGEM TECNCO')
        })







        }else{
          console.log('tem campos vazios ')
        }
      } else {
        console.log("O array formInstances está vazio.");
      }

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
