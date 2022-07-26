import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { SharedModule } from '../shared/shared.module';



import { Tab1PageRoutingModule } from './tab1-routing.module';
import { PipesModule } from '@nc-angular/devkit';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    SharedModule,
    PipesModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
