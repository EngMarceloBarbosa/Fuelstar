import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    SharedModule,
  ],
  declarations: [SearchComponent]
})
export class SearchComponentModule {}
