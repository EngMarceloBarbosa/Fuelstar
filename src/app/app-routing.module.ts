import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'products-family',
    loadChildren: () => import('./products-family/products-family.module').then( m => m.ProductsFamilyPageModule)
  },
  {
    path: 'products-details',
    loadChildren: () => import('./products-details/products-details.module').then( m => m.ProductsDetailsPageModule)
  },
  {
    path: 'orders-details',
    loadChildren: () => import('./orders-details/orders-details.module').then( m => m.OrdersDetailsPageModule)
  },
  {
    path: 'finish-order',
    loadChildren: () => import('./finish-order/finish-order.module').then( m => m.FinishOrderPageModule)
  },
  {
    path: 'receipts',
    loadChildren: () => import('./receipts/receipts.module').then( m => m.ReceiptsPageModule)
  },
  {
    path: 'details-client',
    loadChildren: () => import('./details-client/details-client.module').then( m => m.DetailsClientPageModule)
  },
  {
    path: 'edit-contact',
    loadChildren: () => import('./edit-contact/edit-contact.module').then( m => m.EditContactPageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'survey',
    loadChildren: () => import('./survey/survey.module').then( m => m.SurveyPageModule)
  },
  {
    path: 'free-sale',
    loadChildren: () => import('./free-sale/free-sale.module').then( m => m.FreeSalePageModule)
  },
  {
    path: 'google-maps',
    loadChildren: () => import('./google-maps/google-maps.module').then( m => m.GoogleMapsPageModule)
  },
  {
    path: 'post-notes',
    loadChildren: () => import('./post-notes/post-notes.module').then( m => m.PostNotesPageModule)
  },


  // INICIALIZING APP



  {

    path: '',

    // redirectTo: localStorage.getItem('data') > localStorage.getItem('dataToday')
    // ? 'tabs/tab1' : 'login',

    redirectTo: 'login',

    pathMatch: 'full'

  },  {
    path: 'forms',
    loadChildren: () => import('./forms/forms.module').then( m => m.FormsPageModule)
  },










 /* When can find route -> login] */

  // {

  //   path: '**',

  //   redirectTo: '/login'

  // }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
