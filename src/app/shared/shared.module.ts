import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TranslateModule} from '@ngx-translate/core';
// LIBRARIES

import { NiupComponents } from './niup-components.module';

// PIPES
import { PipesModule } from './pipes/pipes.module';

// DIRECTIVES
import { ClickOutsideDirective } from './directives/outsideClick.directive';
// import { BrowserModule } from '@angular/platform-browser';

const directives = [ClickOutsideDirective];

const modules = [
  RouterModule,
  FormsModule,
  NiupComponents,
  PipesModule,
  TranslateModule
];

@NgModule({
  declarations: [...directives],
  imports: [...modules, CommonModule],
  exports: [...modules, ...directives],
})
export class SharedModule {}
