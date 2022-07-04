import { NgModule } from '@angular/core';
import {
  ButtonModule,
  FormFieldModule,
  IconModule,
  VirtualScrollerModule,
  DatePickerModule,
  ListModule,
  ToastModule,
  SwitchModule,
  TagModule,
  InputModule,
  TabsModule,
  ModalAlertModule,
  CarouselModule,
  PopoverModule,
  PopoverItemModule,
  StepperModule,
  ActionSheetModule,
  HeadingModule,
  AccordionModule,

} from '@nc-angular/library-mobile.stg';

import { PipesModule } from '@nc-angular/devkit';
import { IonSearchbar } from '@ionic/angular';

const devkitModules = [PipesModule];

const components = [
  ButtonModule,
  FormFieldModule,
  IconModule,
  VirtualScrollerModule,
  DatePickerModule,
  ListModule,
  ToastModule,
  SwitchModule,
  TagModule,
  InputModule,
  TabsModule,
  ModalAlertModule,
  CarouselModule,
  PopoverModule,
  PopoverItemModule,
  StepperModule,
  ActionSheetModule,
  HeadingModule,
  AccordionModule
];

@NgModule({
  imports: [...components, ...devkitModules],
  exports: [...components, ...devkitModules],
})
export class NiupComponents {}
