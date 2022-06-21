import { Component } from '@angular/core';
import { Globals } from '@nc-angular/library-mobile.stg';
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {



  constructor(private globals: Globals, private translate: TranslateService ) {

    this.translate.addLangs(['en_GB', 'fr_FR', 'pt_PT']);
    this.translate.setDefaultLang('pt_PT');
    this.globals.defaultImagePath = `./assets/images/`;
    this.globals.imagePath = `./assets/images/`;
  }



}
