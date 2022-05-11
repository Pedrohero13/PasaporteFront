import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitaComponent } from './components/cita/cita.component';
import { OficinaComponent } from './components/oficina/oficina.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {
    path : "",
    component: HomeComponent
  },
  {
    path : "login",
    component: LoginComponent
  },
  {
    path : "oficina",
    component: OficinaComponent
  },
  {
    path : "cita",
    component: CitaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
