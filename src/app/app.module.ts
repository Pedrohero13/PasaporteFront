import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { CitaComponent } from './components/cita/cita.component';
import { OficinaComponent } from './components/oficina/oficina.component';
import { DocumentosComponent } from './components/documentos/documentos.component';
import { AgendaComponent } from './components/agenda/agenda.component';

import { HttpClientModule } from '@angular/common/http';
import { CrearCuentaComponent } from './components/crear-cuenta/crear-cuenta.component';


import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    HomeComponent,
    
    CitaComponent,
    OficinaComponent,
    DocumentosComponent,
    AgendaComponent,
    CrearCuentaComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
