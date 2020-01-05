import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

const exportComponents = [NavbarComponent, FooterComponent]

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    exportComponents
  ]
})
export class SharedModule { }
