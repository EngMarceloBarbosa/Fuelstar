import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditContactPageRoutingModule } from './edit-contact-routing.module';

import { EditContactPage } from './edit-contact.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditContactPageRoutingModule,
    SharedModule
  ],
  declarations: [EditContactPage]
})
export class EditContactPageModule {}
