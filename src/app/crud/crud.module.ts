import { NgModule } from '@angular/core';

import { CrudRoutingModule, routingComponents } from './crud-routing';
import { CrudComponent } from './crud.component';

// Para permitir usar las directivas ngModel, ngIf, ngForm
import { FormsModule } from '@angular/forms';

// Componentes PrimeNG
import {CalendarModule} from 'primeng/calendar';
import {SpinnerModule} from 'primeng/spinner';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';

// Services de PrimeNG, declarar en Providers
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CrudComponent, routingComponents],
  imports: [
    CrudRoutingModule,
    CalendarModule,
    SpinnerModule,
    DropdownModule,
    PanelModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    CommonModule,
    FormsModule,
    SharedModule
  ],

})
export class CrudModule { }
