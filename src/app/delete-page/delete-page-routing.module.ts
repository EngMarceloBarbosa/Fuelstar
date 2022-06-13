import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeletePagePage } from './delete-page.page';

const routes: Routes = [
  {
    path: '',
    component: DeletePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeletePagePageRoutingModule {}
