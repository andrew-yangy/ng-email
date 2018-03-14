import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { DropdownModule, InputTextareaModule, InputTextModule, ConfirmDialogModule } from 'primeng/primeng';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { TagInputModule } from 'ngx-chips';
import { LoadingModule } from 'ngx-loading';

const PRIMENGMODULES = [
    PanelModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    MessagesModule,
    ConfirmDialogModule
];
const THIRDMODULES = [
    TagInputModule,
    LoadingModule
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
