import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostNotesPageRoutingModule } from './post-notes-routing.module';

import { PostNotesPage } from './post-notes.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostNotesPageRoutingModule,
    SharedModule
  ],
  declarations: [PostNotesPage]
})
export class PostNotesPageModule {}
