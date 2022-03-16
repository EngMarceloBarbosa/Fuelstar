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
  SearchBarModule,
  CarouselModule,
  PopoverModule,
  PopoverItemModule,
  StepperModule,
  ActionSheetModule,
  HeadingModule,
} from '@nc-angular/library-mobile';

import { PipesModule } from '@nc-angular/devkit';

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
  SearchBarModule,
  CarouselModule,
  PopoverModule,
  PopoverItemModule,
  StepperModule,
  ActionSheetModule,
  HeadingModule
];

@NgModule({
  imports: [...components, ...devkitModules],
  exports: [...components, ...devkitModules],
})
export class NiupComponents {}
