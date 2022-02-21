import { DateDocPipe } from "./date-doc.pipe";
import { PrefixPipe } from "./prefix.pipe";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ListFilterPipe } from "./list-filter.pipe";

const pipes = [ListFilterPipe, PrefixPipe, DateDocPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...pipes],
  exports: [...pipes],
})
export class PipesModule {}
