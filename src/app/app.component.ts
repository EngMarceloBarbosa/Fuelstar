import { Component } from '@angular/core';
import { Globals } from '@nc-angular/library-mobile.stg';
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { SplashScreenStateService } from './shared/services/splash-screen-state.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

allow:boolean = false;

  constructor(private globals: Globals, private translate: TranslateService,   private splashScreenStateService: SplashScreenStateService ) {

    this.translate.addLangs(['en_GB', 'fr_FR', 'pt_PT', 'es_EN', 'al_DL']);
    this.translate.setDefaultLang('pt_PT');
    this.globals.defaultImagePath = `./assets/images/`;
    this.globals.imagePath = `./assets/images/`;
  }

  ngOnInit(): void {
    setTimeout(() => {
       this.splashScreenStateService.stop();
    }, 5000);
 }



}
