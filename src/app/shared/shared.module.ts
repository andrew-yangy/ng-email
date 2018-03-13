import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PanelModule} from 'primeng/panel';
import {DropdownModule, InputTextareaModule, InputTextModule} from 'primeng/primeng';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TagInputModule} from 'ngx-chips';

const PRIMENGMODULES = [
  PanelModule,
  DropdownModule,
  InputTextModule,
  InputTextareaModule,
  ButtonModule,
];
const THIRDMODULES = [
  TagInputModule
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...PRIMENGMODULES,
    ...THIRDMODULES
  ],
  declarations: [],
  exports: [
    ReactiveFormsModule,
    ...PRIMENGMODULES,
    ...THIRDMODULES
  ]
})
export class SharedModule { }
