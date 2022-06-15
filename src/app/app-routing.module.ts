import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitaComponent } from './components/cita/cita.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CrearCuentaComponent } from './components/crear-cuenta/crear-cuenta.component';


const routes: Routes = [
  {
    path : "login",
    component: LoginComponent
  },
  {
    path : "",
    component: HomeComponent
  },
  {
    path : "cita",
    component: CitaComponent
  },
  {
    path : "sing-in",
    component: CrearCuentaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
