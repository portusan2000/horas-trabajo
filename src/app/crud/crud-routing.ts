import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudComponent } from './crud.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TrabajoComponent } from './trabajo/trabajo.component';


const routes: Routes = [
  {
    path:'',
    component: CrudComponent,
    children: [
      { path: '', redirectTo: '/crud/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'trabajo', component: TrabajoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }

export const routingComponents = [CrudComponent, HomeComponent, PerfilComponent, TrabajoComponent];