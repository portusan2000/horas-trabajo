import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { HomeComponent } from './components/home/home.component';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes PrimeNG
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {SpinnerModule} from 'primeng/spinner';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    SpinnerModule,
    DropdownModule,
    PanelModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
