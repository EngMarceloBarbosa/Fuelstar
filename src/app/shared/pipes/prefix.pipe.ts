import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "prefix",
})
export class PrefixPipe implements PipeTransform {
  transform(documents): any {
    let values = documents[0];
    console.log(values, 'PIPES')
    return values;
  }
}
