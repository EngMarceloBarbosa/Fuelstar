import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from '../login/login.page';

import { RecoverPasswordPage } from './recover-password.page';

const routes: Routes = [
  {
    path: '',
    component: RecoverPasswordPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverPasswordPageRoutingModule {}
