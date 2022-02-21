import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "prefix",
})
export class PrefixPipe implements PipeTransform {
  transform(documents): any {
    let values = documents.split(/(\d)/)[0];
    return values;
  }
}
