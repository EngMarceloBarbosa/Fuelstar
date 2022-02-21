import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: "dateDoc",
})
export class DateDocPipe implements PipeTransform {
  transform(datedocument: any, format: string = "d MMM y"): any {

    var date = new DatePipe(datedocument);
    datedocument = date.transform(datedocument, format)
    
    return datedocument;
  }
}
