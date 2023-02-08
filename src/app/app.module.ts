import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TranslateModule, TranslateLoader, } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PipesModule } from "./shared/pipes/pipes.module";
import { SplashScreenStateService } from './shared/services/splash-screen-state.service';
import { SplashScreenPageModule } from './splash-screen/splash-screen.module';
import { SplashScreenPage } from './splash-screen/splash-screen.page';
import { DetailsClientPage } from './details-client/details-client.page';
import { NativeGeocoder} from '@awesome-cordova-plugins/native-geocoder/ngx'
import { Camera } from '@ionic-native/camera/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx'
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

defineCustomElements(window);


@NgModule({
  declarations: [AppComponent,SplashScreenPage],
  entryComponents: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    PipesModule,
    HttpClientModule,


    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),

    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SplashScreenStateService, DetailsClientPage, NativeGeocoder,Camera, FileOpener,PDFGenerator
 ],
  bootstrap: [AppComponent],
})


export class AppModule {


  constructor( public splashScreen:SplashScreenStateService){
  }


}
