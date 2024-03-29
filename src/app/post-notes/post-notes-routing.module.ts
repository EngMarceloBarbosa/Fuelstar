import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostNotesPage } from './post-notes.page';

const routes: Routes = [
  {
    path: '',
    component: PostNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostNotesPageRoutingModule {}
