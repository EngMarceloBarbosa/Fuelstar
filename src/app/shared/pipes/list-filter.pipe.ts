
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "listFilter",
})
export class ListFilterPipe implements PipeTransform {
  transform(list: any[], filterText: string): any {
    console.log(list);
    if (!list || list.length === 0) return;

    let name = "firstName";

    return list
      ? list.filter((item) => {
          console.log(item);
          item.Entity[name].search(new RegExp(filterText, "i")) > -1;
          // item.entityHeader[name].search(new RegExp(filterText, "i")) > -1;
        })
      : [];
  }
}
