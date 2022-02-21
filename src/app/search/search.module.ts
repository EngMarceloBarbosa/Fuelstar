import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SearchRoutingModule
  ],
  declarations: [SearchComponent]
})
export class SearchComponentModule {}
