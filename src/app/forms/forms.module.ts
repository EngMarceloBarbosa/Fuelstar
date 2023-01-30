import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SignaturePadModule } from 'angular2-signaturepad';

import { FormsPageRoutingModule } from './forms-routing.module';
import { Camera } from '@ionic-native/camera/ngx';
import { FormsPage } from './forms.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    SignaturePadModule

  ],
  declarations: [FormsPage],
  providers: [Camera,]
})
export class FormsPageModule { }
